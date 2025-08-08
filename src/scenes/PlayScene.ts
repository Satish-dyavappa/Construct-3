import { levels, IlevelData } from '../Levels/LevelsData';

export default class PlayScene extends Phaser.Scene {
    // --- Magic Numbers as Constants ---
    private static readonly BACK_BUTTON_X = 100;
    private static readonly BACK_BUTTON_Y = 60;
    private static readonly BACK_BUTTON_SCALE = 0.8;
    private static readonly BACK_BUTTON_SCALE_HOVER = 0.9;

    private static readonly LEVEL_TEXT_Y = 60;
    private static readonly LEVEL_TEXT_SIZE = '48px';

    private static readonly RAYS_SCALE = 5;
    private static readonly RAYS_DEPTH = 0;
    private static readonly FAIL_COMPLETE_DEPTH = 1;

    private static readonly REFRESH_BUTTON_Y_OFFSET = 180;
    private static readonly REFRESH_BUTTON_SCALE = 0.7;
    private static readonly REFRESH_BUTTON_SCALE_HOVER = 0.8;
    private static readonly REFRESH_BUTTON_DEPTH = 2;

    private static readonly GROUND_Y_OFFSET = 30;
    private static readonly GROUND_WIDTH_EXTRA = 20;
    private static readonly GROUND_HEIGHT_RATIO = 1 / 7;

    private static readonly BLOCK_STACK_OFFSET_X = 700;
    private static readonly BLOCK_HEIGHT = 96;
    private static readonly BLOCK_STACK_TOLERANCE = 10;

    private static readonly PLAYER_SCALE = 0.8;
    private static readonly PLAYER_BOUNCE = 0.2;

    private static readonly PLAYER_MOVE_SPEED = 8;
    private static readonly PLAYER_JUMP_SPEED = 15;
    private static readonly PLAYER_JUMP_VELOCITY_TOLERANCE = 1;

    // vertical tolerance (pixels) when comparing player bottom to block top
    private static readonly VERTICAL_TOLERANCE = 6;

    private static readonly PLAYER_FAIL_Y_OFFSET = 50;

    private static readonly DESTROY_BLOCK_DURATION = 200;

    private static readonly COMPLETE_DELAY = 2000;

    // --- Class Properties ---
    private player!: Phaser.Physics.Matter.Sprite;
    private blocks: Phaser.Physics.Matter.Sprite[] = [];
    private stoneBlocks: Phaser.Physics.Matter.Sprite[] = [];
    private grassBlocks: Phaser.Physics.Matter.Sprite[] = [];
    private platformBlocks: Phaser.Physics.Matter.Sprite[] = [];

    private currentLevel: number = 0;
    private levelData!: IlevelData;
    private gameCompleted: boolean = false;
    private gameOver: boolean = false;

    private failText!: Phaser.GameObjects.Image;
    private completeText!: Phaser.GameObjects.Image;
    private levelText!: Phaser.GameObjects.Text;
    private backButton!: Phaser.GameObjects.Image;

    private levels: IlevelData[] = levels;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

    private ground!: Phaser.Physics.Matter.Image;

    private rays!: Phaser.GameObjects.Image;
    private refreshButton!: Phaser.GameObjects.Image;

    constructor() {
        super({ key: 'PlayScene' });
    }

    init(data: any) {
        if (data?.levelNumber) {
            this.currentLevel = data.levelNumber - 1;
        }
    }

    preload() {
        this.load.image('background', 'assets/background.png');
        this.load.image('player', 'assets/character.png');
        this.load.image('concrete', 'assets/concreteStone.png');
        this.load.image('gateStone', 'assets/stoneBigBlock.png');
        this.load.image('baseStone', 'assets/GrassBigBlock.png');
        this.load.image('grassBox', 'assets/grassStone.png');
        this.load.image('FAIL', 'assets/failText.png');
        this.load.image('COMPLETE', 'assets/completeText.png');
        this.load.image('backArrow', 'assets/backArrow.png');
        this.load.image('ground', 'assets/ground.png');
        this.load.image('rays', 'assets/rays.png');
        this.load.image('Refresh', 'assets/refresh.png');
    }

