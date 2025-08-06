import Phaser from 'phaser';
import LevelScene from './LevelScene';

export default class MainScene extends Phaser.Scene {
    private loadingBar!: Phaser.GameObjects.Graphics;
    private progressBox!: Phaser.GameObjects.Graphics;

    // Layout constants
    private static readonly POWERED_BY_Y_RATIO = 0.22;
    private static readonly ICON_Y_RATIO = 0.45;
    private static readonly CONSTRUCT_TEXT_Y_RATIO = 0.67;
    private static readonly WEBSITE_Y_RATIO = 0.93;
    private static readonly LOADING_BAR_Y_RATIO = 0.85;

    // Text positioning constants
    private static readonly CONSTRUCT_TEXT_X_OFFSET = -50;
    private static readonly NUMBER_3_X_OFFSET = 200;

    // Font sizes
    private static readonly POWERED_BY_FONT_SIZE = '60px';
    private static readonly CONSTRUCT_FONT_SIZE = '70px';
    private static readonly WEBSITE_FONT_SIZE = '30px';

    // Colors
    private static readonly BACKGROUND_COLOR = '#4a5568';
    private static readonly POWERED_BY_COLOR = '#9ca3af';
    private static readonly WHITE_COLOR = '#ffffff';
    private static readonly CONSTRUCT_3_COLOR = '#00d4aa';
    private static readonly WEBSITE_COLOR = '#6b7280';
    private static readonly LOADING_BAR_BG_COLOR = 0x222222;
    private static readonly LOADING_BAR_FILL_COLOR = 0x00d4aa;

    // Scale and dimensions
    private static readonly ICON_SCALE = 2;
    private static readonly LOADING_BAR_HEIGHT = 6;
    private static readonly LOADING_BAR_COMPLETE_PROGRESS = 1;

    constructor() {
        super({ key: 'MainScene' });
    }

    preload(): void {
        // Load the icon image
        this.load.image('icon', 'assets/icon-128.png');
        
        // Create loading graphics
        this.createLoadingGraphics();
        
        // Update loading bar as assets load
        this.load.on('progress', (value: number) => {
            this.updateLoadingBar(value);
        });
    }

    create(): void {
        // Set background to match Construct 3 style
        this.cameras.main.setBackgroundColor(MainScene.BACKGROUND_COLOR);
        
        const width = this.scale.width;
        const height = this.scale.height;
        
        // Add "Powered by" text
        this.add.text(width / 2, height * MainScene.POWERED_BY_Y_RATIO, 'Powered by', {
            fontSize: MainScene.POWERED_BY_FONT_SIZE,
            color: MainScene.POWERED_BY_COLOR,
            fontFamily: 'Arial, sans-serif'
        }).setOrigin(0.5);
        
        // Add the Construct 3 icon
        const icon = this.add.image(width / 2, height * MainScene.ICON_Y_RATIO, 'icon');
        icon.setScale(MainScene.ICON_SCALE);
        
        this.add.text(width / 2, height * MainScene.CONSTRUCT_TEXT_Y_RATIO, 'CONSTRUCT ', {
            fontSize: MainScene.CONSTRUCT_FONT_SIZE,
            color: MainScene.WHITE_COLOR,
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontStyle: 'bold'  
        }).setOrigin(0.5, 0.5).setX(width / 2 + MainScene.CONSTRUCT_TEXT_X_OFFSET);
        
        this.add.text(width / 2, height * MainScene.CONSTRUCT_TEXT_Y_RATIO, '3', {
            fontSize: MainScene.CONSTRUCT_FONT_SIZE,
            color: MainScene.CONSTRUCT_3_COLOR,
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontStyle: 'bold'  
        }).setOrigin(0.5, 0.5).setX(width / 2 + MainScene.NUMBER_3_X_OFFSET);
        
        // Add website URL at bottom
        this.add.text(width / 2, height * MainScene.WEBSITE_Y_RATIO, 'www.construct.net', {
            fontSize: MainScene.WEBSITE_FONT_SIZE,
            color: MainScene.WEBSITE_COLOR,
            fontFamily: 'Arial, sans-serif'
        }).setOrigin(0.5);
        
        // Complete the loading bar
        this.updateLoadingBar(MainScene.LOADING_BAR_COMPLETE_PROGRESS);
        
        // Add click event to continue
        this.input.on('pointerdown', () => {
            // Try to enable fullscreen on user gesture
            if (!this.scale.isFullscreen) {
                try {
                    this.scale.startFullscreen();
                } catch (err) {
                    console.log('Fullscreen request failed:', err);
                }
            }
            
            // Transition to next scene (change this to your actual next scene)
            this.scene.start('LevelScene'); // or whatever your next scene is called
        });
    }

    private createLoadingGraphics(): void {
        const width = this.scale.width;
        const height = this.scale.height;
        
        // Create progress bar background
        this.progressBox = this.add.graphics();
        this.progressBox.fillStyle(MainScene.LOADING_BAR_BG_COLOR);
        this.progressBox.fillRect(0, height * MainScene.LOADING_BAR_Y_RATIO, width, MainScene.LOADING_BAR_HEIGHT);
        
        // Create progress bar fill
        this.loadingBar = this.add.graphics();
    }

    private updateLoadingBar(progress: number): void {
        const width = this.scale.width;
        const height = this.scale.height;
        
        // Clear previous progress
        this.loadingBar.clear();
        
        // Draw progress bar with Construct 3 teal color
        this.loadingBar.fillStyle(MainScene.LOADING_BAR_FILL_COLOR);
        this.loadingBar.fillRect(0, height * MainScene.LOADING_BAR_Y_RATIO, width * progress, MainScene.LOADING_BAR_HEIGHT);
    }
}