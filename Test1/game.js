var config = {
    width: 750,
    height: 500,
    backgroundColor: 0x000000,
    scene: [Scene1, Scene2, GameOver, MainMenu],
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade:{
            debug: false
        }
    }

}

var gameSettings = {
    playerSpeed: 200, 
}

function preload() {
    this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
}

function create(){
    WebFont.load({
        custom: {
            families: ['MainFont'],
            urls: ['assets/fonts/RetroGaming.ttf']
        },
        active: function() {
            // Font is now loaded and ready to use
        }
    });
}


var game = new Phaser.Game(config);