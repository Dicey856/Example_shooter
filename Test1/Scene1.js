class Scene1 extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }

    preload(){
        this.load.image("background" , "assets/images/background.png");
        this.load.spritesheet("spaceship" , "assets/spritesheets/ship.png" , {frameWidth: 16, frameHeight: 16});
        this.load.spritesheet("spaceship2" , "assets/spritesheets/ship2.png" , {frameWidth: 32, frameHeight: 16});
        this.load.spritesheet("spaceship3" , "assets/spritesheets/ship3.png" , {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet("explosion" , "assets/spritesheets/explosion.png" , {frameWidth: 16, frameHeight: 16});
        this.load.spritesheet("power-up" , "assets/spritesheets/power-up.png" , {frameWidth: 16, frameHeight: 16});
        this.load.spritesheet("player" , "assets/spritesheets/player.png" , {frameWidth: 16, frameHeight: 24});
        this.load.spritesheet("beam" , "assets/spritesheets/beam.png" , {frameWidth: 16, frameHeight: 16});
        this.load.image("meteor" , "assets/images/meteor.png");
        this.load.audio("audio_laser" , "assets/sfx/laserShoot.wav");
        this.load.audio("audio_explosion" , "assets/sfx/explosion.wav");
        this.load.audio("audio_powerUp" , "assets/sfx/powerUp.wav");
        this.load.audio("MainTheme" , "assets/music/maintheme.mp3");
        this.load.audio("MenuTheme" , "assets/music/MenuMusic.mp3");

    }

    


    create(){
        this.add.text(20, 20, "Loading game...");
        this.scene.start("MainMenu");

        this.anims.create({
            key: "ship1_anim",
            frames: this.anims.generateFrameNumbers("spaceship"),
            frameRate: 20,
            repeat: -1,
        });
        
        this.anims.create({
            key: "ship2_anim",
            frames: this.anims.generateFrameNumbers("spaceship2"),
            frameRate: 20,
            repeat: -1,
        });

        this.anims.create({
            key: "ship3_anim",
            frames: this.anims.generateFrameNumbers("spaceship3"),
            frameRate: 20,
            repeat: -1,
        });

        this.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers("explosion"),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: true 
        });
        
        this.anims.create({
            key: "red",
            frames: this.anims.generateFrameNumbers("power-up" , {start: 0, end: 1}),
            frameRate: 20,
            repeat: -1,
        });

        this.anims.create({
            key: "grey",
            frames: this.anims.generateFrameNumbers("power-up" , {start: 2, end: 3}),
            frameRate: 20,
            repeat: -1,
        });
        
        this.anims.create({
            key: "thrust",
            frames: this.anims.generateFrameNumbers("player"), 
            frameRate: 20,
            repeat: -1,
        });

        this.anims.create({
            key: "beam_anim",
            frames: this.anims.generateFrameNumbers("beam"), 
            frameRate: 20,
            repeat: -1,
        });
    }
}