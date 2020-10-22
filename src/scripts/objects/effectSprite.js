import { Draw, Position, Velocity, Logic, Lifetime, Timer, Update } from '../engine/Components'
import { LogicalControls, ControlStates } from '../engine/InputMap'

export default class EffectSprite
{
    entity
    speed
    offset
    sprite
    scene
    parent
    target_x
    target_y
    duration

    constructor(scene, texture_key, frame_key, parent, destroy_callback)
    {
        // Frames should probably be somehow programatically determined, but for now use a fixed pattern
        scene.anims.create({
            key: frame_key,
            frames: scene.anims.generateFrameNames(texture_key, {
                prefix: frame_key,
                frames: [1]
            }),
            frameRate: 4,
            repeat: -1
        });
      this.speed = 4;
      this.offset = 4;
      this.duration = 200;

      let facing = LogicalControls.IDLE_SOUTH;
      let rotation = 0;
      if (parent != null && typeof(parent) != 'undefined')
      {
        let draw = parent.get(Draw);
        facing = draw.current_action;
        if (draw != null && typeof(draw) != 'undefined')
        {
            switch(facing){
                case LogicalControls.NORTH:
                case LogicalControls.IDLE_NORTH:
                    rotation = Math.PI/4;
                    break;
                case LogicalControls.SOUTH:
                case LogicalControls.IDLE_SOUTH:
                    rotation = 5*Math.PI/4;
                    break;
                case LogicalControls.WEST:
                case LogicalControls.IDLE_WEST:
                    rotation = 7*(Math.PI/4);
                    break;
                case LogicalControls.EAST:
                case LogicalControls.IDLE_EAST:
                    rotation = 3*Math.PI/4;
                    break;
                default:
                    break;
            }
        }
      }
      this.sprite = scene.add.sprite(0, 0, texture_key);
      this.sprite.setOrigin(1,1);
      // Determine rotation
      let draw_comp = new Draw(
        this.sprite,
        frame_key,
        {
          [LogicalControls.IDLE]: ""
        },
        [LogicalControls.IDLE]
      );
      let xfactor = Math.cos(rotation-(3*Math.PI/4)+Math.PI/16);
      let yfactor = Math.sin(rotation-(3*Math.PI/4)+Math.PI/16);
      draw_comp.rotation = rotation - Math.PI/4;
      let pos = new Position(
        this.offset * xfactor,
        this.offset * yfactor,
        0,
        parent);
      this.entity = scene.phakr.createEntity([
        draw_comp,
        pos,
        new Velocity(0, 0),
        new Lifetime(this.duration, this.destroy.bind(this)),
        new Update(this.update.bind(this))
      ]);
      this.target_x = (this.speed * xfactor) - pos.x;
      this.target_y = (this.speed * yfactor) - pos.y;
      this.scene = scene;
      this.destroy_callback = destroy_callback;
      
    };

    destroy()
    {
        this.sprite.setActive(false)
        this.sprite.setVisible(false)
        this.entity.destroy()
        if (this.destroy_callback != null)
        {
            this.destroy_callback()
        }
    }

    update(time, delta_t, entity)
    {
        let pos = entity.get(Position)
        pos.x += (delta_t * this.target_x / this.duration)
        pos.y += (delta_t * this.target_y / this.duration)
        let draw = entity.get(Draw)
        draw.rotation += (delta_t * 2 * Math.PI / (4*this.duration))
    }
}