    create() {
        const Width = this.scale.width;
        const Height = this.scale.height;

        this.add.image(Width / 2, Height / 2, 'background')
            .setDisplaySize(Width, Height);

        // Ground as static matter body
        this.ground = this.matter.add.image(
            Width / 2,
            Height - PlayScene.GROUND_Y_OFFSET,
            'ground',
            undefined,
            { isStatic: true }
        )
            .setDisplaySize(Width + PlayScene.GROUND_WIDTH_EXTRA, Height * PlayScene.GROUND_HEIGHT_RATIO)
            .setOrigin(0.5, 0.5);

        // Clear block arrays
        this.blocks = [];
        this.stoneBlocks = [];
        this.grassBlocks = [];
        this.platformBlocks = [];

        this.createUI();
        this.loadLevel(this.currentLevel);

        this.input.on('pointerdown', this.onBlockClick, this);
        this.cursors = this.input.keyboard!.createCursorKeys();

        // Listen for player collision with baseStone or grassBox (for animation only)
        this.matter.world.on('collisionstart', this.handleCollisions, this);
    }

    private createUI() {
        this.backButton = this.add.image(
            PlayScene.BACK_BUTTON_X,
            PlayScene.BACK_BUTTON_Y,
            'backArrow'
        ).setScale(PlayScene.BACK_BUTTON_SCALE).setInteractive();
        this.backButton.on('pointerdown', this.goBackToLevelScene, this);
        this.backButton.on('pointerover', () => this.backButton.setScale(PlayScene.BACK_BUTTON_SCALE_HOVER));
        this.backButton.on('pointerout', () => this.backButton.setScale(PlayScene.BACK_BUTTON_SCALE));

        this.levelText = this.add.text(
            this.scale.width / 2,
            PlayScene.LEVEL_TEXT_Y,
            `Level ${this.currentLevel + 1}`,
            {
                fontSize: PlayScene.LEVEL_TEXT_SIZE,
                color: '#ffffff',
                fontFamily: 'Arial',
                fontStyle: 'bold'
            }
        ).setOrigin(0.5);

        // Add rays image behind fail and complete text, initially hidden
        this.rays = this.add.image(
            this.scale.width / 2,
            this.scale.height / 2,
            'rays'
        )
            .setScale(PlayScene.RAYS_SCALE)
            .setVisible(false)
            .setDepth(PlayScene.RAYS_DEPTH);

        this.failText = this.add.image(
            this.scale.width / 2,
            this.scale.height / 2,
            'FAIL'
        )
            .setVisible(false)
            .setDepth(PlayScene.FAIL_COMPLETE_DEPTH);

        this.completeText = this.add.image(
            this.scale.width / 2,
            this.scale.height / 2,
            'COMPLETE'
        )
            .setVisible(false)
            .setDepth(PlayScene.FAIL_COMPLETE_DEPTH);

        // Refresh button, only visible on fail
        this.refreshButton = this.add.image(
            this.scale.width / 2,
            this.scale.height / 2 + PlayScene.REFRESH_BUTTON_Y_OFFSET,
            'Refresh'
        )
            .setScale(PlayScene.REFRESH_BUTTON_SCALE)
            .setVisible(false)
            .setInteractive()
            .setDepth(PlayScene.REFRESH_BUTTON_DEPTH);

        this.refreshButton.on('pointerdown', () => {
            this.refreshButton.setVisible(false);
            this.failText.setVisible(false);
            this.rays.setVisible(false);
            this.loadLevel(this.currentLevel);
        });
        this.refreshButton.on('pointerover', () => this.refreshButton.setScale(PlayScene.REFRESH_BUTTON_SCALE_HOVER));
        this.refreshButton.on('pointerout', () => this.refreshButton.setScale(PlayScene.REFRESH_BUTTON_SCALE));
    }

