/**
 * Created by Dan on 25/10/2015.
 */


MyGame.StateD = function(){
    this.background = null;
    this.backButton = null;
    this.enterKey = null;
};

MyGame.StateD.prototype = {

    //SetUpControlsState
    create: function(){
        //AddImagesToMainMenu
        this.addImages();
        //SetTheButtonObjectProperties
        this.buttonObjectSettings();
        //SetUpInputKeys
        this.playerKeyboardInput();
    },

    //AddImagesToStage
    addImages: function(){
        //AddBackgroundToGame
        this.background = this.add.sprite(0, 0, 'spr_game', 'bg_controls.png');
        //AddButtonsToGame
        this.backButton = this.add.sprite(220, 680, 'spr_game', 'spr_backButton.png');
    },


    //SetTheBackButtonProperties
    buttonObjectSettings: function(){
        this.backButton.anchor.setTo(0.5);
        this.backButton.inputEnabled = true;
        this.backButton.events.onInputDown.add(this.backButtonPressed, this);
    },

    //DefineKeyboardInput
    playerKeyboardInput: function(){
        //PressEnterToGoToDifferentState
        this.enterKey = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.enterKey.onDown.add(this.backButtonPressed, this);
    },

    //GoToControlsPageWhenButtonClicked
    backButtonPressed: function(){
        //PlayButtonClick
        this.playButtonClick();
        //GoToControlsPage
        this.state.start('mainMenu');
    },

    //PlayButtonClick
    playButtonClick: function(){
        if(MyGame.playSFX){
            MyGame.buttonClick.play();
        }
    }
};