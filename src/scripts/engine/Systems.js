import { PhakrSystem } from '../plugins/phakr'
import { Position, Velocity, Hitbox, Lifetime, Draw, Acceleration } from './Components'

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

export class TimingSystem extends PhakrSystem
{
    constructor(core)
    {
        super(core, [Lifetime])
    }

    update(time, delta_t, entity)
    {
        // If something has a lifetime, destroy it
        // There may also be an onTimeUp
        var lt = entity.get(Lifetime);
        if (time > lt.t)
        {
            if (!lt.onFinish())
            {
                // Destroy
                entity.destroy();
            } else {
                // Don't destroy yet, continue to assess
            }
        }
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
        var draw = entity.get(Draw);
        var position = entity.get(Position);
        let animation_key = draw.animation_prefix + draw.action_map[draw.current_action];
        if (draw.sprite.anims.currentAnim == null)
        {
            draw.sprite.play(draw.animation_prefix + draw.action_map[draw.default_action]);
        }else if (animation_key != draw.sprite.anims.getCurrentKey()) {
            draw.sprite.play(animation_key, false);
        }
        draw.sprite.x = Math.round(position.x)
        draw.sprite.y = Math.round(position.y)
        draw.sprite.update()
    }

}
