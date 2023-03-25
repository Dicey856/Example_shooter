class MainMenu extends Phaser.Scene {
    constructor() {
      super({ key: "MainMenu" });
    }
  
    preload() {
      // Load any necessary assets
    }
  
    create() {
      // Add the game title
      
      this.MenuTheme = this.sound.add("MenuTheme");

      var musicConfig = {
        mute: false,
        volume: 0.5,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: true,
        delay: 0,
    }

    this.MenuTheme.play(musicConfig);
      
      const titleText = this.add.text(
        this.cameras.main.width / 2,
        this.cameras.main.height / 4,
        "Example Shooter",
        { font: "64px MainFont", fill: "#ffffff" }
      );
      titleText.setOrigin(0.5);
  
      // Add the Play button
      const playButton = this.add.text(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2,
        "Play",
        { font: "32px MainFont", fill: "#ffffff" }
      );
      playButton.setOrigin(0.5);
      playButton.setInteractive();
  
      // Add the Quit button
      const quitButton = this.add.text(
        this.cameras.main.width / 2,
        (this.cameras.main.height / 4) * 3,
        "Quit",
        { font: "32px MainFont", fill: "#ffffff" }
      );
      quitButton.setOrigin(0.5);
      quitButton.setInteractive();
  
      // Set up button highlighting and selection
      const buttons = [playButton, quitButton];
      let selectedButton = 0;
      buttons[selectedButton].setColor("#ffff00");
  
      function highlightButton(index) {
        buttons[selectedButton].setColor("#ffffff");
        selectedButton = index;
        buttons[selectedButton].setColor("#ffff00");
      }
      
      
      /*const highlightButton = (index) => {
        buttons[selectedButton].setColor("#ffffff");
        selectedButton = index;
        buttons[selectedButton].setColor("#ffff00");
      };*/
  
      // Set up button actions
      playButton.on("pointerdown", () => {
        this.MenuTheme.stop();
        this.scene.start("startGame");
      });
      quitButton.on("pointerdown", () => {
        this.game.destroy(true);
      });
  
      // Set up input controls
      const cursors = this.input.keyboard.createCursorKeys();
      cursors.down.on("down", () => {
        highlightButton((selectedButton + 1) % buttons.length);
      });
      cursors.up.on("down", () => {
        highlightButton((selectedButton - 1 + buttons.length) % buttons.length);
      });
      this.input.keyboard.on("keydown-ENTER", () => {
        buttons[selectedButton].emit("pointerdown");
      });
    }
  }