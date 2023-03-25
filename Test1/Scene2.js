class Scene2 extends Phaser.Scene {
    constructor() {
        super("startGame");
    }


    create(){
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
        this.background.setOrigin(0,0);
        
        this.score = 0;
        this.ScoreLabel = this.add.text(20, 20, "SCORE: ").setDepth(1);

        this.LaserSound = this.sound.add("audio_laser");
        this.BoomSound = this.sound.add("audio_explosion");
        this.PowerUpSound = this.sound.add("audio_powerUp");
        
        

        this.MainMusic = this.sound.add("MainTheme");


        var musicConfig = {
            mute: false,
            volume: 0.5,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0,
        }

        this.MainMusic.play(musicConfig);
        
        this.poweramount = 0;
        
        this.lives = 3;
        this.LivesLabel = this.add.text(200, 20, "LIVES: " + this.lives);



        this.spaceship = this.add.sprite(config.width/2 - 50, config.height, "spaceship");
        this.spaceship.setScale(2.5);
        
        this.spaceship2 = this.add.sprite(config.width/2 - 50, config.height, "spaceship2");
        this.spaceship2.setScale(2.5);
        
        
        this.spaceship3 = this.add.sprite(config.width/2 - 50, config.height, "spaceship3");  
        this.spaceship3.setScale(1.5);
        
        this.meteor= this.add.image(config.width/2, config.height, "meteor");
        this.meteor.setScale(0.03);

        this.player= this.physics.add.sprite(config.width/2, config.height - 64, "player");
        this.player.setScale(1.5);
        this.player.play("thrust");

        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.player.setCollideWorldBounds(true);
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.projectiles = this.add.group();

        this.spaceship.play("ship1_anim");
        this.spaceship2.play("ship2_anim");
        this.spaceship3.play("ship3_anim");

        this.spaceship.setInteractive();
        this.spaceship2.setInteractive();
        this.spaceship3.setInteractive();
        this.meteor.setInteractive();
 
        this.powerUps = this.physics.add.group();

        this.Enemy = this.physics.add.group();
        this.Enemy.add(this.spaceship);
        this.Enemy.add(this.spaceship2);
        this.Enemy.add(this.spaceship3);
        this.Enemy.add(this.meteor);

      

        this.physics.add.overlap(this.player, this.powerUps, this.collectPowerUp, null, this);
        this.physics.add.overlap(this.player, this.Enemy, this.GameOver, null, this);
        this.physics.add.overlap(this.projectiles, this.Enemy, this.destoyEnemy, null, this);

        

        var maxObjects = 4;
        
        for (var i = 0; i <= maxObjects; i++){
            var powerUp = this.physics.add.sprite(16, 16, "power-up");
            this.powerUps.add(powerUp);
            powerUp.setRandomPosition(0, 0, game.config.width, game.config.height);
        
            if (Math.random() > 0.5){
                powerUp.play("red");
            } else {
                powerUp.play("grey");
            }
    
            powerUp.setVelocity(100, 100);
            powerUp.setCollideWorldBounds(true);
            powerUp.setBounce(1);
        
        
        
        }
        
        if (Math.random() > 0.5){
            powerUp.play("red");
        } else {
            powerUp.play("grey");
        }

        powerUp.setVelocity(100, 100);

    }


    collectPowerUp(player, powerUp){
        powerUp.disableBody(true, true);
        this.PowerUpSound.play();
        this.poweramount++;
        gameSettings.playerSpeed += 50;
    }

    

    GameOver(player, Enemy) {
        
        this.lives--;
        this.LivesLabel.text = "LIVES: " + this.lives;
        console.log("Lives left: " + this.lives);
        this.BoomSound.play();


        if (this.lives == 0){
            this.poweramount = 0;
            gameSettings.playerSpeed = 200;
            this.player.setImmovable(true);
            this.player.disableInteractive();
            this.player.body.enable = false;
            this.player.play("explode");
            this.MainMusic.stop();
            this.player.once('animationcomplete-explode', () => {
               this.scene.start('GameOver');
            });
            return;
        }
        
        
        var explosion = new Explosion(this, Enemy.x, Enemy.y);
        
        this.resetShipPos(Enemy);
        
        if(this.player.alpha < 1){
            return;
        }

        player.disableBody(true,true);
        
        this.time.addEvent({
            delay: 1000,
            callback: this.resetPlayerPos,
            callbackScope: this,
            loop: false
        });
        
        if (this.score < 100){
            this.score = 0;
            this.ScoreLabel.text = "SCORE: " + this.score;
        }
        else
        {
            this.score -= 100;
            this.ScoreLabel.text = "SCORE: " + this.score;
        }
        


        if (this.poweramount > 0){
            gameSettings.playerSpeed = gameSettings.playerSpeed - (50*this.poweramount);
            this.poweramount = 0;
        }

        
        
        
    }

    destoyEnemy(projectile, Enemy){
        projectile.destroy();
        var explosion = new Explosion(this, Enemy.x, Enemy.y);
        this.BoomSound.play();
        this.resetShipPos(Enemy);
        this.score += 15;
        this.ScoreLabel.text = "SCORE: " + this.score;
        

    }


    update(){
        this.moveship(this.spaceship, 1);
        this.moveship(this.spaceship2, 2);
        this.moveship(this.spaceship3, 3);
        this.moveship(this.meteor, 2.5);
    
        this.background.tilePositionY -= 0.5;
    
        this.movePlayerManager();

        if (Phaser.Input.Keyboard.JustDown(this.spacebar)){
            if(this.player.active){
                this.shootBeam();
            }
            
        }

        for(var i = 0; i < this.projectiles.getChildren().length; i++){
            var beam = this.projectiles.getChildren()[i];
            beam.update();
        }

    }


    moveship(ship, speed) {
        ship.y += speed;
        if (ship.y > config.height + 25){
            this.resetShipPos(ship);
        }
    }

 
    resetShipPos(ship){
        ship.y = 0
        var randomX = Phaser.Math.Between(0, config.width);
        ship.x = randomX;

    }
    
    resetPlayerPos(){
        var x = config.width/2;
        var y = config.height + 64;

        this.player.enableBody(true, x, y, true, true);

        this.player.alpha = 0.5;

        var tween = this.tweens.add ({
            targets: this.player,
            y: config.height - 64,
            ease: 'Power1',
            duration: 1500,
            repeat: 0,
            onComplete: function(){
                this.player.alpha = 1;
            },
            callbackScope: this
        })

    }
    
  
    shootBeam(){
        var beam = new Beam(this);
        this.projectiles.add(beam);
        this.LaserSound.play();
    }



    
    

    movePlayerManager(){
        if(this.cursorKeys.left.isDown){
            this.player.setVelocityX(-gameSettings.playerSpeed);
        } else if(this.cursorKeys.right.isDown){
            this.player.setVelocityX(gameSettings.playerSpeed);
        }
        else{
            this.player.setVelocityX(0);
        }

        if(this.cursorKeys.up.isDown){
            this.player.setVelocityY(-gameSettings.playerSpeed);
        } else if(this.cursorKeys.down.isDown){
            this.player.setVelocityY(gameSettings.playerSpeed);
        }
        else{
            this.player.setVelocityY(0);
        }

        
    
    }

    





    
    





}