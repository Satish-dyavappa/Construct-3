import Phaser from 'phaser';

export default class LevelScene extends Phaser.Scene {
    // Layout constants
    private static readonly CELL_COUNT = 4;
    private static readonly CELL_Y_RATIO = 0.4;
    private static readonly CELL_SPACING_RATIO = 0.18;
    private static readonly CELL_START_X_RATIO = 0.2;
    
    // UI constants
    private static readonly CLEAR_BUTTON_X_RATIO = 0.9;
    private static readonly CLEAR_BUTTON_Y_RATIO = 0.9;
    private static readonly CLEAR_BUTTON_WIDTH = 100;
    private static readonly CLEAR_BUTTON_HEIGHT = 40;
    
    // Colors
    private static readonly CELL_NUMBER_COLOR = '#000000';
    private static readonly CLEAR_BUTTON_COLOR = '#ffffff';
    private static readonly CLEAR_BUTTON_TEXT_COLOR = '#000000';
    private static readonly X_MARK_COLOR = '#ff0000';
    
    // Sizes
    private static readonly CELL_NUMBER_FONT_SIZE = '34px';
    private static readonly CLEAR_BUTTON_FONT_SIZE = '16px';
    private static readonly CELL_SCALE = 0.8;
    private static readonly STATUS_ICON_SCALE = 1;
    
    // Status icon positions
    private static readonly STATUS_ICON_X_OFFSET = 90;
    private static readonly STATUS_ICON_Y_OFFSET = 0.5;
    
    
    private cells: Phaser.GameObjects.Container[] = [];
    private clearButton!: Phaser.GameObjects.Container;

    constructor() {
        super({ key: 'LevelScene' });
    }

    preload(): void {
        // Load the background image (adjust path based on your webpack config)
        this.load.image('prison-bg', 'assets/background.png');
        
        // Load block images
        this.load.image('uncompleted-block', 'assets/uncompletedBlock.png');
        this.load.image('completed-block', 'assets/levelCompletedBlock.png');
        
        // Load other UI elements
        this.load.image('play-btn', 'assets/playBtn.png');
        this.load.image('pause-btn', 'assets/pauseBtn.png');
        this.load.image('back-arrow', 'assets/backArrow.png');
        this.load.image('wrong', 'assets/wrong.png');
        this.load.image('right', 'assets/right.png');
        this.load.image('Reset', 'assets/Reset.png');
    }

    create(): void {
        const width = this.scale.width;
        const height = this.scale.height;

        // Create background
        this.createBackground(width, height);
        
        // Create cells using block images
        this.createCells(width, height);

        // Create clear button
        this.createClearButton(width, height);
        
        // Add interactions
        this.setupInteractions();
    }

    private createBackground(width: number, height: number): void {
        // Add the prison background
        const bg = this.add.image(width / 2, height / 2, 'prison-bg');
        bg.setDisplaySize(width, height);
    }

    private createCells(width: number, height: number): void {
        const cellSpacing = width * LevelScene.CELL_SPACING_RATIO;
        const startX = width * LevelScene.CELL_START_X_RATIO;
        const cellY = height * LevelScene.CELL_Y_RATIO;

        for (let i = 0; i < LevelScene.CELL_COUNT; i++) {
            const cellX = startX + (i * cellSpacing);
            
            const cellContainer = this.add.container(cellX, cellY);
            
            // Create cell using uncompleted block image
            const cellBlock = this.add.image(0, 0, 'uncompleted-block');
            cellBlock.setScale(LevelScene.CELL_SCALE);
            cellContainer.add(cellBlock);
            
            // Add cell number above the block
            this.createCellNumber(cellContainer, cellBlock, i + 1);
            
            // Add status icons (wrong/right)
            this.createStatusIcons(cellContainer, cellBlock);
            
            // Make cell interactive
            cellBlock.setInteractive();
            cellBlock.on('pointerdown', () => this.onCellClick(i, cellContainer, cellBlock));
            
            this.cells.push(cellContainer);
        }
    }

