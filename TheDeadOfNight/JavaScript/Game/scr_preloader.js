/**
 * Created by Dan on 30/09/2015.
 */
MyGame.StateB = function (){

};

MyGame.StateB.prototype = {
    //LoadAssets
    preload: function(){
        //SetSFXFiles
        MyGame.buttonClick = game.add.audio('snd_buttonClick', 1, false);
        //SetMenuMusicFiles
        MyGame.music_menus = game.add.audio('music_mainMenu', 0.5, true);
        //SetMenuMusicFiles
        MyGame.music_combat1 = game.add.audio('music_game1', 0.01, true);
        MyGame.music_combat2 = game.add.audio('music_game2', 0.01, true);
        MyGame.music_combat3 = game.add.audio('music_game3', 0.01, true);
        MyGame.music_combat4 = game.add.audio('music_game4', 0.01, true);
        MyGame.music_combat5 = game.add.audio('music_game5', 0.01, true);
        MyGame.music_combat6 = game.add.audio('music_game6', 0.01, true);
        MyGame.music_noCombat1 = game.add.audio('snd_Ambience1', 0.1, true);
        MyGame.music_noCombat2 = game.add.audio('snd_Ambience2', 0.1, true);
        MyGame.music_noCombat3 = game.add.audio('snd_Ambience3', 0.1, true);
        //SetSFXFiles
        MyGame.purchaseGun = game.add.audio('snd_GunPurchase', 1, false);
        MyGame.shotAssaultRiffle = game.add.audio('snd_ShotAssaultRiffle', 2, false);
        MyGame.shotKAR98 = game.add.audio('snd_ShotKAR98', 2, false);
        MyGame.shotPistol = game.add.audio('snd_ShotPistol', 2, false);
        MyGame.shotShotgun = game.add.audio('snd_ShotShotgun', 2, false);
        MyGame.zombieHit1 = game.add.audio('snd_ZombieHit1', 1, false);
        MyGame.zombieHit2 = game.add.audio('snd_ZombieHit2', 1, false);
        MyGame.zombieHit3 = game.add.audio('snd_ZombieHit3', 1, false);
        MyGame.zombieHit4 = game.add.audio('snd_ZombieHit4', 1, false);
    },

    create: function(){
        //AddLoadingScreenToScene
        var background = this.add.sprite(0, 0, 'spr_game', 'spr_loading.png');
    },

    update: function(){
        //LoadMenuAfterAssetsAreLoaded
        if(this.cache.isSoundDecoded('snd_ZombieHit4')){
            this.state.start('mainMenu');
        }
    }

};

//StopGameMusic
MyGame.stopGameMusic = function(){
    //CheckMusicStatus
    if(MyGame.playMusic){
        //StopAnyPlayingMusicTrack
        if(MyGame.music_combat1.isPlaying){
            MyGame.music_combat1.fadeOut(2000);
        }
        if(MyGame.music_combat2.isPlaying){
            MyGame.music_combat2.fadeOut(2000);
        }
        if(MyGame.music_combat3.isPlaying){
            MyGame.music_combat3.fadeOut(2000);
        }
        if(MyGame.music_combat4.isPlaying){
            MyGame.music_combat4.fadeOut(2000);
        }
        if(MyGame.music_combat5.isPlaying){
            MyGame.music_combat5.fadeOut(2000);
        }
        if(MyGame.music_combat6.isPlaying){
            MyGame.music_combat6.fadeOut(2000);
        }
    }
};

//StopAmbientSounds
MyGame.stopAmbientSounds = function(){
    //CheckMusicStatus
    if(MyGame.playMusic) {
        //StopAnyAmbientTracksPlaying
        if (MyGame.music_noCombat1.isPlaying) {
            MyGame.music_noCombat1.fadeOut(2000);
        }
        if (MyGame.music_noCombat2.isPlaying) {
            MyGame.music_noCombat2.fadeOut(2000);
        }
        if (MyGame.music_noCombat3.isPlaying) {
            MyGame.music_noCombat3.fadeOut(2000);
        }
    }
};