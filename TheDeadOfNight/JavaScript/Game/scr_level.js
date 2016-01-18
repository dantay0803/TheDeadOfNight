/**
 * Created by Dan on 31/10/2015.
 */
//0=moneyDisplay, 1=healthDisplay, 2=ammoDisplay, 3=weaponPurchaseInfo, 4=roundInfo
var GUIElements = [[null, null], [null, null], [null, null], [null, null], [null, null]];
//SetTheDelayBetweenShots
var fireRateDelay = FIRERATE_PISTOL;
var currentFireRateDelay=0;
//SetBulletDamage;
var bulletDamage=0;
//InGamePlayerMoney
var playerMoney=0;
//DefineAmmoAmount
var playerAmmo=0;
//UsedToIncreaseTheZombiesHealthForEverRoundThePlayerSurvives
var zombieHealthMultiplier=1;
//TheAmountToIncreaseTheZombieHealthBy
var zombieHealthIncrease=0.5;
//SetZombieDamage
var zombieDamage=10;
//CheckHowManyZombiesAreInTheLevel
var zombiesAlive=0;
//TheNumberOfZombiesToSpawnInTheLevel
var zombiesToCreate=3;
//TheNumberOfZombiesToAddToTheBaseCreateNumber
var zombieCreateMultiplier=3;
//KeepTrackOfTheRoundThePlayerIsOn
var roundCount = 0;

MyGame.StateE = function(){
    //MovementKeys
    this.up, this.down, this.left, this.right, this.purchaseKey = null;
    //CreatePlayerObject
    this.obj_player, this.obj_playerLegs = null;
    //HoldBullets
    this.bullets = null;
    //zombieGroup
    this.zombieGroup = null;
    //ParticleEmitters
    this.bloodSplatter, this.shellCasings = null;
    //ArrayToHoldTheSpritesForTheAvailableWeaponsThatCanBeBoughtInTheLevel
    this.avalibleWeapons = [];
    //TimerToSpawnZombies
    this.timerSpawnZombies = null;
};

