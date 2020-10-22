import { Draw, Position, Velocity, Logic, Timer, TimerMap } from '../engine/Components'
import { LogicalControls, ControlStates } from '../engine/InputMap'
import EffectSprite from './effectSprite'

export default class CharacterSprite
{
    entity
    speed
    sprite
    scene
    attack_effect
    attack_cooldown

    constructor(scene, texture_key, frame_key)
    {
      const attack_cooldown_t = 100
        // Frames should probably be somehow programatically determined, but for now use a fixed pattern
        scene.anims.create({
            key: `${frame_key}_s`,
            frames: scene.anims.generateFrameNames(`${texture_key}`, {
            prefix: `${frame_key}_s`,
            frames: [ 2, 1, 3, 1 ]
            }),
            frameRate: 4,
            repeat: -1
        });
        scene.anims.create({
            key: `${frame_key}_n`,
            frames: scene.anims.generateFrameNames(`${texture_key}`, {
            prefix: `${frame_key}_n`,
            frames: [ 2, 1, 3, 1 ]
            }),
            frameRate: 4,
            repeat: -1
        });
        scene.anims.create({
            key: `${frame_key}_w`,
            frames: scene.anims.generateFrameNames(`${texture_key}`, {
            prefix: `${frame_key}_w`,
            frames: [ 2, 1, 3, 1 ]
            }),
            frameRate: 4,
            repeat: -1
        });
        scene.anims.create({
            key: `${frame_key}_e`,
            frames: scene.anims.generateFrameNames(`${texture_key}`, {
            prefix: `${frame_key}_e`,
            frames: [ 2, 1, 3, 1 ]
            }),
            frameRate: 4,
            repeat: -1
        });
        scene.anims.create({
          key: `${frame_key}_idle_s`,
          frames: scene.anims.generateFrameNames(`${texture_key}`, {
          prefix: `${frame_key}_s`,
          frames: [ 1 ]
          }),
          frameRate: 4,
          repeat: -1
      });
      scene.anims.create({
          key: `${frame_key}_idle_n`,
          frames: scene.anims.generateFrameNames(`${texture_key}`, {
          prefix: `${frame_key}_n`,
          frames: [ 1 ]
          }),
          frameRate: 4,
          repeat: -1
      });
      scene.anims.create({
          key: `${frame_key}_idle_w`,
          frames: scene.anims.generateFrameNames(`${texture_key}`, {
          prefix: `${frame_key}_w`,
          frames: [ 1 ]
          }),
          frameRate: 4,
          repeat: -1
      });
      scene.anims.create({
          key: `${frame_key}_idle_e`,
          frames: scene.anims.generateFrameNames(`${texture_key}`, {
          prefix: `${frame_key}_e`,
          frames: [ 1 ]
          }),
          frameRate: 4,
          repeat: -1
      });
      this.speed = 64;
      this.sprite = scene.add.sprite(scene.cameras.main.centerX, scene.cameras.main.centerY, texture_key);
      this.entity = scene.phakr.createEntity([
        new Draw(
          this.sprite,
          `${frame_key}_`,
          {
            [LogicalControls.SOUTH]: "s",
            [LogicalControls.NORTH]: "n",
            [LogicalControls.EAST]: "e",
            [LogicalControls.WEST]: "w",
            [LogicalControls.IDLE_SOUTH]: "idle_s",
            [LogicalControls.IDLE_NORTH]: "idle_n",
            [LogicalControls.IDLE_EAST]: "idle_e",
            [LogicalControls.IDLE_WEST]: "idle_w"
          },
          [LogicalControls.IDLE_SOUTH]
        ),
        new Position(scene.cameras.main.centerX, scene.cameras.main.centerY),
        new Velocity(0, 0),
        new Logic({
          [LogicalControls.NORTH]: this.north.bind(this),
          [LogicalControls.EAST]: this.east.bind(this),
          [LogicalControls.SOUTH]: this.south.bind(this),
          [LogicalControls.WEST]: this.west.bind(this),
          [LogicalControls.ATTACK]: this.attack.bind(this)
        }),
        new TimerMap({
          attack_cooldown: new Timer(attack_cooldown_t, null, false) 
        })
      ]);
      this.scene = scene;
      this.attack_effect = null;
    };

    update_animation_state(drawstate, velocity)
    {
        if (velocity.x > 0)
        {
            drawstate.current_action = LogicalControls.EAST;
        }
        else if (velocity.x < 0)
        {
            drawstate.current_action = LogicalControls.WEST;
        }
        else if (velocity.y > 0)
        {
            drawstate.current_action = LogicalControls.SOUTH;
        }
        else if (velocity.y < 0)
        {
            drawstate.current_action = LogicalControls.NORTH;
        }
        else 
        {
            switch(drawstate.current_action)
            {
              case LogicalControls.EAST:
                drawstate.current_action = LogicalControls.IDLE_EAST;
                break;
              case LogicalControls.WEST:
                drawstate.current_action = LogicalControls.IDLE_WEST;
                break;
              case LogicalControls.NORTH:
                drawstate.current_action = LogicalControls.IDLE_NORTH;
                break;
              case LogicalControls.SOUTH:
              default:
                drawstate.current_action = LogicalControls.IDLE_SOUTH;
                break;
            }
        }
    };

    north(entity, status) {
        let velocity = entity.get(Velocity)
        let draw = entity.get(Draw)
        if (velocity)
        {
            if (status == ControlStates.PRESSED)
            {
                velocity.y = -this.speed;
            } else {
                // Todo: check other states
                velocity.y = 0;
            }
            this.update_animation_state(draw, velocity)
        }
    };

    east(entity, status) {
        let velocity = entity.get(Velocity)
        let draw = entity.get(Draw)
        if (velocity)
        {
          if (status == ControlStates.PRESSED)
          {
            velocity.x = this.speed;
          } else {
            // Todo: check other states
            velocity.x = 0;
          }
          this.update_animation_state(draw, velocity)
        }
      };

      south(entity, status) {
        let velocity = entity.get(Velocity)
        let draw = entity.get(Draw)
        if (velocity)
        {
          if (status == ControlStates.PRESSED)
          {
            velocity.y = this.speed;
          } else {
            // Todo: check other states
            velocity.y = 0;
          }
          this.update_animation_state(draw, velocity)
        }
    };

    west(entity, status) {
        let velocity = entity.get(Velocity)
        let draw = entity.get(Draw)
        if (velocity)
        {
          if (status == ControlStates.PRESSED)
          {
            velocity.x = -this.speed;
          } else {
            // Todo: check other states
            velocity.x = 0;
          }
          this.update_animation_state(draw, velocity)
        }
      }

      cooldown_attack()
      {
        this.attack_effect = null
        let timers = this.entity.get(TimerMap).timer_map
        if (timers.attack_cooldown.paused)
        {
          timers.attack_cooldown.paused = false
          timers.attack_cooldown.time = 0
        }
      }

      attack(entity, status)
      {
        // Determine direction
        // Spawn a sword with lifetime
        // Update sword X/Y to movements
        let timers = this.entity.get(TimerMap).timer_map
        if (this.attack_effect == null && timers.attack_cooldown.paused == true)
        {
          this.attack_effect = new EffectSprite(
            this.scene,
            'items',
            'sword_a',
            this.entity,
            this.cooldown_attack.bind(this));
        }
      }

     
}
