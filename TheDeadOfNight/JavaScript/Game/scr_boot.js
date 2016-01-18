/**
 * Created by Dan on 02/01/2016.
 */
//SetDamageOfGuns
const DAMAGE_PISTOL = 20, DAMAGE_KAR98 = 100, DAMAGE_THOMPSON = 50, DAMAGE_SHOTGUN = 200;
//SetPriceOfWeapons
const COST_PISTOL = 250, COST_KAR98 = 750, COST_THOMPSON = 1000, COST_SHOTGUN = 500;
//SetWeaponFireDelay
const FIRERATE_PISTOL = 200, FIRERATE_KAR98 = 300, FIRERATE_THOMPSON = 100, FIRERATE_SHOTGUN = 300;
//SetWeaponAmmoAmount
const CLIPSIZE_PISTOL = 80, CLIPSIZE_KAR98 = 100, CLIPSIZE_THOMPSON = 124, CLIPSIZE_SHOTGUN = 40;
//SetTheMoneyAmountForHittingAndKillingZombie
const MONEY_ZOMBIEHIT = 10, MONEY_ZOMBIEKILL = 60;
//SetSpeedOfObjects player default = 250
const SPEED_BULLET = 750, SPEED_PLAYER = 240;
//SetBasicCostOfUpgrades
const BASEMULTIPLIERCOST = 1000;
//UpgradeVariables
var healthMultiplier = 1;
var ammoMultiplier = 1;
var damageMultiplier = 1;
//StoreTheVariablesRetrievedFromTheSQLDatabase
var userDB, passwordDB, healthUpgradeDB, ammoUpgradeDB, damageUpgradeDB;
//StoreUserDataFromDatabase
var databaseInfo = "";
//StoreUsername
var user=null;
//StorePassword
var password=null;

//NewGameObject
var MyGame = {
    //GlobalVariables
    //AudioStatus
    playMusic: true,
    playSFX: true,
    //GameMusic
    music_menus: null,
    music_noCombat1: null,
    music_noCombat2: null,
    music_noCombat3: null,
    music_combat1: null,
    music_combat2: null,
    music_combat3: null,
    music_combat4: null,
    music_combat5: null,
    music_combat6: null,
    buttonClick: null,
    purchaseGun: null,
    shotAssaultRiffle: null,
    shotKAR98: null,
    shotPistol: null,
    shotShotgun: null,
    zombieHit1: null,
    zombieHit2: null,
    zombieHit3: null,
    zombieHit4: null
};

MyGame.StateA = function (){

};

MyGame.StateA.prototype = {
    init: function(){
        //SetScalePropertyOfGame
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        //RefreshTheDisplayAfterScalingTheGame
        game.scale.refresh();
    },

    //LoadAssets
    preload: function(){
        //LoadGameImages
        game.load.atlasJSONHash('spr_game', './Assets/Game/Sprites/sprietsheet_TheDeadOfNight.png', './Assets/Game/Sprites/spritesheet_TheDeadOfNight.json');
        //LoadMapJsonFile
        game.load.tilemap('map_Level1', './Assets/Game/Maps/Level1.json', null, Phaser.Tilemap.TILED_JSON);
        //LoadFloorAndWallTiles
        game.load.image('MapTiles', './Assets/Game/Maps/MapTiles.png');
        //LoadDebrisTiles
        game.load.image('MapTiles2', './Assets/Game/Maps/MapTiles2.png');
        //LoadFont
        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js');
        //LoadGameMusic
        //MenuMusic
        game.load.audio('music_mainMenu', './Assets/Game/Audio/Music/AdventureMeme.ogg');
        //GameMusic
        game.load.audio('music_game1', './Assets/Game/Audio/Music/50cmbag.ogg');
        game.load.audio('music_game2', './Assets/Game/Audio/Music/CoffeeBloodRemix.ogg');
        game.load.audio('music_game3', './Assets/Game/Audio/Music/CutTheWire.ogg');
        game.load.audio('music_game4', './Assets/Game/Audio/Music/Kraybsbigreveal.ogg');
        game.load.audio('music_game5', './Assets/Game/Audio/Music/parcial.ogg');
        game.load.audio('music_game6', './Assets/Game/Audio/Music/penombral.ogg');
        //LoadSFX
        //LoadInButtonClick
        game.load.audio('snd_buttonClick', './Assets/Game/Audio/SFX/buttonClick.ogg');
        //LoadAmbientTracks
        game.load.audio('snd_Ambience1', './Assets/Game/Audio/SFX/Ambience1.ogg');
        game.load.audio('snd_Ambience2', './Assets/Game/Audio/SFX/Ambience2.ogg');
        game.load.audio('snd_Ambience3', './Assets/Game/Audio/SFX/Ambience3.ogg');
        //GunPurchaseSound
        game.load.audio('snd_GunPurchase', './Assets/Game/Audio/SFX/GunPurchase.ogg');
        //GunShooting
        game.load.audio('snd_ShotAssaultRiffle', './Assets/Game/Audio/SFX/ShotAssaultRiffle.ogg');
        game.load.audio('snd_ShotKAR98', './Assets/Game/Audio/SFX/ShotKAR98.ogg');
        game.load.audio('snd_ShotPistol', './Assets/Game/Audio/SFX/ShotPistol.ogg');
        game.load.audio('snd_ShotShotgun', './Assets/Game/Audio/SFX/ShotShotgun.ogg');
        //ZombieHurt
        game.load.audio('snd_ZombieHit1', './Assets/Game/Audio/SFX/ZombieHit1.ogg');
        game.load.audio('snd_ZombieHit2', './Assets/Game/Audio/SFX/ZombieHit2.ogg');
        game.load.audio('snd_ZombieHit3', './Assets/Game/Audio/SFX/ZombieHit3.ogg');
        game.load.audio('snd_ZombieHit4', './Assets/Game/Audio/SFX/ZombieHit4.ogg');
    },

    create: function(){
        //LoadMenuAfterAssetsAreLoaded
        this.state.start('preloader');
    }
};