    private goBackToLevelScene() {
        this.scene.start('LevelScene');
    }

    private loadLevel(levelIndex: number) {
        if (levelIndex >= this.levels.length) {
            this.scene.start('LevelScene');
            return;
        }

        this.levelData = this.levels[levelIndex];
        this.gameCompleted = false;
        this.gameOver = false;

        this.levelText.setText(`Level ${levelIndex + 1}`);

        // Destroy all blocks
        this.blocks.forEach(b => b.destroy());
        this.stoneBlocks = [];
        this.grassBlocks = [];
        this.platformBlocks = [];
        this.blocks = [];

        this.createBlocksFromLevelData();

        if (this.player) this.player.destroy();

        const centerX = this.scale.width / 2;
        const offsetX = centerX - PlayScene.BLOCK_STACK_OFFSET_X;

        // Create player sprite as matter body. setFixedRotation to prevent tipping.
        this.player = this.matter.add.sprite(
            this.levelData.player.positions.x + offsetX,
            this.levelData.player.positions.y,
            'player'
        )
            .setScale(PlayScene.PLAYER_SCALE)
            .setBounce(PlayScene.PLAYER_BOUNCE);

        // ensure player body's bounds reflect sprite size after scale
        try {
            // adjust the body to match the sprite display size
            const pW = this.player.displayWidth;
            const pH = this.player.displayHeight;
            this.player.setRectangle(pW, pH, { chamfer: 0 });
        } catch (e) {
            // If setRectangle is not available or fails, ignore — the checks use body.bounds anyway
        }
    }

    // Stack blocks with vertical offset so they don't overlap
    private createBlocksFromLevelData() {
        const centerX = this.scale.width / 2;
        const offsetX = centerX - PlayScene.BLOCK_STACK_OFFSET_X;
        const blockHeight = PlayScene.BLOCK_HEIGHT;
        let stackY = this.ground.y - this.ground.displayHeight / 2 - blockHeight / 2;

        const placed: { x: number, y: number }[] = [];
        const tolerance = PlayScene.BLOCK_STACK_TOLERANCE;

        const isOccupied = (x: number, y: number) =>
            placed.some(pos => Math.abs(pos.x - x) < tolerance && Math.abs(pos.y - y) < tolerance);

        // Helper to stack blocks vertically above the ground
        const tryCreate = (x: number, y: number, texture: string, type: string) => {
            let finalY = y;
            // If y is too close to ground, stack above previous
            if (finalY > stackY) {
                finalY = stackY;
                stackY -= blockHeight;
            }
            if (!isOccupied(x, finalY)) {
                placed.push({ x, y: finalY });
                this.createBlock(x, finalY, texture, type);
            }
        };

        this.levelData.concrete?.positions?.forEach(pos =>
            tryCreate(pos.x + offsetX, pos.y, 'concrete', 'stone')
        );

        this.levelData.gateStone?.positions?.forEach(pos =>
            tryCreate(pos.x + offsetX, pos.y, 'gateStone', 'stone')
        );

        this.levelData.grassBox?.positions?.forEach(pos =>
            tryCreate(pos.x + offsetX, pos.y, 'grassBox', 'grass')
        );

        const basePos = this.levelData.baseStone?.positions;
        if (Array.isArray(basePos)) {
            basePos.forEach(pos =>
                tryCreate(pos.x + offsetX, pos.y, 'baseStone', 'platform')
            );
        } else if (basePos) {
            tryCreate(basePos.x + offsetX, basePos.y, 'baseStone', 'platform');
        }
    }

