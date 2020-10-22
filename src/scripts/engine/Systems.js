import { PhakrSystem } from '../plugins/phakr'
import { Position, Velocity, Hitbox, Lifetime, Draw, Acceleration, TimerMap, Update } from './Components'

export class PhysicsSystem extends PhakrSystem
{
    constructor(core)
    {
        // CollisionSystem consumes Position, Velocity, and Hitbox
        // Only queried entities will be sent to update
        super(core, [Position, Velocity])
    }

    update(time, delta_t, entity)
    {
        // Entities are guarenteed to have Position, Velocity, and Hitbox
        let velocity = entity.get(Velocity)
        let position = entity.get(Position)
        position.x += velocity.x * (delta_t / 1000)
        position.y += velocity.y * (delta_t / 1000)
    }
}

export class LifetimeSystem extends PhakrSystem
{
    constructor(core)
    {
        super(core, [Lifetime])
    }

    update(time, delta_t, entity)
    {
        var lt = entity.get(Lifetime)
        lt.t += delta_t;
        if (lt.t >= lt.ttl)
        {
            if (lt.onFinished != null)
            {
                lt.onFinished(entity)
            }
            entity.destroy()
        }
    }
}

export class TimingSystem extends PhakrSystem
{
    global_pause

    constructor(core)
    {
        super(core, [TimerMap])
        this.global_pause = false
    }

    update(time, delta_t, entity)
    {
        if (!this.global_pause)
        {
            let timers = entity.get(TimerMap)
            for(let timer of Object.values(timers.timer_map))
            {
                if (!timer.paused)
                {
                    timer.time += delta_t
                }
                if (timer.time >= timer.duration)
                {
                    if (timer.callback != null)
                    {
                        timer.callback()
                    }
                    timer.time = 0
                    if (!timer.repeat)
                    {
                        timer.paused = true
                    }
                }
            }
        }
    }

    pause_all()
    {
        this.global_pause = true
    }

    resume_all()
    {
        this.global_pause = false
    }
}

export class RenderingSystem extends PhakrSystem
{
    constructor(core)
    {
        super(core, [Draw, Position])
    }

    update(time, delta_t, entity)
    {
        let draw = entity.get(Draw)
        let position = entity.get(Position)
        let animation_key = draw.animation_prefix + draw.action_map[draw.current_action]
        if (draw.sprite.anims.currentAnim == null)
        {
            draw.sprite.play(draw.animation_prefix + draw.action_map[draw.default_action])
        }else if (animation_key != draw.sprite.anims.getCurrentKey()) {
            draw.sprite.play(animation_key, false)
        }
        let parent_pos = (position.parent != null) ? position.parent.get(Position) : new Position(0,0,0,null)

        draw.sprite.x = Math.round(position.x) + Math.round(parent_pos.x)
        draw.sprite.y = Math.round(position.y) + Math.round(parent_pos.y)

        draw.sprite.rotation = draw.rotation
        draw.sprite.update()
    }

}

export class UpdateSystem extends PhakrSystem
{
    constructor(core)
    {
        super(core, [Update])
    }

    update(time, delta_t, entity)
    {
        let update = entity.get(Update)
        if (!update.paused)
        {
            update.callback(time, delta_t, entity);
        }
    }
}