import Phaser from "phaser";
import MainScene from "./scenes/MainScene";
import LevelScene from "./scenes/LevelScene";
import PlayScene from './scenes/PlayScene';
 
 
const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'game-container',
  backgroundColor: '#000000',
  scale: {
    mode: Phaser.Scale.WIDTH_CONTROLS_HEIGHT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1920,
    height: 972,
  },
  pixelArt: true,
  transparent: false,
  input: {
    activePointers: 3,
  },
  physics: {
    default: 'matter',
    arcade: {
      gravity: { x: 0, y: 1 },
      debug: true, // Set to false in production
    }
    
  },
  scene: [MainScene,LevelScene,PlayScene]

};

export const game = new Phaser.Game(config);