    // All blocks fall naturally (gravity enabled by default in Matter)
    private createBlock(x: number, y: number, texture: string, type: string) {
        // All blocks are dynamic (fall with gravity)
        const block = this.matter.add.sprite(x, y, texture, undefined, { isStatic: false });
        block.setData('type', type);
        block.setData('originalX', x);
        block.setData('originalY', y);
        block.setData('isFalling', false);

        // Make sure the physics body matches the display size (helps bounds precision)
        try {
            const bW = block.displayWidth || block.width;
            const bH = block.displayHeight || block.height;
            block.setRectangle(bW, bH, { chamfer: 0 });
        } catch (e) {
            // ignore if setRectangle isn't available
        }

        this.blocks.push(block);

        if (type === 'stone') {
            block.setInteractive();
            this.stoneBlocks.push(block);
        } else if (type === 'grass') {
            this.grassBlocks.push(block);
        } else if (type === 'platform') {
            this.platformBlocks.push(block);
        }
    }

    private onBlockClick(pointer: Phaser.Input.Pointer) {
        if (this.gameOver || this.gameCompleted) return;

        const x = pointer.x;
        const y = pointer.y;

        if (this.backButton.getBounds().contains(x, y)) return;

        this.stoneBlocks.forEach(block => {
            if (block.getBounds().contains(x, y)) {
                this.destroyBlock(block);
            }
        });
    }

    private destroyBlock(block: Phaser.Physics.Matter.Sprite) {
        this.stoneBlocks = this.stoneBlocks.filter(b => b !== block);
        this.blocks = this.blocks.filter(b => b !== block);

        this.tweens.add({
            targets: block,
            scaleX: 0,
            scaleY: 0,
            alpha: 0,
            duration: PlayScene.DESTROY_BLOCK_DURATION,
            onComplete: () => {
                const destroyedX = block.x;
                const destroyedY = block.y;
                block.destroy();

                this.dropBlocksAbove(destroyedX, destroyedY);
                this.checkGameState();
            }
        });
    }

    private dropBlocksAbove(x: number, y: number) {
        this.blocks.forEach(block => {
            if (!block.getData('isFalling') && block.y < y && Math.abs(block.x - x) < block.width) {
                block.setStatic(false);
                block.setData('isFalling', true);
            }
        });
    }

    // Helper: check if player is standing on a grass or platform block
    private isPlayerOnSafeBlock(): boolean {
        if (!this.player || !this.player.body) return false;

        // Use Matter body bounds for precision
        const playerBody = this.player.body as MatterJS.BodyType;
        const playerBottom = playerBody.bounds.max.y;
        const playerLeft = playerBody.bounds.min.x;
        const playerRight = playerBody.bounds.max.x;

        const checkBlock = (block: Phaser.Physics.Matter.Sprite) => {
            if (!block || !block.body) return false;

            const blockBody = block.body as MatterJS.BodyType;
            const blockTop = blockBody.bounds.min.y;
            const blockLeft = blockBody.bounds.min.x;
            const blockRight = blockBody.bounds.max.x;

            // vertical alignment within tolerance
            const verticalAligned = Math.abs(playerBottom - blockTop) <= PlayScene.VERTICAL_TOLERANCE;

            // horizontal overlap
            const horizontalOverlap = playerRight > blockLeft && playerLeft < blockRight;

            return verticalAligned && horizontalOverlap;
        };

        const onGrass = this.grassBlocks.some(checkBlock);
        const onPlatform = this.platformBlocks.some(checkBlock);

        return onGrass || onPlatform;
    }

