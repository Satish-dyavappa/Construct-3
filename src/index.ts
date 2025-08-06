import Phaser from "phaser";
 
 
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
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 1800 },
      debug: false, // Set to false in production
    }
    
  },
  scene: []

};

export const game = new Phaser.Game(config);
