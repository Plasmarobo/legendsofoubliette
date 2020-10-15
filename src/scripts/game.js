import 'phaser'
import '@babel/polyfill'

import MainScene from './scenes/mainScene'
import PreloadScene from './scenes/preloadScene'
import { PhakrPlugin, PhakrSystem } from './plugins/phakr'

const DEFAULT_WIDTH = 800
const DEFAULT_HEIGHT = 600

const config = {
  type: Phaser.AUTO,
  backgroundColor: '#000000',
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.WIDTH_CONTROLS_HEIGHT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT
  },
  scene: [PreloadScene, MainScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: { y: 200 }
    }
  },
  plugins: {
    scene: [
      {
        key: 'PhakrPlugin',
        plugin: PhakrPlugin,
        mapping: 'phakr'
      }
    ]
  }
}

window.addEventListener('load', () => {
  const game = new Phaser.Game(config)
})
