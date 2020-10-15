import FpsText from '../objects/fpsText'
import {Position, Velocity, Lifetime, Hitbox, Draw, Logic, Acceleration}  from '../engine/Components'
import { RenderingSystem, PhysicsSystem } from '../engine/Systems'
import { LogicSystem } from '../engine/LogicSystem'
import { ControlEvent, LogicalControls, ControlStates, InputMap } from '../engine/InputMap'
import CharacterSprite from '../objects/characterSprite'

export default class MainScene extends Phaser.Scene {
  fpsText
  InputMap
  creature

  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    /**
     * Delete all the code below to start a fresh scene
     */
    this.fpsText = new FpsText(this)
    this.InputMap = new InputMap(this)

    // display the Phaser.VERSION
    this.add
      .text(this.cameras.main.width - 15, 15, `Phaser v${Phaser.VERSION}`, {
        color: '#ffffff',
        fontSize: 16
      })
      .setOrigin(1, 0)
    this.phakr.setComponents([
      Position,
      Velocity,
      Acceleration,
      Lifetime,
      Hitbox,
      Draw,
      Logic
    ]);

    this.phakr.registerSystem(new PhysicsSystem(this.phakr));
    //this.phakr.registerSystem(new TimingSystem());
    this.phakr.registerSystem(new RenderingSystem(this.phakr))
    var logic = new LogicSystem(this.phakr);
    this.phakr.registerSystem(logic);

    this.InputMap.addConsumer(ControlEvent.INPUT, (event, status) => logic.handleEvent(event, status))
    this.creature = new CharacterSprite(this, 'creatures', 'boy')
  }

  update() {
    this.fpsText.update()
  }
}