    private checkGameState() {
        if (this.gameOver || this.gameCompleted) return;

        if (this.player.y >= this.scale.height - PlayScene.PLAYER_FAIL_Y_OFFSET) {
            // player fell — fail
            this.gameOver = true;
            this.failText.setVisible(true);
            this.rays.setVisible(true);
            this.refreshButton.setVisible(true);
            return;
        }

        console.log("this.stoneBlocks:", this.stoneBlocks);

        if (this.stoneBlocks.length === 0) {
            // debug: print player position and exact physics checks
            console.log('Player position (center):', this.player.x, this.player.y);
            const safe = this.isPlayerOnSafeBlock();
            console.log('Is player on safe block?', safe);

            // print arrays counts properly
            console.log('Grass blocks remaining:', this.grassBlocks.length, 'Platform blocks remaining:', this.platformBlocks.length);

            // if not safe, print numeric comparison to help debug
            if (!safe) {
                // show player bottom and block tops for easier debugging
                const playerBody = this.player.body as MatterJS.BodyType;
                const playerBottom = playerBody.bounds.max.y;
                console.log('playerBottom:', playerBottom);

                this.grassBlocks.concat(this.platformBlocks).forEach((block, idx) => {
                    if (!block || !block.body) return;
                    const b = block.body as MatterJS.BodyType;
                    const blockTop = b.bounds.min.y;
                    const blockLeft = b.bounds.min.x;
                    const blockRight = b.bounds.max.x;
                    console.log(`block[${idx}] top:${blockTop} left:${blockLeft} right:${blockRight}`);
                });
            }
        }

        // Complete the game if all stone blocks are destroyed and player is on a safe block
        if (this.stoneBlocks.length === 0 && this.isPlayerOnSafeBlock()) {
            this.gameCompleted = true;
            this.completeText.setVisible(true);
            this.rays.setVisible(true);

            // --- Store completed level in localStorage ---
            const completedLevels = JSON.parse(localStorage.getItem('completedLevels') || '[]');
            if (!completedLevels.includes(this.currentLevel)) {
                completedLevels.push(this.currentLevel);
                localStorage.setItem('completedLevels', JSON.stringify(completedLevels));
            }
            // ---

            this.time.delayedCall(PlayScene.COMPLETE_DELAY, () => {
                this.completeText.setVisible(false);
                this.rays.setVisible(false);
                this.currentLevel++;
                if (this.currentLevel >= this.levels.length) {
                    this.scene.start('LevelScene');
                } else {
                    this.loadLevel(this.currentLevel);
                }
            });
        }
    }

    // (Optional) Animate when player touches baseStone or grassBox, but don't end game here
    private handleCollisions(event: Phaser.Physics.Matter.Events.CollisionStartEvent) {
        if (this.gameCompleted || this.gameOver) return;

        event.pairs.forEach(pair => {
            const { bodyA, bodyB } = pair;
            const spriteA = bodyA.gameObject as Phaser.Physics.Matter.Sprite;
            const spriteB = bodyB.gameObject as Phaser.Physics.Matter.Sprite;

            // Player touches ground: fail the game
            if (
                (spriteA === this.player && spriteB === this.ground) ||
                (spriteB === this.player && spriteA === this.ground)
            ) {
                this.gameOver = true;
                this.failText.setVisible(true);
                this.rays.setVisible(true);
                this.refreshButton.setVisible(true);
                // No auto-restart!
                return;
            }

            // You can add animation or sound here if needed
        });
    }

    update() {
    if (this.gameOver || this.gameCompleted) {
        // Rotate rays if visible
        if (this.rays.visible) {
            this.rays.rotation += 0.03;
        }
        return;
    }

    let direction = 0;
    if (this.cursors.left.isDown) {
        direction = -1;
    } else if (this.cursors.right.isDown) {
        direction = 1;
    }

    switch (direction) {
        case -1:
            this.player.setVelocityX(-PlayScene.PLAYER_MOVE_SPEED);
            break;
        case 1:
            this.player.setVelocityX(PlayScene.PLAYER_MOVE_SPEED);
            break;
        default:
            this.player.setVelocityX(0);
            break;
    }

    // Jump: check if player is touching down
    if (
        this.cursors.up.isDown &&
        Math.abs(this.player.body.velocity.y) < PlayScene.PLAYER_JUMP_VELOCITY_TOLERANCE
    ) {
        this.player.setVelocityY(-PlayScene.PLAYER_JUMP_SPEED);
    }

    // Continuously check game state (you can lower frequency if needed)
    this.checkGameState();
}
}
