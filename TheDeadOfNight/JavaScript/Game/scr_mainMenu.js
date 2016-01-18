/**
 * Created by Dan on 25/10/2015.
 */
MyGame.StateC = function (){
    this.background = null;
    this.mainMenuButtons = [];
    //DefineKeysForMenuNavigation
    this.enterKey, this.wKey, this.upKey, this.sKey, this.downKey = null;
    //ObjectsToActIsIndicatorsToTheStatusOfTheAudio
    this.musicStatusIndecator = null;
    this.sfxStatusIndecator = null;
};

MyGame.StateC.prototype = {
    //SetUpMainMenuState
    create: function(){
        //AddImagesToMainMenu
        this.addImages();
        //CheckAudioVariablesStatusToUpdateImages
        this.checkAudioStatus();
        //PlayMenuMusic
        this.playMainMenuMusic();
        //SetTheButtonObjectProperties
        this.buttonObjectSettings();
        //SetUpInputKeys
        this.playerKeyboardInput();
    },

    update: function(){
        //MouseOverButtons
        this.mouseOverButtons();
        //SlightlyMoveSelectedButtonDownToSimulateItAsSelected
        this.animateButtonSelection();
    },

    //AddImagesToStage
    addImages: function(){
        //AddBackgroundToGame
        this.background = this.add.sprite(0, 0, 'spr_game', 'bg_mainMenu.png');
        //AddButtonsToGame
        this.mainMenuButtons[0] = this.add.sprite(canvasWidth/2, 250, 'spr_game', 'spr_startButton.png');
        this.mainMenuButtons[1] = this.add.sprite(canvasWidth/2, 400, 'spr_game', 'spr_controlsButton.png');
        this.mainMenuButtons[2] = this.add.sprite(canvasWidth/2 - 120, 550, 'spr_game', 'spr_musicButton.png');
        this.mainMenuButtons[3] = this.add.sprite(canvasWidth/2 + 120, 550, 'spr_game', 'spr_sfxButton.png');
        //AddImagesToIndicateIfAudioIsPlaying
        this.musicStatusIndecator = this.add.sprite(-100, -100, 'spr_game', 'spr_audioMutedIndecator.png');
        this.sfxStatusIndecator = this.add.sprite(canvasWidth/2 + 95, 515, 'spr_game', 'spr_audioMutedIndecator.png');
    },

    //CheckAudioVariablesStatusToUpdateImages
    checkAudioStatus: function(){
        //AddLineThroughMusicImageToIndicateMusicIsNotPlaying
        if(!MyGame.playMusic){
            this.musicStatusIndecator.x = canvasWidth/2 - 140;
            this.musicStatusIndecator.y = 515;
        }
        else{
            this.musicStatusIndecator.x = -100;
        }
        //AddLineThroughSFXImageToIndicateSFXAreDisabled
        if(!MyGame.playSFX){
            this.sfxStatusIndecator.x = canvasWidth/2 + 95;
            this.sfxStatusIndecator.y = 515;
        }
        else{
            this.sfxStatusIndecator.x = -100;
        }
    },

    //CheckForMouseOverButton
    mouseOverButtons: function(){
        //ChangeButtonImageToSelectedImageFrame
        if(this.mainMenuButtons[0].input.pointerOver()){
            this.mainMenuButtons[0].frameName = 'spr_startButtonSelected.png';
            this.mainMenuButtons[0].y = 260;
            this.mainMenuButtons[1].frameName = 'spr_controlsButton.png';
            this.mainMenuButtons[1].y = 400;
            this.mainMenuButtons[2].frameName = 'spr_musicButton.png';
            this.mainMenuButtons[2].y = 550;
            this.mainMenuButtons[3].frameName = 'spr_sfxButton.png';
            this.mainMenuButtons[3].y = 550;
        }
        else if(this.mainMenuButtons[1].input.pointerOver()){
            this.mainMenuButtons[1].frameName = 'spr_controlsButtonSelected.png';
            this.mainMenuButtons[1].y = 410;
            this.mainMenuButtons[0].frameName = 'spr_startButton.png';
            this.mainMenuButtons[0].y = 250;
            this.mainMenuButtons[2].frameName = 'spr_musicButton.png';
            this.mainMenuButtons[2].y = 550;
            this.mainMenuButtons[3].frameName = 'spr_sfxButton.png';
            this.mainMenuButtons[3].y = 550;
        }
        else if(this.mainMenuButtons[2].input.pointerOver()){
            this.mainMenuButtons[2].frameName = 'spr_musicButtonSelected.png';
            this.mainMenuButtons[2].y = 560;
            this.mainMenuButtons[1].frameName = 'spr_controlsButton.png';
            this.mainMenuButtons[1].y = 400;
            this.mainMenuButtons[0].frameName = 'spr_startButton.png';
            this.mainMenuButtons[0].y = 250;
            this.mainMenuButtons[3].frameName = 'spr_sfxButton.png';
            this.mainMenuButtons[3].y = 550;
        }
        else if(this.mainMenuButtons[3].input.pointerOver()){
            this.mainMenuButtons[3].frameName = 'spr_sfxButtonSelected.png';
            this.mainMenuButtons[3].y = 560;
            this.mainMenuButtons[0].frameName = 'spr_startButton.png';
            this.mainMenuButtons[0].y = 250;
            this.mainMenuButtons[1].frameName = 'spr_controlsButton.png';
            this.mainMenuButtons[1].y = 400;
            this.mainMenuButtons[2].frameName = 'spr_musicButton.png';
            this.mainMenuButtons[2].y = 550;
        }
    },

    //SetTheButtonObjectProperties
    buttonObjectSettings: function(){
        //LoopThroughButtons
        for(var i = 0; i<this.mainMenuButtons.length; i++){
            //EnableMouseInputOnButtons
            this.mainMenuButtons[i].inputEnabled = true;
            //SetAnchorToCenterOfImage
            this.mainMenuButtons[i].anchor.setTo(0.5);
        }
        //AddButtonPressEvents
        this.mainMenuButtons[0].events.onInputDown.add(this.startSelected, this);
        this.mainMenuButtons[1].events.onInputDown.add(this.controlsPageSelected, this);
        this.mainMenuButtons[2].events.onInputDown.add(this.toggleMusic, this);
        this.mainMenuButtons[3].events.onInputDown.add(this.toggleSFX, this);
    },

    //StartGameWhenButtonClicked
    startSelected: function(){
        //PlayButtonClick
        this.playButtonClick();
        //IfMusicIsPlayingStopIt
        if(MyGame.music_menus.isPlaying){
            MyGame.music_menus.stop();
        }
        //GoToLevel1
        this.state.start('level');
    },

    //GoToControlsPageWhenButtonClicked
    controlsPageSelected: function(){
        //PlayButtonClick
        this.playButtonClick();
        //GoToControlsPage
        this.state.start('controls');
    },

    //ToggleStatusOfMusic
    toggleMusic: function(){
        //PlayButtonClick
        this.playButtonClick();
        if(MyGame.playMusic && MyGame.music_menus.isPlaying){
            MyGame.playMusic = false;
            //stopMusic
            MyGame.music_menus.stop();
            //AddLineThroughMusicImageToIndicateMusicIsNotPlaying
            this.checkAudioStatus();
        }
        else{
            //musicIsPlaying = true;
            MyGame.playMusic = true;
            //playMusic
            MyGame.music_menus.play();
            //AddLineThroughMusicImageToIndicateMusicIsNotPlaying
            this.checkAudioStatus();
        }
    },

    //ToggleStatusOfSFX
    toggleSFX: function(){
        if(MyGame.playSFX){
            MyGame.playSFX = false;
            //AddLineThroughSFXImageToIndicateSFXAreDisabled
            this.checkAudioStatus();
        }
        else{
            MyGame.playSFX = true;
            //AddLineThroughSFXImageToIndicateSFXAreEnabled
            //AddLineThroughMusicImageToIndicateMusicIsNotPlaying
            this.checkAudioStatus();
        }
        //PlayButtonClick
        this.playButtonClick();
    },

    //PlayMusic
    playMainMenuMusic: function(){
        //AddMusic
        if(MyGame.playMusic && !MyGame.music_menus.isPlaying){
            MyGame.music_menus.play();
        }
    },

    //PlayButtonClick
    playButtonClick: function(){
        if(MyGame.playSFX){
            MyGame.buttonClick.play();
        }
    },

    //DefineKeyboardInput
    playerKeyboardInput: function(){
        //PressEnterToGoToDifferentState
        this.enterKey = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.enterKey.onDown.add(this.enterKeySelection, this);
        //PressWKeyToMoveUpMenu
        this.wKey = this.input.keyboard.addKey(Phaser.Keyboard.W);
        this.wKey.onDown.add(this.moveMenuSelectionUp, this);
        //PressUPArrowKeyToMoveUpMenu
        this.upKey = this.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.upKey.onDown.add(this.moveMenuSelectionUp, this);
        //PressSKeyToMoveDownMenu
        this.sKey = this.input.keyboard.addKey(Phaser.Keyboard.S);
        this.sKey.onDown.add(this.moveMenuSelectionDown, this);
        //PressDOWNArrowKeyToMoveDownMenu
        this.downKey = this.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        this.downKey.onDown.add(this.moveMenuSelectionDown, this);
    },

    //SelectedMenuButtonsWhenKeyboardPressed
    moveMenuSelectionUp: function(){
        //CheckNoButtonsAreCurrentlySelected
        if(this.mainMenuButtons[0].frameName==='spr_startButton.png' && this.mainMenuButtons[1].frameName==='spr_controlsButton.png'
        && this.mainMenuButtons[2].frameName==='spr_musicButton.png' && this.mainMenuButtons[3].frameName==='spr_sfxButton.png'){
            //IfNoButtonsAreSelectedSetStartButtonAsSelected
            this.mainMenuButtons[0].frameName = 'spr_startButtonSelected.png';
        }
        //CheckIfStartButtonIsSelected
        else if(this.mainMenuButtons[0].frameName === 'spr_startButtonSelected.png'){
            //IfStartButtonIsSelectedThenUnselectTheStartButtonAndSelectSFXButton
            this.mainMenuButtons[0].frameName = 'spr_startButton.png';
            this.mainMenuButtons[3].frameName = 'spr_sfxButtonSelected.png';
        }
        //CheckIfSFXButtonIsSelected
        else if(this.mainMenuButtons[3].frameName === 'spr_sfxButtonSelected.png'){
            //IfSFXButtonIsSelectedThenUnselectTheSFXButtonAndSelectMusicButton
            this.mainMenuButtons[3].frameName = 'spr_sfxButton.png';
            this.mainMenuButtons[2].frameName = 'spr_musicButtonSelected.png';
        }
        //CheckIfMusicButtonIsSelected
        else if(this.mainMenuButtons[2].frameName === 'spr_musicButtonSelected.png'){
            //IfMusicButtonIsSelectedThenUnselectTheMusicButtonAndSelectControlsButton
            this.mainMenuButtons[2].frameName = 'spr_musicButton.png';
            this.mainMenuButtons[1].frameName = 'spr_controlsButtonSelected.png';
        }
        //CheckIfControlsButtonIsSelected
        else if(this.mainMenuButtons[1].frameName === 'spr_controlsButtonSelected.png'){
            //IfControlsButtonIsSelectedThenUnselectTheControlsButtonAndSelectStartButton
            this.mainMenuButtons[1].frameName = 'spr_controlsButton.png';
            this.mainMenuButtons[0].frameName = 'spr_startButtonSelected.png';
        }
    },

    //SelectedMenuButtonsWhenKeyboardPressed
    moveMenuSelectionDown: function(){
        //CheckNoButtonsAreCurrentlySelected
        if(this.mainMenuButtons[0].frameName==='spr_startButton.png' && this.mainMenuButtons[1].frameName==='spr_controlsButton.png'
            && this.mainMenuButtons[2].frameName==='spr_musicButton.png' && this.mainMenuButtons[3].frameName==='spr_sfxButton.png'){
            //IfNoButtonsAreSelectedSetStartButtonAsSelected
            this.mainMenuButtons[0].frameName = 'spr_startButtonSelected.png';
        }
        //CheckIfStartButtonIsSelected
        else if(this.mainMenuButtons[0].frameName === 'spr_startButtonSelected.png'){
            //IfStartButtonIsSelectedThenUnselectTheStartButtonAndSelectControlsButton
            this.mainMenuButtons[0].frameName = 'spr_startButton.png';
            this.mainMenuButtons[1].frameName = 'spr_controlsButtonSelected.png';
        }
        //CheckIfControlsButtonIsSelected
        else if(this.mainMenuButtons[1].frameName === 'spr_controlsButtonSelected.png'){
            //IfControlsButtonIsSelectedThenUnselectTheControlsButtonAndSelectMusicButton
            this.mainMenuButtons[1].frameName = 'spr_controlsButton.png';
            this.mainMenuButtons[2].frameName = 'spr_musicButtonSelected.png';
        }
        //CheckIfMusicButtonIsSelected
        else if(this.mainMenuButtons[2].frameName === 'spr_musicButtonSelected.png'){
            //IfMusicButtonIsSelectedThenUnselectTheMusicButtonAndSelectSFXButton
            this.mainMenuButtons[2].frameName = 'spr_musicButton.png';
            this.mainMenuButtons[3].frameName = 'spr_sfxButtonSelected.png';
        }
        //CheckIfSFXButtonIsSelected
        else if(this.mainMenuButtons[3].frameName === 'spr_sfxButtonSelected.png'){
            //IfSFXButtonIsSelectedThenUnselectTheSFXButtonAndSelectStartButton
            this.mainMenuButtons[3].frameName = 'spr_sfxButton.png';
            this.mainMenuButtons[0].frameName = 'spr_startButtonSelected.png';
        }
    },

    //SlightlyMoveSelectedButtonDownToSimulateItAsSelected
    animateButtonSelection: function(){
        //CheckWhatButtonHasSelectedThenMoveThatButtonDown10PixelsToShowItAsSelected
        if(this.mainMenuButtons[0].frameName === 'spr_startButtonSelected.png'){
            this.mainMenuButtons[0].y = 260;
            this.mainMenuButtons[1].y = 400;
            this.mainMenuButtons[2].y = 550;
            this.mainMenuButtons[3].y = 550;
        }
        else if(this.mainMenuButtons[1].frameName === 'spr_controlsButtonSelected.png'){
            this.mainMenuButtons[1].y = 410;
            this.mainMenuButtons[0].y = 250;
            this.mainMenuButtons[2].y = 550;
            this.mainMenuButtons[3].y = 550;
        }
        else if(this.mainMenuButtons[2].frameName === 'spr_musicButtonSelected.png'){
            this.mainMenuButtons[2].y = 560;
            this.mainMenuButtons[1].y = 400;
            this.mainMenuButtons[0].y = 250;
            this.mainMenuButtons[3].y = 550;
        }
        else if(this.mainMenuButtons[3].frameName === 'spr_sfxButtonSelected.png'){
            this.mainMenuButtons[3].y = 560;
            this.mainMenuButtons[0].y = 250;
            this.mainMenuButtons[1].y = 400;
            this.mainMenuButtons[2].y = 550;
        }
        //CheckIfTheMusicIsNotMutedAndTheMusicToggleButtonIsSelectedToMoveTheStatusIndicator
        if(this.mainMenuButtons[2].frameName === 'spr_musicButtonSelected.png' && MyGame.playMusic){
            this.musicStatusIndecator.y = 525;
        }
        else if(this.mainMenuButtons[2].frameName === 'spr_musicButton.png' && MyGame.playMusic){
            this.musicStatusIndecator.y = 515;
        }
        //CheckIfTheSFXIsNotMutedAndTheSFXToggleButtonIsSelectedToMoveTheStatusIndicator
        if(this.mainMenuButtons[3].frameName === 'spr_sfxButtonSelected.png' && MyGame.playSFX){
            this.sfxStatusIndecator.y = 525;
        }
        else if(this.mainMenuButtons[3].frameName === 'spr_sfxButton.png' && MyGame.playSFX){
            this.sfxStatusIndecator.y = 515;
        }
    },

    //EnterKeyButtonSelection
    enterKeySelection: function(){
        //IfStartButtonSelectedAndEnterKeyPressedStartGame
        if(this.mainMenuButtons[0].frameName === 'spr_startButtonSelected.png'){
            this.startSelected();
        }
        //IfControlsButtonSelectedAndEnterKeyPressedGoToControlsPage
        if(this.mainMenuButtons[1].frameName === 'spr_controlsButtonSelected.png'){
            this.controlsPageSelected();
        }
        //IfMusicButtonSelectedAndEnterKeyPressedToggleMusic
        if(this.mainMenuButtons[2].frameName === 'spr_musicButtonSelected.png'){
            this.toggleMusic();
        }
        //IfSFXtButtonSelectedAndEnterKeyPressedToggleSFX
        if(this.mainMenuButtons[3].frameName === 'spr_sfxButtonSelected.png'){
            this.toggleSFX();
        }
    }
};