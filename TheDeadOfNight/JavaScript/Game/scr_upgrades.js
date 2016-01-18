/**
 * Created by Dan on 01/11/2015.
 */

MyGame.StateF = function(){
    //SetCostOfEachUpgrade
    this.healthMultiplierCost = null;
    this.ammoMultiplierCost = null;
    this.damageMultiplierCost = null;
    //LevelObjects
    this.background = null, this.buttons = [], this.buttonsText = [];
    //DefineKeysForMenuNavigation
    this.enterKey, this.wKey, this.upKey, this.sKey, this.downKey = null;
    //DisplayCurrentPlayerMoney
    this.currentMoneyDisplay=null;
};

MyGame.StateF.prototype = {
    //SetUpControlsState
    create: function(){
        //SetCostOfEachUpgrade
        this.healthMultiplierCost = (healthMultiplier + 0.5) * BASEMULTIPLIERCOST;
        this.ammoMultiplierCost = (ammoMultiplier + 0.5) * BASEMULTIPLIERCOST;
        this.damageMultiplierCost = (damageMultiplier + 0.5) * BASEMULTIPLIERCOST;
        //SetCoursorImage
        this.updateCursor();
        //DisplayScene
        this.setUpScene();
        //SetUpKeysForNavigation
        this.playerKeyboardInput();
        //SetButtonProperties
        this.setUpButtons();
    },

    update: function(){
        //CheckForMouseOverButton
        this.mouseOverButtons();
    },

    //CheckForMouseOverButton
    mouseOverButtons: function() {
        //MouseOverHealthUpgradeButton
        if(this.buttons[0].input.pointerOver() && this.buttons[0].y == 229.5){
            this.healthUpgradeButtonSelected();
            this.ammoUpgradeButtonUnselected();
            this.damageUpgradeButtonUnselected();
            this.mainMenuButtonUnselected();
            this.playAgainButtonUnselected();
        }
        //MouseOverAmmoUpgradeButton
        if(this.buttons[1].input.pointerOver() && this.buttons[1].y == 229.5){
            this.buttons[1].y += 10;
            this.ammoUpgradeButtonSelected();
            this.healthUpgradeButtonUnselected();
            this.damageUpgradeButtonUnselected();
            this.mainMenuButtonUnselected();
            this.playAgainButtonUnselected();
        }
        //MouseOverDamageUpgradeButton
        if(this.buttons[2].input.pointerOver() && this.buttons[2].y == 504.5){
            this.buttons[2].y += 10;
            this.damageUpgradeButtonSelected();
            this.healthUpgradeButtonUnselected();
            this.ammoUpgradeButtonUnselected();
            this.mainMenuButtonUnselected();
            this.playAgainButtonUnselected();
        }
        //MouseOverPlayAgainButton
        if(this.buttons[3].input.pointerOver() && this.buttons[3].y == canvasHeight-64.5){
            this.playAgainButtonSelected();
            this.healthUpgradeButtonUnselected();
            this.ammoUpgradeButtonUnselected();
            this.damageUpgradeButtonUnselected();
            this.mainMenuButtonUnselected();
        }
        //MouseOverMainMenuButton
        if(this.buttons[4].input.pointerOver() && this.buttons[4].y == canvasHeight-64.5){
            this.mainMenuButtonSelected();
            this.healthUpgradeButtonUnselected();
            this.ammoUpgradeButtonUnselected();
            this.damageUpgradeButtonUnselected();
            this.playAgainButtonUnselected();
        }
    },

    //SelectedMenuButtonsWhenKeyboardPressed
    moveButtonSelectionUp: function(){
        //SelectMainMenuButton
        if (this.buttons[4].y == canvasHeight-64.5 && this.buttons[0].y != 229.5){
            this.healthUpgradeButtonUnselected();
            this.ammoUpgradeButtonUnselected();
            this.damageUpgradeButtonUnselected();
            this.playAgainButtonUnselected();
            this.mainMenuButtonSelected();
        }
        //PlayAgainButtonSelected
        else if(this.buttons[3].y == canvasHeight-64.5 && this.buttons[4].y != canvasHeight-64.5){
            this.mainMenuButtonUnselected();
            this.healthUpgradeButtonUnselected();
            this.ammoUpgradeButtonUnselected();
            this.damageUpgradeButtonUnselected();
            this.playAgainButtonSelected();
        }
        //DamageButtonSelected
        else if(this.buttons[2].y == 504.5 && this.buttons[3].y != canvasHeight-64.5){
            this.damageUpgradeButtonSelected();
            this.healthUpgradeButtonUnselected();
            this.ammoUpgradeButtonUnselected();
            this.playAgainButtonUnselected();
            this.mainMenuButtonUnselected();
        }
        //AmmoButtonSelected
        else if(this.buttons[1].y == 229.5 && this.buttons[2].y != 504.5){
            this.ammoUpgradeButtonSelected();
            this.damageUpgradeButtonUnselected();
            this.healthUpgradeButtonUnselected();
            this.playAgainButtonUnselected();
            this.mainMenuButtonUnselected();
        }
        //SelectHealthUpgradeButton
        else if(this.buttons[0].y == 229.5){
            this.healthUpgradeButtonSelected();
            this.ammoUpgradeButtonUnselected();
            this.damageUpgradeButtonUnselected();
            this.mainMenuButtonUnselected();
            this.playAgainButtonUnselected();
        }
    },

    //SelectedMenuButtonsWhenKeyboardPressed
    moveButtonSelectionDown: function(){
        //AmmoButtonSelected
        if(this.buttons[1].y == 229.5 && this.buttons[0].y != 229.5){
            this.ammoUpgradeButtonSelected();
            this.damageUpgradeButtonUnselected();
            this.healthUpgradeButtonUnselected();
            this.playAgainButtonUnselected();
            this.mainMenuButtonUnselected();
        }
        //DamageButtonSelected
        else if(this.buttons[2].y == 504.5 && this.buttons[1].y != 229.5){
            this.damageUpgradeButtonSelected();
            this.healthUpgradeButtonUnselected();
            this.ammoUpgradeButtonUnselected();
            this.playAgainButtonUnselected();
            this.mainMenuButtonUnselected();
        }
        //PlayAgainButtonSelected
        else if(this.buttons[3].y == canvasHeight-64.5 && this.buttons[2].y != 504.5){
            this.mainMenuButtonUnselected();
            this.healthUpgradeButtonUnselected();
            this.ammoUpgradeButtonUnselected();
            this.damageUpgradeButtonUnselected();
            this.playAgainButtonSelected();
        }
        //SelectMainMenuButton
        else if (this.buttons[4].y == canvasHeight-64.5 && this.buttons[3].y != canvasHeight-64.5){
            this.healthUpgradeButtonUnselected();
            this.ammoUpgradeButtonUnselected();
            this.damageUpgradeButtonUnselected();
            this.playAgainButtonUnselected();
            this.mainMenuButtonSelected();
        }
        //SelectHealthUpgradeButton
        else if(this.buttons[0].y == 229.5){
            this.healthUpgradeButtonSelected();
            this.ammoUpgradeButtonUnselected();
            this.damageUpgradeButtonUnselected();
            this.mainMenuButtonUnselected();
            this.playAgainButtonUnselected();
        }
    },

    //SetUpTheScene
    setUpScene: function(){
        //AddBackground
        this.background = this.add.sprite(0, 0, 'spr_game', 'bg_upgrades.png');
        //AddUpgradeButtons
        //HealthUpgrade
        this.buttons[0] = this.add.sprite(canvasWidth/2-290, 229.5, 'spr_game', 'spr_healthUpgradeButton.png');
        this.buttonsText[0] = this.add.text(this.buttons[0].x + 20, this.buttons[0].y-25, 'Upgrade Health $' + this.healthMultiplierCost, {fontSize: '30px', fill: '#ffffff'});
        this.buttonsText[1] = this.add.text(this.buttons[0].x + 20, this.buttons[0].y+10, 'Current Multiplier: ' + healthMultiplier, {fontSize: '30px', fill: '#ffffff'});
        //AmmoUpgrade
        this.buttons[1] = this.add.sprite(canvasWidth/2+290, 229.5, 'spr_game', 'spr_ammoUpgradeButton.png');
        this.buttonsText[2] = this.add.text(this.buttons[1].x + 20, this.buttons[1].y-25, 'Upgrade Ammo $' + this.ammoMultiplierCost, {fontSize: '30px', fill: '#ffffff'});
        this.buttonsText[3] = this.add.text(this.buttons[1].x + 20, this.buttons[1].y+10, 'Current Multiplier: ' + ammoMultiplier, {fontSize: '30px', fill: '#ffffff'});
        //DamageUpgrade
        this.buttons[2] = this.add.sprite(canvasWidth/2, 504.5, 'spr_game', 'spr_damageUpgradeButton.png');
        this.buttonsText[4] = this.add.text(this.buttons[2].x + 20, this.buttons[2].y-25, 'Upgrade Damage $' + this.damageMultiplierCost, {fontSize: '30px', fill: '#ffffff'});
        this.buttonsText[5] = this.add.text(this.buttons[2].x + 20, this.buttons[2].y+10, 'Current Multiplier: ' + damageMultiplier, {fontSize: '30px', fill: '#ffffff'});
        //AddNavigationButtons
        this.buttons[3] = this.add.sprite(100.5, canvasHeight-64.5, 'spr_game', 'spr_playAgainButton.png');
        this.buttons[4] = this.add.sprite(canvasWidth-100.5, canvasHeight-64.5, 'spr_game', 'spr_mainMenuButton.png');
        //SetTextProperties
        for(var i=0; i<this.buttonsText.length; i++){
            //SetFont
            this.buttonsText[i].font = 'VT323';
            //CenterText
            this.buttonsText[i].anchor.setTo(0.5, 0.5);
        }
        //AddCurrentPlayerMoneyDisplay
        this.currentMoneyDisplay = this.add.text(game.width/2, 100, 'Current Money: ' + playerMoney, {fontSize: '45px', fill: '#ffffff'});
        //SetFont
        this.currentMoneyDisplay.font = 'VT323';
        //CenterText
        this.currentMoneyDisplay.anchor.setTo(0.5, 0.5);

    },

    //DefineKeyboardInput
    playerKeyboardInput: function(){
        //PressWKeyToMoveUpMenu
        this.wKey = this.input.keyboard.addKey(Phaser.Keyboard.W);
        this.wKey.onDown.add(this.moveButtonSelectionUp, this);
        //PressUPArrowKeyToMoveUpMenu
        this.upKey = this.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.upKey.onDown.add(this.moveButtonSelectionUp, this);
        //PressSKeyToMoveDownMenu
        this.sKey = this.input.keyboard.addKey(Phaser.Keyboard.S);
        this.sKey.onDown.add(this.moveButtonSelectionDown, this);
        //PressDOWNArrowKeyToMoveDownMenu
        this.downKey = this.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        this.downKey.onDown.add(this.moveButtonSelectionDown, this);
        //PressEnterToGoToDifferentState
        this.enterKey = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.enterKey.onDown.add(this.enterKeySelection, this);
    },

    //SetButtonProperties
    setUpButtons: function(){
        //AddFunctionToPurchaseHealthButton
        this.buttons[0].events.onInputDown.add(this.purchaseHealthMultiplier, this);
        //AddFunctionToPurchaseAmmoButton
        this.buttons[1].events.onInputDown.add(this.purchaseAmmoMultiplier, this);
        //AddFunctionPurchaseDamageButton
        this.buttons[2].events.onInputDown.add(this.purchaseDamageMultiplier, this);
        //AddFunctionToPlayAgainButton
        this.buttons[3].events.onInputDown.add(this.playAgain, this);
        //AddFunctionToMainMenuButton
        this.buttons[4].events.onInputDown.add(this.goToMainMenu, this);
        //LoopThroughButtons
        for(var i = 0; i<this.buttons.length; i++){
            //EnableMouseInputOnButtons
            this.buttons[i].inputEnabled = true;
            this.buttons[i].anchor.setTo(0.5, 0.5)
        }
    },

    //RunActionWhenEnterPressed
    enterKeySelection: function(){
        //HealthUpgradeButtonSelected
        if(this.buttons[0].y == 239.5){
            //PlayButtonClick
            this.playButtonClick();
            this.purchaseHealthMultiplier();
        }
        //AmmoUpgradeButtonSelected
        else if(this.buttons[1].y == 239.5){
            //PlayButtonClick
            this.playButtonClick();
            this.purchaseAmmoMultiplier();
        }
        //DamageUpgradeButtonSelected
        else if(this.buttons[2].y == 514.5){
            //PlayButtonClick
            this.playButtonClick();
            this.purchaseDamageMultiplier();
        }
        //PlayAgainButtonSelected
        else if(this.buttons[3].y == canvasHeight-54.5){
            //PlayButtonClick
            this.playButtonClick();
            this.playAgain();
        }
        //SelectMainMenuButton
        else if(this.buttons[4].y == canvasHeight-54.5){
            //PlayButtonClick
            this.playButtonClick();
            this.goToMainMenu();
        }
    },

    //ReturnToLevel
    playAgain: function(){
        //PlayButtonClick
        this.playButtonClick();
        game.state.start('level');
    },

    //GoToMainMenu
    goToMainMenu: function(){
        //PlayButtonClick
        this.playButtonClick();
        game.state.start('mainMenu');
    },

    //PurchaseMultipliers
    purchaseHealthMultiplier: function() {
        //EnsurePlayerHasEnoughMoneyForUpgrade
        if(playerMoney >= this.healthMultiplierCost){
            //PlayButtonClick
            this.playButtonClick();
            //ReduceCurrentMoney
            playerMoney -= this.healthMultiplierCost;
            //UpdateMultiplier
            healthMultiplier += 0.5;
            //UpdateTheCostOfTheMultiplier
            this.healthMultiplierCost = (healthMultiplier + 0.5) * BASEMULTIPLIERCOST;
            //UpdateTextDisplay
            this.buttonsText[0].text = 'Upgrade Health $' + this.healthMultiplierCost;
            this.buttonsText[1].text = 'Current Multiplier: ' + healthMultiplier;
            //UpdateCurrentPlayerMoneyDisplay
            this.currentMoneyDisplay.text = 'Current Money: ' + playerMoney;
            //UploadUserData
            MyGame.updateUserData();
        }
    },
    purchaseAmmoMultiplier: function(){
        //EnsurePlayerHasEnoughMoneyForUpgrade
        if(playerMoney >= this.ammoMultiplierCost) {
            //PlayButtonClick
            this.playButtonClick();
            //ReduceCurrentMoney
            playerMoney -= this.ammoMultiplierCost;
            //UpdateMultiplier
            ammoMultiplier += 0.5;
            //UpdateTheCostOfTheMultiplier
            this.ammoMultiplierCost = (ammoMultiplier + 0.5) * BASEMULTIPLIERCOST;
            //UpdateTextDisplay
            this.buttonsText[2].text = 'Upgrade Ammo $' + this.ammoMultiplierCost;
            this.buttonsText[3].text = 'Current Multiplier: ' + ammoMultiplier;
            //UpdateCurrentPlayerMoneyDisplay
            this.currentMoneyDisplay.text = 'Current Money: ' + playerMoney;
            //UploadUserData
            MyGame.updateUserData();
        }
    },
    purchaseDamageMultiplier: function(){
        //EnsurePlayerHasEnoughMoneyForUpgrade
        if(playerMoney >= this.damageMultiplierCost) {
            //PlayButtonClick
            this.playButtonClick();
            //ReduceCurrentMoney
            playerMoney -= this.damageMultiplierCost;
            //UpdateMultiplier
            damageMultiplier += 0.5;
            //UpdateTheCostOfTheMultiplier
            this.damageMultiplierCost = (damageMultiplier + 0.5) * BASEMULTIPLIERCOST;
            //UpdateTextDisplay
            this.buttonsText[4].text = 'Upgrade Damage $' + this.damageMultiplierCost;
            this.buttonsText[5].text = 'Current Multiplier: ' + damageMultiplier;
            //UpdateCurrentPlayerMoneyDisplay
            this.currentMoneyDisplay.text = 'Current Money: ' + playerMoney;
            //UploadUserData
            MyGame.updateUserData();
        }
    },

    //HealthUpgradeButtonStatus
    healthUpgradeButtonSelected: function(){
        this.buttons[0].y = 239.5;
        this.buttonsText[0].y = this.buttons[0].y-25;
        this.buttonsText[1].y = this.buttons[0].y+10;
        //UpdateTextColour
        this.buttonsText[0].fill = '#c9b158';
        this.buttonsText[1].fill = '#c9b158';
    },
    healthUpgradeButtonUnselected: function(){
        this.buttons[0].y = 229.5;
        this.buttonsText[0].y = this.buttons[0].y-25;
        this.buttonsText[1].y = this.buttons[0].y+10;
        //UpdateTextColour
        this.buttonsText[0].fill = '#ffffff';
        this.buttonsText[1].fill = '#ffffff';
    },
    //AmmoUpgradeButtonStatus
    ammoUpgradeButtonSelected: function(){
        this.buttons[1].y = 239.5;
        //UpdateTextPosition
        this.buttonsText[2].y = this.buttons[1].y-25;
        this.buttonsText[3].y = this.buttons[1].y+10;
        //UpdateTextColour
        this.buttonsText[2].fill = '#c9b158';
        this.buttonsText[3].fill = '#c9b158';
    },
    ammoUpgradeButtonUnselected: function(){
        this.buttons[1].y = 229.5;
        //UpdateTextPosition
        this.buttonsText[2].y = this.buttons[1].y-25;
        this.buttonsText[3].y = this.buttons[1].y+10;
        //UpdateTextColour
        this.buttonsText[2].fill = '#ffffff';
        this.buttonsText[3].fill = '#ffffff';
    },
    //DamageUpgradeButtonStatus
    damageUpgradeButtonSelected: function(){
        this.buttons[2].y = 514.5;
        //UpdateTextPosition
        this.buttonsText[4].y = this.buttons[2].y-25;
        this.buttonsText[5].y = this.buttons[2].y+10;
        //UpdateTextColour
        this.buttonsText[4].fill = '#c9b158';
        this.buttonsText[5].fill = '#c9b158';
    },
    damageUpgradeButtonUnselected: function(){
        this.buttons[2].y = 504.5;
        //UpdateTextPosition
        this.buttonsText[4].y = this.buttons[2].y-25;
        this.buttonsText[5].y = this.buttons[2].y+10;
        //UpdateTextColour
        this.buttonsText[4].fill = '#ffffff';
        this.buttonsText[5].fill = '#ffffff';
    },
    //MainMenuButtonStatus
    mainMenuButtonSelected: function(){
        this.buttons[4].y = canvasHeight-54.5;
        this.buttons[4].frameName = 'spr_mainMenuButtonSelected.png';
    },
    mainMenuButtonUnselected: function(){
        this.buttons[4].y = canvasHeight-64.5;
        this.buttons[4].frameName = 'spr_mainMenuButton.png';
    },
    //PlayAgainButtonStatus
    playAgainButtonSelected: function(){
        this.buttons[3].y = canvasHeight-54.5;
        this.buttons[3].frameName = 'spr_playAgainButtonSelected.png';
    },
    playAgainButtonUnselected: function(){
        this.buttons[3].y = canvasHeight-64.5;
        this.buttons[3].frameName = 'spr_playAgainButton.png';
    },

    //ChangeCursor
    updateCursor: function(){
        //GetBodyOfPage
        var elementToChange = document.getElementsByTagName("body")[0];
        //HideCursor
        elementToChange.style.cursor = "url(./Assets/spr_cursor.png), none";
    },

    //PlayButtonClick
    playButtonClick: function(){
        if(MyGame.playSFX){
            MyGame.buttonClick.play();
        }
    }
};