MyGame.StateE.prototype = {
    //InitializeGame
    init: function(){
        //StartArcadePhysics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        //SetGameBounds
        game.world.setBounds(-10, -10, 5066, 3914);
        //ChangeTheCursorToACrosshairImage
        this.updateCursor();
    },

    //SetUpControlsState
    create: function(){
        //ResetRoundCOunter
        roundCount=0;
        //ResetMoney
        playerMoney=0;
        //ResetHowManyZombiesAreAlive
        zombiesAlive=0;
        //TheNumberOfZombiesToSpawnInTheLevel
        zombiesToCreate=3;
        //ResetFireRateDelay
        fireRateDelay = FIRERATE_PISTOL;
        currentFireRateDelay= 0;
        //SetAmmo
        playerAmmo = CLIPSIZE_PISTOL * ammoMultiplier;
        //SetDamage
        bulletDamage = DAMAGE_PISTOL * damageMultiplier;
        //AddMapToTheGame
        this.setUpMap();
        //AddWeaponPurchaseObjects
        this.addWeaponPurchaseObjectsToLevel();
        //CreateBloodParticles
        this.setupBloodParticles();
        //CreateShellCasingParticles
        this.setupShellCasingParticles();
        //CreateSmokeParticles
        this.setupSmokeParticles();
        //AddPlayerImagesToGame
        this.setPlayerObjects();
        //CreateZombies
        this.createZombieGroup();
        //CreateBulletGroup
        this.createBulletGroup();
        //AddLightEffectSprite
        this.setUpLightEffect();
        //SetUpGUI
        this.setUpGUI();
        //DefineTheKeysForPlayerMovements
        this.setUpInput();
        //SetCameraToFollowPlayer
        game.camera.follow(this.obj_player);
        //SetUpSpawnTimer
        this.timerSpawnZombies = this.time.create(false);
    },

    //updateGame
    update: function() {
        //ZombieCollisionWithZombies
        game.physics.arcade.collide(this.zombieGroup);
        //CheckPlayerCollisionWithZombies
        game.physics.arcade.collide(this.obj_player, this.zombieGroup);
        //ZombieCollisionWithWalls
        game.physics.arcade.collide(this.zombieGroup, this.WallCollision);
        //CheckForCollisionWithMapObjects
        game.physics.arcade.collide(this.obj_player, this.WallCollision);
        //ZombiesCollisionWithBullets
        game.physics.arcade.overlap(this.zombieGroup, this.bullets, this.damageZombie, null, this);
        //BulletsHitWalls
        game.physics.arcade.collide(this.bullets, this.WallCollision, this.destroyBullets, null, this);
        //SetCollisionWithShellCasingAndWall
        game.physics.arcade.collide(this.shellCasings, this.WallCollision);
        //CheckNoZombiesAreInLevel
        this.checkZombies();
        //ZombieMovementAndPlayerAttacking
        this.zombieActions();
        //RotateZombieToFacePlayer
        this.rotateZombie();
        //MoveThePlayer
        this.movePlayerObject();
        //PlayerStoodOnTopOfGuns
        this.playerCollideWithGunIcon();
        //RotatePlayerObjectToFaceMouse
        this.rotatePlayerObject();
        //PlayerShootAnAutomaticGun
        if(game.input.activePointer.isDown && fireRateDelay == FIRERATE_THOMPSON){
            this.playerShoot();
        }
    },

    //PlayAmbientSoundsDuringBreaks
    playAmbientSounds: function(){
        //CheckMusicStatus
        if(MyGame.playMusic){
            //StopGameMusic
            MyGame.stopGameMusic();
            //RandomlyPickTrackToPlay
            switch(game.rnd.integerInRange(0, 2)){
                case 0:
                    MyGame.music_noCombat1.fadeIn(500);
                    break;
                case 1:
                    MyGame.music_noCombat2.fadeIn(500);
                    break;
                case 2:
                    MyGame.music_noCombat3.fadeIn(500);
                    break;
            }
        }
    },

    //PlayGameMusic
    playGameMusic: function(){
        //CheckMusicStatus
        if(MyGame.playMusic){
            //StopAmbientSounds
            MyGame.stopAmbientSounds();
            //RandomlyPickTrackToPlay
            switch(game.rnd.integerInRange(0, 5)){
                case 0:
                    MyGame.music_combat1.fadeIn(2000);
                    break;
                case 1:
                    MyGame.music_combat2.fadeIn(2000);
                    break;
                case 2:
                    MyGame.music_combat3.fadeIn(2000);
                    break;
                case 3:
                    MyGame.music_combat4.fadeIn(2000);
                    break;
                case 4:
                    MyGame.music_combat5.fadeIn(2000);
                    break;
                case 5:
                    MyGame.music_combat6.fadeIn(2000);
                    break;
            }
        }
    },

    //CheckNoZombiesAreInLevel
    checkZombies: function(){
        if(zombiesAlive == 0){
            console.log("spawing");
            //PlayAmbientMusic
            this.playAmbientSounds();
            //ReduceTheCountByOneToStopTimerBeingCalledMoreThanOnce
            zombiesAlive = -1;
            //StartTimeToSpawnNextRoundOfZombies
            this.timerSpawnZombies.add(Phaser.Timer.SECOND*6, this.spawnZombies, this);
            this.timerSpawnZombies.start();
        }
    },

    //SpawnZombies
    spawnZombies: function(){
        //PlayMusic
        this.playGameMusic();
        //IncreaseTheRoundCount
        roundCount++;
        //UpdateGUI
        GUIElements[4][1].text = "Round: " + roundCount;
        //IncreaseTheAmountOfZombiesToSpawn
        zombiesToCreate += zombieCreateMultiplier;
        //SetTheAmountOfZombiesAlive
        zombiesAlive = zombiesToCreate;
        //IncreaseTheMultiplierValueToSetTheZombieHealth
        zombieHealthMultiplier += zombieHealthIncrease;
        //SpawnInZombies
        for(var i=0; i<zombiesToCreate; i++){
            //GetTheFirstBulletInstanceFromThePreCreatedGroup
            var zombie = this.zombieGroup.getFirstExists(false);
            if (zombie) {
                //SetHealth
                zombie.hp = 100 * zombieHealthMultiplier;
                //SetZombieAsImmovableSoThePlayerCannotPushThem
                zombie.body.immovable = true;
                //RandomlyAssignMovementSpeedWhenZombieSpawned
                //zombie.movementSpeed = game.rnd.integerInRange(250, 260);
                switch(game.rnd.integerInRange(0, 3)){

                    case 0:
                        zombie.movementSpeed = 245;
                        break;
                    case 1:
                        zombie.movementSpeed = 250;
                        break;
                    case 2:
                        zombie.movementSpeed = 255;
                        break;
                    case 3:
                        zombie.movementSpeed = 260;
                        break;
                }
                //SetPosition
                var xPos=0, yPos=0;
                //RandomlySelectSpawnPosition
                switch(game.rnd.integerInRange(0, 9)){
                    case 0:
                        xPos = 512;
                        yPos = 192;
                        break;
                    case 1:
                        xPos = 128;
                        yPos = 3776;
                        break;
                    case 2:
                        xPos = 1152;
                        yPos = 3776;
                        break;
                    case 3:
                        xPos = 3520;
                        yPos = 2112;
                        break;
                    case 4:
                        xPos = 4864;
                        yPos = 1856;
                        break;
                    case 5:
                        xPos = 3520;
                        yPos = 1792;
                        break;
                    case 6:
                        xPos = 4032;
                        yPos = 3712;
                        break;
                    case 7:
                        xPos = 4800;
                        yPos = 3712;
                        break;
                    case 8:
                        xPos = 1472;
                        yPos = 3776;
                        break;
                    case 9:
                        xPos = 3200;
                        yPos = 3712;
                        break;
                }
                zombie.reset(xPos, yPos);
            }
        }
    },

    //AddWeaponPurchaseObjectsToLevel
    addWeaponPurchaseObjectsToLevel: function(){
        //Pistol
        this.avalibleWeapons[0] = this.add.sprite(2176, 3776, 'spr_game', 'spr_pistolOutline.png');
        //KAR98
        this.avalibleWeapons[1] = this.add.sprite(3712, 3200, 'spr_game', 'spr_shotgunOutline.png');
        //Thompson
        this.avalibleWeapons[2] = this.add.sprite(448, 320, 'spr_game', 'spr_rifleOutline.png');
        //Shotgun
        this.avalibleWeapons[3] = this.add.sprite(1024, 64, 'spr_game', 'spr_shotgunOutline.png');
    },

    //PlayerStoodOnTopOfGuns
    playerCollideWithGunIcon: function(){
        //Pistol
        if((this.obj_player.x >= this.avalibleWeapons[0].x && this.obj_player.x <= this.avalibleWeapons[0].x+64) &&
            (this.obj_player.y >= this.avalibleWeapons[0].y && this.obj_player.y <= this.avalibleWeapons[0].y+64)){
            GUIElements[3][1].text = "M1911 \nPress Space to purchase, Cost: " + COST_PISTOL;
        }
        //KAR98
        else if((this.obj_player.x >= this.avalibleWeapons[1].x && this.obj_player.x <= this.avalibleWeapons[1].x+64) &&
            (this.obj_player.y >= this.avalibleWeapons[1].y && this.obj_player.y <= this.avalibleWeapons[1].y+64)){
            GUIElements[3][1].text = "KARK98 \nPress Space to purchase, Cost: " + COST_KAR98;

        }
        //Thompson
        else if((this.obj_player.x >= this.avalibleWeapons[2].x && this.obj_player.x <= this.avalibleWeapons[2].x+64) &&
            (this.obj_player.y >= this.avalibleWeapons[2].y && this.obj_player.y <= this.avalibleWeapons[2].y+64)){
            GUIElements[3][1].text = "Thompson \nPress Space to purchase, Cost: " + COST_THOMPSON;

        }
        //Shotgun
        else if((this.obj_player.x >= this.avalibleWeapons[3].x && this.obj_player.x <= this.avalibleWeapons[3].x+64) &&
            (this.obj_player.y >= this.avalibleWeapons[3].y && this.obj_player.y <= this.avalibleWeapons[3].y+64)){
            GUIElements[3][1].text = "Shotgun \nPress Space to purchase, Cost: " + COST_SHOTGUN;
        }
        //NotOnTopOfAnyGunIcons
        else{
            GUIElements[3][1].text = "";
        }
    },

    //RunWhenSpacebarPressedToAllowPlayerToBuyWeapon
    playerPurchaseGun: function(){
        //HoldWeaponValuesWhenPlayerIsStandingOnThem
        var weaponCost, weaponKey;
        //Pistol
        if((this.obj_player.x >= this.avalibleWeapons[0].x && this.obj_player.x <= this.avalibleWeapons[0].x+64) &&
            (this.obj_player.y >= this.avalibleWeapons[0].y && this.obj_player.y <= this.avalibleWeapons[0].y+64)){
            //SetWeaponValuesWhenOnTopOfIcon
            weaponCost = COST_PISTOL;
            weaponKey = 0;
        }
        //KAR98
        else if((this.obj_player.x >= this.avalibleWeapons[1].x && this.obj_player.x <= this.avalibleWeapons[1].x+64) &&
            (this.obj_player.y >= this.avalibleWeapons[1].y && this.obj_player.y <= this.avalibleWeapons[1].y+64)){
            //SetWeaponValuesWhenOnTopOfIcon
            weaponCost = COST_KAR98;
            weaponKey = 1;
        }
        //Thompson
        else if((this.obj_player.x >= this.avalibleWeapons[2].x && this.obj_player.x <= this.avalibleWeapons[2].x+64) &&
            (this.obj_player.y >= this.avalibleWeapons[2].y && this.obj_player.y <= this.avalibleWeapons[2].y+64)){
            //SetWeaponValuesWhenOnTopOfIcon
            weaponCost = COST_THOMPSON;
            weaponKey = 2;
        }
        //Shotgun
        else if((this.obj_player.x >= this.avalibleWeapons[3].x && this.obj_player.x <= this.avalibleWeapons[3].x+64) &&
            (this.obj_player.y >= this.avalibleWeapons[3].y && this.obj_player.y <= this.avalibleWeapons[3].y+64)){
            //SetWeaponValuesWhenOnTopOfIcon
            weaponCost = COST_SHOTGUN;
            weaponKey = 3;
        }
        //CheckForSpacebarPressAndCheckPlayerMoneyToBuyNewGunOrAmmo
        if(playerMoney >= weaponCost){
            //PlayPurchaseSound
            if(MyGame.playSFX && !MyGame.purchaseGun.isPlaying){
                MyGame.purchaseGun.play();
            }
            this.gunPurchased(weaponKey);
            //UpdateGUI
            GUIElements[0][1].text = playerMoney;
        }

    },

    //PlayerPurchaseGun
    gunPurchased: function(gunIcon){
        switch(gunIcon){
            //PurchasedPistol
            case 0:
                bulletDamage = DAMAGE_PISTOL;
                fireRateDelay = FIRERATE_PISTOL;
                playerMoney -= COST_PISTOL;
                playerAmmo = CLIPSIZE_PISTOL;
                break;
            //PurchasedKAR98
            case 1:
                bulletDamage = DAMAGE_KAR98;
                fireRateDelay = FIRERATE_KAR98;
                playerMoney -= COST_KAR98;
                playerAmmo = CLIPSIZE_KAR98;
                break;
            //PurchasedThompson
            case 2:
                bulletDamage = DAMAGE_THOMPSON;
                fireRateDelay = FIRERATE_THOMPSON;
                playerMoney -= COST_THOMPSON;
                playerAmmo = CLIPSIZE_THOMPSON;
                break;
            //PurchasedShotGun
            case 3:
                bulletDamage = DAMAGE_SHOTGUN;
                fireRateDelay = FIRERATE_SHOTGUN;
                playerMoney -= COST_SHOTGUN;
                playerAmmo = CLIPSIZE_SHOTGUN;
                break;
        }
        //ApplyMultipliers
        bulletDamage *= damageMultiplier;
        playerAmmo *= ammoMultiplier;
        //UpdateAmmoGUI
        GUIElements[2][1].text = playerAmmo;
    },

    //Particles
    setupBloodParticles: function(){
        //CreateParticleSystem
        this.bloodSplatter = this.add.emitter(0, 0, 150);
        //SetParticleSprite
        this.bloodSplatter.makeParticles('spr_game', 'spr_bloodSplatter.png');
        //DisableGravity
        this.bloodSplatter.gravity = 0;
        //DisableRotation
        this.bloodSplatter.setRotation();
        //SetTheSpeedOfTheParticles
        this.bloodSplatter.setXSpeed(0, 0);
        this.bloodSplatter.setYSpeed(0, 0);
        //AddScaleAnimationToMakeParticleSmallerAndAppearToSoakIntoGround
        this.bloodSplatter.setScale(1, 0, 1, 0, 5000, "Linear");
    },

    //SpawnInBloodSplatterParticles
    spawnBloodSplatterParticle: function(objectPosition){
        //SetThePositionOfTheParticles
        //XPosition
        if(this.obj_player.x < objectPosition.x){
            this.bloodSplatter.x = objectPosition.x + 32;
        }
        else if(this.obj_player.x > objectPosition.x){
            this.bloodSplatter.x = objectPosition.x - 32;
        }
        //YPosition
        if(this.obj_player.y < objectPosition.y){
            this.bloodSplatter.y = objectPosition.y+32;
        }
        else if(this.obj_player.y > objectPosition.y){
            this.bloodSplatter.y = objectPosition.y-32;
        }
        for(var i=0; i<5; i++){
            this.bloodSplatter.x += game.rnd.integerInRange(-10, 10);
            this.bloodSplatter.y += game.rnd.integerInRange(-5, 5);
            //EmnitParticle
            this.bloodSplatter.start(true, 3000, null, 1);
        }
    },

    //CreateShellCasingParticles
    setupShellCasingParticles: function(){
        //CreateEmitter
        this.shellCasings = this.add.emitter(0,0,256);
        //SetParticleSprite
        this.shellCasings.makeParticles('spr_game', 'spr_shellCasing.png');
        //DisableGravity
        this.shellCasings.gravity = 0;
        //SetTheRotationOfTheBullet
        this.shellCasings.setRotation(1, 360);
        //SetTheSpeedOfTheBullet
        this.shellCasings.setXSpeed(-100, 100);
        this.shellCasings.setYSpeed(-100, 100);
        this.shellCasings.angularDrag = 50;
    },

    //SpawnShellCasingParticlesInGamed
    spawnShellCasingParticle: function(){
        //SetPositionOfParticles
        this.shellCasings.position = this.obj_player.position;
        //EmitParticles
        this.shellCasings.start(true, 1000, null, 1);
    },

    //CreateSmokeParticles
    setupSmokeParticles: function(){
        //CreateEmitter
        this.smoke = this.add.emitter(0,0,256);
        //SetParticleSprite
        this.smoke.makeParticles('spr_game', 'spr_smoke1.png');
        //AddAnimation
        this.smoke.forEach(function(smoke){
            smoke.animations.add('anim_smoke', ['spr_smoke1.png', 'spr_smoke2.png', 'spr_smoke3.png', 'spr_smoke4.png', 'spr_smoke5.png'], 5, false);
        });
        //DisableGravity
        this.smoke.gravity = 0;
        //DisableRotation
        this.smoke.setRotation();
        //DisableMovement
        this.smoke.setXSpeed(0, 0);
        this.smoke.setYSpeed(0, 0);
    },

    //SpawnSmokeParticleInGame
    spawnSmokeParticle: function(bullet){
        //SetPositionOfParticles
        this.smoke.x = bullet.x;
        this.smoke.y = bullet.y
        //EmitParticles
        this.smoke.start(true, 1000, null, 1);
        //PlayAnimationForAllParticlesThatExists
        this.smoke.forEachExists(function(smoke) {
            //CheckIfAnimationIsNotPlaying
            if (!smoke.animations.isPlaying){
                //IfNotPlayAnimation
                smoke.animations.play('anim_smoke');
            }
        });
    },

    //AddAnOverlayOnTheScreenThatGivesTheIllusionOfLightComingFromThePlayer
    setUpLightEffect: function(){
        this.light = game.add.image(this.obj_player.x, this.obj_player.y, 'spr_game', 'spr_light.png');
        this.light.anchor.setTo(0.5, 0.5);
    },

    //SetUpGUI
    setUpGUI: function(){
        //AddGUIImages
        //MoneyImage
        GUIElements[0][0] = this.add.sprite(game.camera.x + 5, game.camera.height - 50, 'spr_game', 'spr_moneyDisplay.png');
        //HealthImage
        GUIElements[1][0] = this.add.sprite(game.camera.width - 75, game.camera.height - 115, 'spr_game', 'spr_healthDisplay.png');
        //AmmoImage
        GUIElements[2][0] = this.add.sprite(game.camera.width - 75, game.camera.height - 70, 'spr_game', 'spr_ammoDisplay.png');
        //SetScaleOfGUISpritesAndFixThemToTheCamera
        for(var i=0; i<GUIElements.length-2; i++){
            GUIElements[i][0].fixedToCamera = true;
            GUIElements[i][0].scale.setTo(3, 3);
        }
        //ManuallySetGUIMoneySpriteSize
        GUIElements[0][0].scale.setTo(1.5, 1.5);
        //AddGUIText
        //MoneyText
        GUIElements[0][1] = game.add.text(game.camera.x + 60, game.camera.height - 47.5, playerMoney, {fontSize: '35px', fill: '#ffffff'});
        //HealthText
        GUIElements[1][1] = game.add.text(game.camera.width - 95, game.camera.height - 87, this.obj_player.hp, {fontSize: '35px', fill: '#ffffff'});
        //AmmoText
        GUIElements[2][1] = game.add.text(game.camera.width - 95, game.camera.height - 40, playerAmmo, {fontSize: '35px', fill: '#ffffff'});
        //GunInfo
        GUIElements[3][1] = game.add.text(game.camera.width/2, game.camera.height/2+40, "", {fontSize: '35px', fill: '#ffffff'});
        GUIElements[3][1].anchor.setTo(0.5, 0.5);
        //RoundCount
        GUIElements[4][1] = game.add.text(game.camera.x + 10, game.camera.height - 75, "Round: " + roundCount, {fontSize: '30px', fill: '#ffffff'});
        //SetGUITextProperties
        for(var j=0; j<GUIElements.length; j++){
            //SetFont
            GUIElements[j][1].font = 'VT323';
            //FixToCameraPosition
            GUIElements[j][1].fixedToCamera = true;
        }
    },

    //DefineMapObject
    setUpMap: function(){
        this.map = this.game.add.tilemap('map_Level1');
        //LoadTileSetUsedToCreateMap
        //FirstParamIsTheTilesetNameDefinedInTiledAndTheSecondNameIsTheSpritesheetKey
        this.map.addTilesetImage('MapTiles', 'MapTiles');
        this.map.addTilesetImage('MapTiles2', 'MapTiles2');
        //CreateMapLayer
        //LayerNameMustBeTheSameAsInTiled
        var Floor = this.map.createLayer('Floor');
        this.WallCollision = this.map.createLayer('WallCollision');
        var Wall1 = this.map.createLayer('Wall1');
        var Wall2 = this.map.createLayer('Wall2');
        var Debris = this.map.createLayer('Debris');
        var DebrisDetails = this.map.createLayer('DebrisDetail');
        //SetUpCollisionsOnMapWallLayers
        this.map.setCollisionBetween(1, 2, true, 'WallCollision');
        //HidTheCollisionTiledLayer
        this.WallCollision.alpha = 0;
    },

    //SetUpPlayer
    setPlayerObjects: function(){
        //AddPlayerLegs
        this.obj_playerLegs = this.add.sprite(1730, 3450, 'spr_game', 'Player__Legs_StandStill.png');
        //CreateMoveLeftAnimationForPlayerLegs
        this.obj_playerLegs.animations.add('playerMoveLeft', ['Player__Legs_StepLeft_01.png', 'Player__Legs_StepLeft_02.png'], 5, true);
        //CreateMoveRightAnimationForPlayerLegs
        this.obj_playerLegs.animations.add('playerMoveRight', ['Player__Legs_StepRight_01.png', 'Player__Legs_StepRight_02.png'], 5, true);
        //CenterPlayerLegs
        this.obj_playerLegs.anchor.setTo(0.5, 0.5);
        //AddPlayerSprite
        this.obj_player = this.add.sprite(1730, 3450, 'spr_game', 'Pistol_Stand.png');
        //CreateDeathAnimation
        this.obj_player.animations.add('playerDeath', ['Player_Death_01.png', 'Player_Death_02.png', 'Player_Death_03.png', 'Player_Death_04.png', 'Player_Death_05.png', 'Player_Death_06.png','Player_Death_07.png', 'Player_Death_08.png', 'Player_Death_09.png', 'Player_Death_10.png', 'Player_Death_11.png',], 5, false);
        //CenterPlayerBody
        this.obj_player.anchor.setTo(0.5, 0.5);
        //EnablePhysicsOnPlayerBody
        this.physics.enable(this.obj_player, Phaser.Physics.ARCADE);
        this.obj_player.enableBody = true;
        //SetPlayerHealth
        this.obj_player.hp = 100 * healthMultiplier;
        //ApplyDamageToPlayer
        this.obj_player.applyDamage = function(){
            //ReduceHealth
            this.hp -= zombieDamage;
            //UpdateTheGUI
            GUIElements[1][1].text = this.hp;
            //GameOver
            if(this.hp <= 0){
                //SetPlayerVelocity
                this.body.velocity.set(0);
                //PlayerBloodEffect
                this.bloodEffect();
                //ShowGameOverText
                var txt_gameOver = game.add.text(game.camera.x + (game.camera.width / 2), game.camera.y + (game.camera.height / 2), "Game Over!", {fontSize: '72px', fill: '#ffffff'});
                //CenterText
                txt_gameOver.anchor.setTo(0.5, 0.5);
                //SetTextFont
                txt_gameOver.font = 'VT323';
                //playDeathAnimation
                this.animations.play('playerDeath');
                this.animations.currentAnim.onComplete.addOnce(this.goToUpGrades, this);
            }
        };
        //BloodSplatterEffect
        this.obj_player.bloodEffect = function(){
            //CreateParticleSystem
            var blood = game.add.emitter(this.x, this.y, 1);
            //SetParticleSprite
            blood.makeParticles('spr_game', 'spr_bloodSplatter.png');
            //DisableGravity
            blood.gravity = 0;
            //DisableRotation
            blood.setRotation();
            //SetTheSpeedOfTheParticles
            blood.setXSpeed(0, 0);
            blood.setYSpeed(0, 0);
            //AddScaleAnimation
            blood.setScale(1, 5, 1, 5, 5000, "Linear");
            //EmnitParticle
            blood.start(true, 3000, null, 1);
        };
        //ChangeToUpgradeLevel
        this.obj_player.goToUpGrades = function(){
            //StopMusic
            if(MyGame.playMusic){
                //StopAnyPlayingMusicTrack
                if(MyGame.music_combat1.isPlaying){
                    MyGame.music_combat1.stop();
                }
                if(MyGame.music_combat2.isPlaying){
                    MyGame.music_combat2.stop();
                }
                if(MyGame.music_combat3.isPlaying){
                    MyGame.music_combat3.stop();
                }
                if(MyGame.music_combat4.isPlaying){
                    MyGame.music_combat4.stop();
                }
                if(MyGame.music_combat5.isPlaying){
                    MyGame.music_combat5.stop();
                }
                if(MyGame.music_combat6.isPlaying){
                    MyGame.music_combat6.stop();
                }
            }
            //ChangeToUpgradesLevel
            game.state.start('upgrades');
        };
    },

    //PlayerShootSingleShotGun
    playerShoot: function(){
        //AddShootingDelay
        if(game.time.now > currentFireRateDelay && playerAmmo > 0){
            //GetTheFirstBulletInstanceFromThePreCreatedGroup
            var bullet = this.bullets.getFirstExists(false);
            if(bullet){
                //EnsureSFXAreON
                if(MyGame.playSFX){
                    //PlayGunShot
                    switch (fireRateDelay) {
                        case FIRERATE_PISTOL:
                            MyGame.shotPistol.play();
                            break;
                        case FIRERATE_KAR98:
                            MyGame.shotKAR98.play();
                            break;
                        case FIRERATE_SHOTGUN:
                            MyGame.shotShotgun.play();
                            break;
                        case FIRERATE_THOMPSON:
                            MyGame.shotAssaultRiffle.play();
                            break;
                    }
                }
                //SpawnShellCasingParticle
                this.spawnShellCasingParticle();
                //PlaceTheBulletAtThePlayerObject
                bullet.reset(this.obj_player.x, this.obj_player.y);
                game.physics.arcade.moveToPointer(bullet, SPEED_BULLET);
                currentFireRateDelay = game.time.now + fireRateDelay;
                //ReduceAmmoCount
                playerAmmo--;
                //UpdateTheGUI
                GUIElements[2][1].text = playerAmmo;
            }
        }
    },

    //CreateBulletGroup
    createBulletGroup: function(){
        //CreateGroup
        this.bullets = game.add.group();
        this.bullets.enableBody = true;
        //EnablePhysics
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        //PreCreateAGroupOfBulletsToUse
        this.bullets.createMultiple(75, 'spr_game', 'spr_bullet.png');
        //SetAnchorPoints
        this.bullets.setAll('anchor.x', 0.5);
        this.bullets.setAll('anchor.y', 1);
        //CheckIfBulletGoesOutOfBoundsAndDestroyThem
        this.bullets.setAll('outOfBoundsKill', true);
        this.bullets.setAll('checkWorldBounds', true);
    },

    //DestroyBulletOnCollisionWithWall
    destroyBullets: function(bullet){
        this.spawnSmokeParticle(bullet);
        bullet.kill()
    },

    //DefineTheKeysForPlayerMovements
    setUpInput: function(){
        //AddWASDKeysToMovePlayer
        this.up = game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.down = game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.left = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.right = game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.purchaseKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.purchaseKey.onDown.add(this.playerPurchaseGun, this);
        //PlayerShooting
        game.input.onDown.add(this.playerShoot, this);
    },

    //MoveThePlayer
    movePlayerObject: function() {
        //SetPlayerVelocity
        this.obj_player.body.velocity.set(0);
        //MovePlayer
        if (this.up.isDown) {
            this.obj_player.body.velocity.y -= SPEED_PLAYER;
            //PlayMoveLeftAnimation
            this.obj_playerLegs.play('playerMoveLeft');
        }
        else if (this.down.isDown) {
            this.obj_player.body.velocity.y += SPEED_PLAYER;
            //PlayMoveRightAnimation
            this.obj_playerLegs.play('playerMoveRight');
        }
        if (this.left.isDown) {
            this.obj_player.body.velocity.x -= SPEED_PLAYER;
            //PlayMoveLeftAnimation
            this.obj_playerLegs.play('playerMoveLeft');
        }
        else if (this.right.isDown) {
            this.obj_player.body.velocity.x += SPEED_PLAYER;
            //PlayMoveRightAnimation
            this.obj_playerLegs.play('playerMoveRight');
        }
        //StopAnimationsWhenPlayerIsNotMoving
        if(this.up.isUp && this.down.isUp && this.left.isUp && this.right.isUp){
            this.obj_playerLegs.frameName = "Player__Legs_StandStill.png";
        }
        //SetThePositionOfThePlayerLegObjectToThePositionOfThePlayerBody
        this.obj_playerLegs.position = this.obj_player.position;
        if(this.obj_player.x < game.world.width - (70*5) && this.obj_player.x > 64 * 5){
            this.light.x = this.obj_player.x;
        }
        if(this.obj_player.y < game.world.height - (64*5) && this.obj_player.y > 64 * 3){
            this.light.y = this.obj_player.y;
        }
    },

    //RotatePlayerObjectsToFaceMouse
    rotatePlayerObject: function(){
        this.obj_player.rotation = game.physics.arcade.angleToPointer(this.obj_player);
        this.obj_playerLegs.rotation = game.physics.arcade.angleToPointer(this.obj_playerLegs);
    },

    //CreateZombieObjects
    createZombieGroup: function(){
        //CreateGroup
        this.zombieGroup = game.add.physicsGroup(Phaser.Physics.ARCADE);
        //EnableBodyProperties
        this.zombieGroup.enableBody = true;
        //PreCreateZombies
        this.zombieGroup.createMultiple(256, 'spr_game', 'Zombie_Stand.png');
        //AddPropertiesToEachZombieInTheGroup
        this.zombieGroup.forEach(function(zombie){
            //SetAnchorPoints
            zombie.anchor.setTo(0.5, 0.5);
            //SetBaseHealth
            zombie.hp = 100 * zombieHealthMultiplier;
            //DelayToStopZombiesAttackingTooFast
            zombie.zombieAttackDelay = 2000;
            zombie.zombieAttackTimer = game.time.now + zombie.zombieAttackDelay;
            //AssigDefaulttMovementSpeed
            zombie.movementSpeed = 250;
            //CreateZombieAnimations
            //ZombieWalkAnimation
            zombie.animations.add('zombieWalk', ['Zombie_Walk_LeftStep_01.png', 'Zombie_Walk_LeftStep_02.png', 'Zombie_Walk_RightStep_01.png', 'Zombie_Walk_RightStep_02.png'], 5, true);
            //ZombieAttackAnimation
            zombie.animations.add('zombieAttack', ['Zombie_Attack_01.png', 'Zombie_Attack_02.png', 'Zombie_Attack_03.png', 'Zombie_Attack_04.png', 'Zombie_Attack_05.png', 'Zombie_Attack_06.png'], 5, false);
            //ZombieDeath
            zombie.animations.add('zombieDeath', ['Zombie_Death_01.png', 'Zombie_Death_02.png', 'Zombie_Death_03.png', 'Zombie_Death_04.png', 'Zombie_Death_05.png', 'Zombie_Death_06.png', 'Zombie_Death_07.png', 'Zombie_Death_08.png', 'Zombie_Death_09.png', 'Zombie_Death_10.png'], 10, false);
        });
    },

    //ZombieMovementAndAttack
    zombieActions: function(){
        //GetThePlayerObjectProperties
        var player = this.obj_player;
        //UpdateMovementForAllZombies
        this.zombieGroup.forEach(function(zombie){
            //StopMovingWhenDead
            if(zombie.hp <= 0){
                //StopZombieFromMoving
                zombie.body.velocity.x = 0;
                zombie.body.velocity.y = 0;
            }
            //IfTheZombieIsAroundThePlayer
            if(zombie.x >= player.x - 70 && zombie.x <= player.x + 70 && zombie.y <= player.y + 70 && zombie.y >= player.y - 70){
                //ZombieAttackPlayerWhenTheAttackDelayIsSmallerThanTheCurrentTime
                if(game.time.now > zombie.zombieAttackTimer && zombie.hp > 0) {
                    //PlayAttackAnimation
                    zombie.play('zombieAttack');
                    //DamagePlayerFunction
                    zombie.animations.currentAnim.onComplete.addOnce(function(){
                        //CheckPlayerIsStillInRange
                        if(zombie.x >= player.x - 80 && zombie.x <= player.x + 80 && zombie.y <= player.y + 80 && zombie.y >= player.y - 80){
                            //SetZombieToIdleAnimationAfterAttack
                            zombie.frameName = "Zombie_Stand.png";
                            //IfTrueApplyDamage
                            player.applyDamage();
                        }
                    });
                    //IncreaseTheValueOfTheZombieAttackDelay
                    zombie.zombieAttackTimer = game.time.now + zombie.zombieAttackDelay;
                }
                if(player.body.velocity.x == 0 && player.body.velocity.y == 0){
                    //StopZombieFromMoving
                    zombie.body.velocity.x = 0;
                    zombie.body.velocity.y = 0;
                }
            }
            else if(zombie.hp > 0 && (zombie.x < player.x - 70 || zombie.x > player.x + 70 || zombie.y < player.y - 70 || zombie.y > player.y + 70)){
                //AddASmallOffsetToThePositionTheZombiesShouldMoveToInOrderToReduceTheAmountOfOverlapping
                var xOffset = game.rnd.integerInRange(-24, 24);
                var yOffset = game.rnd.integerInRange(-24, 24);
                //MoveZombieToPlayer
                game.physics.arcade.moveToXY(zombie, player.x + xOffset, player.y + yOffset, zombie.movementSpeed);
                zombie.play('zombieWalk');
            }
        });
    },

    //ZombieFacePlayer
    rotateZombie: function(){
        //GetThePropertiesOfThePlayerObject
        var player = this.obj_player;
        //RotateZombiesToFacePlayer
        this.zombieGroup.forEach(function(zombie){
            //OnlyRotateWhenZombieIsAlive
            if(zombie.hp > 0){
                zombie.rotation = game.physics.arcade.angleBetween(zombie, player);
            }
        });
    },

    //ChangeCursor
    updateCursor: function(){
        //GetBodyOfPage
        var elementToChange = document.getElementsByTagName("body")[0];
        //HideCursor
        elementToChange.style.cursor = "url(./Assets/Crosshair_02.png), none";
    },

    //ApplyDamageToZombies
    damageZombie: function(zombie, bullet) {
        //EnsureSFXAreOn
        if (MyGame.playSFX) {
            //PlayZombieHurtSound
            this.zombieHitSound();
        }
        //BulletDestroy
        bullet.kill();
        if (zombie.hp > 0) {
        //PlayBloodSplatterAnimation
        this.spawnBloodSplatterParticle(zombie);
        //AddMoneyForDamagingAZombie
        playerMoney += MONEY_ZOMBIEHIT;
        //ApplyDamage
        zombie.hp -= bulletDamage;
        //CheckZombieHealthForDestroying
        if (zombie.hp <= 0) {
            //AddMoneyForKillingAZombie
            playerMoney += MONEY_ZOMBIEKILL;
            //PlayDeathAnimation
            zombie.play('zombieDeath');
            //KillObjectOnceDeathAnimationIsComplete
            zombie.animations.currentAnim.onComplete.addOnce(function () {
                zombie.kill();
                //ReduceTheAmountOfZombiesAlive
                zombiesAlive -= 1;
                console.log("zombies alive: " + zombiesAlive);
            });
        }
        //UpdateGUI
        GUIElements[0][1].text = playerMoney;
        }
    },

    //PlayZombieHitSounds
    zombieHitSound: function(){
        switch(game.rnd.integerInRange(0, 13)){
            case 0:
                MyGame.zombieHit1.play();
                break;
            case 1:
                MyGame.zombieHit2.play();
                break;
            case 2:
                MyGame.zombieHit3.play();
                break;
            case 3:
                MyGame.zombieHit4.play();
                break;
        }
    }
};
