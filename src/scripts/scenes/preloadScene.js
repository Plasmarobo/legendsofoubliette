export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' })
  }

  preload() {
    this.load.atlas(
      'creatures',
      'assets/creatures_1.png',
      'assets/creatures_1.json',
      Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    this.load.atlas(
      'items',
      'assets/items.png',
      'assets/items.json',
      Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    this.load.atlas(
      'tiles',
      'assets/tiles.png',
      'assets/tiles.json',
      Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
  }

  create() {
    this.scene.start('MainScene')

    /**
     * This is how you would dynamically import the mainScene class (with code splitting),
     * add the mainScene to the Scene Manager
     * and start the scene.
     * The name of the chunk would be 'mainScene.chunk.js
     * Find more about code splitting here: https://webpack.js.org/guides/code-splitting/
     */
    // let someCondition = true
    // if (someCondition)
    //   import(/* webpackChunkName: "mainScene" */ './mainScene').then(mainScene => {
    //     this.scene.add('MainScene', mainScene.default, true)
    //   })
    // else console.log('The mainScene class will not even be loaded by the browser')
  }
}