    private createCellNumber(cellContainer: Phaser.GameObjects.Container, cellBlock: Phaser.GameObjects.Image, levelNumber: number): void {
        const numberText = this.add.text(41, cellBlock.displayHeight * 0.2, levelNumber.toString(), {
            fontSize: LevelScene.CELL_NUMBER_FONT_SIZE,
            color: LevelScene.CELL_NUMBER_COLOR,
            fontFamily: 'Arial, sans-serif',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        
        cellContainer.add(numberText);
    }

    private createStatusIcons(cellContainer: Phaser.GameObjects.Container, cellBlock: Phaser.GameObjects.Image): void {
        // Create wrong image (initially visible for uncompleted levels)
        const wrongImage = this.add.image(
            LevelScene.STATUS_ICON_X_OFFSET, 
            cellBlock.displayHeight * LevelScene.STATUS_ICON_Y_OFFSET, 
            'wrong'
        );
        wrongImage.setScale(LevelScene.STATUS_ICON_SCALE);
        wrongImage.setName('wrongImage');
        wrongImage.setVisible(true); // Initially visible
        
        // Create right image (initially hidden)
        const rightImage = this.add.image(
            LevelScene.STATUS_ICON_X_OFFSET, 
            cellBlock.displayHeight * LevelScene.STATUS_ICON_Y_OFFSET, 
            'right'
        );
        rightImage.setScale(LevelScene.STATUS_ICON_SCALE);
        rightImage.setName('rightImage');
        rightImage.setVisible(false); // Initially hidden
        
        cellContainer.add([wrongImage, rightImage]);
    }

    private updateStatusIcon(cellContainer: Phaser.GameObjects.Container, isCompleted: boolean): void {
        const wrongImage = cellContainer.getByName('wrongImage') as Phaser.GameObjects.Image;
        const rightImage = cellContainer.getByName('rightImage') as Phaser.GameObjects.Image;
        
        if (isCompleted) {
            // Show right image, hide wrong image
            rightImage.setVisible(true);
            wrongImage.setVisible(false);
        } else {
            // Show wrong image, hide right image
            wrongImage.setVisible(true);
            rightImage.setVisible(false);
        }
    }

    private resetStatusIcon(cellContainer: Phaser.GameObjects.Container): void {
        const wrongImage = cellContainer.getByName('wrongImage') as Phaser.GameObjects.Image;
        const rightImage = cellContainer.getByName('rightImage') as Phaser.GameObjects.Image;
        
        // Reset to initial state (wrong image visible, right image hidden)
        wrongImage.setVisible(true);
        rightImage.setVisible(false);
    }

    private onCellClick(cellIndex: number, cellContainer: Phaser.GameObjects.Container, cellBlock: Phaser.GameObjects.Image): void {
        // Toggle between completed and uncompleted block
        const currentTexture = cellBlock.texture.key;
        
        if (currentTexture === 'uncompleted-block') {
            cellBlock.setTexture('completed-block');
            this.updateStatusIcon(cellContainer, true);
            console.log(`Cell ${cellIndex + 1} completed`);
        } else {
            cellBlock.setTexture('uncompleted-block');
            this.updateStatusIcon(cellContainer, false);
            console.log(`Cell ${cellIndex + 1} uncompleted`);
        }
    }

    private clearAllCells(): void {
        this.cells.forEach((cellContainer, index) => {
            const cellBlock = cellContainer.list[0] as Phaser.GameObjects.Image;
            cellBlock.setTexture('uncompleted-block');
            this.resetStatusIcon(cellContainer);
        });
        
        console.log('All cells cleared');
    }

    private setupInteractions(): void {
        // Add keyboard support
        this.input.keyboard?.on('keydown-ESC', () => {
            this.scene.start('MainScene');
        });
        
        // Add number key support for cells
        for (let i = 1; i <= LevelScene.CELL_COUNT; i++) {
            this.input.keyboard?.on(`keydown-${i}`, () => {
                const cellContainer = this.cells[i - 1];
                const cellBlock = cellContainer.list[0] as Phaser.GameObjects.Image;
                this.onCellClick(i - 1, cellContainer, cellBlock);
            });
        }
        
        // Clear key
        this.input.keyboard?.on('keydown-C', () => {
            this.clearAllCells();
        });
    }
    private createClearButton(width: number, height: number): void {
        const buttonX = width * LevelScene.CLEAR_BUTTON_X_RATIO;
        const buttonY = height * LevelScene.CLEAR_BUTTON_Y_RATIO;
        
        // Create reset button using the Reset image inside a container
        const resetImage = this.add.image(0, 0, 'Reset');
        resetImage.setScale(0.8);

        this.clearButton = this.add.container(buttonX, buttonY, [resetImage]);

        // Make button interactive
        resetImage.setInteractive();

        // Add hover effects
        resetImage.on('pointerover', () => {
            resetImage.setScale(0.9); // Slightly larger on hover
        });

        resetImage.on('pointerout', () => {
            resetImage.setScale(0.8); // Back to original size
        });

        // Add click handler
        resetImage.on('pointerdown', () => {
            this.clearAllCells();
        });
    }
}