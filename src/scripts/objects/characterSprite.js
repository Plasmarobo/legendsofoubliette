import { Draw, Position, Velocity, Logic } from '../engine/Components'
import { LogicalControls, ControlStates } from '../engine/InputMap'

export default class CharacterSprite
{
    character
    speed
    sprite

    constructor(scene, texture_key, frame_key)
    {
        // Frames should probably be somehow programatically determined, but for now use a fixed pattern
        scene.anims.create({
            key: `${frame_key}_s`,
            frames: scene.anims.generateFrameNames(`${texture_key}`, {
            prefix: `${frame_key}_s`,
            frames: [ 1, 2, 1, 3 ]
            }),
            frameRate: 4,
            repeat: -1
        });
        scene.anims.create({
            key: `${frame_key}_n`,
            frames: scene.anims.generateFrameNames(`${texture_key}`, {
            prefix: `${frame_key}_n`,
            frames: [ 1, 2, 1, 3 ]
            }),
            frameRate: 4,
            repeat: -1
        });
        scene.anims.create({
            key: `${frame_key}_w`,
            frames: scene.anims.generateFrameNames(`${texture_key}`, {
            prefix: `${frame_key}_w`,
            frames: [ 1, 2, 1, 3 ]
            }),
            frameRate: 4,
            repeat: -1
        });
        scene.anims.create({
            key: `${frame_key}_e`,
            frames: scene.anims.generateFrameNames(`${texture_key}`, {
            prefix: `${frame_key}_e`,
            frames: [ 1, 2, 1, 3 ]
            }),
            frameRate: 4,
            repeat: -1
        });
        scene.anims.create({
            key: `${frame_key}_idle`,
            frames: scene.anims.generateFrameNames(`${texture_key}`, {
            prefix: `${frame_key}_s`,
            frames: [ 1 ]
            }),
            frameRate: 4,
            repeat: -1
        });
      this.speed = 64;
      this.sprite = scene.add.sprite(scene.cameras.main.centerX, scene.cameras.main.centerY, `${texture_key}`);
      this.character = scene.phakr.createEntity([
        new Draw(
          this.sprite,
          `${frame_key}_`,
          {
            [LogicalControls.SOUTH]: "s",
            [LogicalControls.NORTH]: "n",
            [LogicalControls.EAST]: "e",
            [LogicalControls.WEST]: "w",
            [LogicalControls.IDLE]: "idle"
          },
          [LogicalControls.IDLE]
        ),
        new Position(scene.cameras.main.centerX, scene.cameras.main.centerY),
        new Velocity(0, 0),
        new Logic({
          [LogicalControls.NORTH]: this.north.bind(this),
          [LogicalControls.EAST]: this.east.bind(this),
          [LogicalControls.SOUTH]: this.south.bind(this),
          [LogicalControls.WEST]: this.west.bind(this),
          [LogicalControls.IDLE]: (entity, status) => {}
        })
      ]);
    };

    update_animation_state(drawstate, velocity)
    {
        if (velocity.x > 0)
        {
            drawstate.current_action = LogicalControls.EAST
        }
        else if (velocity.x < 0)
        {
            drawstate.current_action = LogicalControls.WEST
        }
        else if (velocity.y > 0)
        {
            drawstate.current_action = LogicalControls.SOUTH
        }
        else if (velocity.y < 0)
        {
            drawstate.current_action = LogicalControls.NORTH
        }
        else 
        {
            drawstate.current_action = LogicalControls.IDLE
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
      };
    
      
}
