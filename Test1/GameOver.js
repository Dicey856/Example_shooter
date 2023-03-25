class GameOver extends Phaser.Scene {
    constructor() {
        super("GameOver");
    }

    
    
    create() {
        // Add game over message and instructions
        let gameScene = this.scene.get('startGame');
        this.score = gameScene.score; 
        
        
        this.add.text(
            config.width/2, 
            config.height/2, 
            "Game Over\n\nYour score: " + this.score + "\n\nPress R to restart " + "\n\nPress M to go back to Main Menu", 
            { 
                font: "32px MainFont", 
                fill: "#fff",
                align: "center"
            }
        ).setOrigin(0.5);

        

        // Set up the spacebar key to restart the game
        this.input.keyboard.on('keydown-R', function (event) {
            this.scene.start("startGame");
        }, this);

        this.input.keyboard.on('keydown-M', function (event) {
            this.scene.start("MainMenu");
        }, this);
    }
}