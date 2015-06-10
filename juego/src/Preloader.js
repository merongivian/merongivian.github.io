Candy.Preloader = function(game){
	// define width and height of the game
	Candy.GAME_WIDTH = 640;
	Candy.GAME_HEIGHT = 960;
};
Candy.Preloader.prototype = {
	preload: function(){
		// set background color and preload image
    this.stage.backgroundColor = '#B4D9E7';
		this.preloadBar = this.add.sprite((Candy.GAME_WIDTH-311)/2, (Candy.GAME_HEIGHT-27)/2, 'preloaderBar');
		this.load.setPreloadSprite(this.preloadBar);
		// load images
		this.load.image('background', 'img/background.png');
		this.load.image('menu_background', 'img/mainmenu_background.jpg');
		this.load.image('menu_recipient', 'img/recipient_background.jpg');
		this.load.image('game_background', 'img/game_background.jpg');
		this.load.image('menu_seed', 'img/seed_background.jpg');
		this.load.image('instrucciones', 'img/instrucciones_background.jpg');
		this.load.image('game-over', 'img/gameover.png');
		this.load.image('score-bg', 'img/score-bg.png');
		this.load.image('button-pause', 'img/button_pause.png');
		this.load.image('plantauno', 'img/tomate.png');
		this.load.image('plantados', 'img/aji.png');
		this.load.image('plantatres', 'img/maiz.png');

		this.load.image('plantauno0', 'img/tomate0.png');
		this.load.image('plantauno1', 'img/tomate1.png');
		this.load.image('plantauno2', 'img/tomate2.png');

		this.load.image('plantados0', 'img/aji0.png');
		this.load.image('plantados1', 'img/aji1.png');
		this.load.image('plantados2', 'img/aji2.png');

		this.load.image('plantatres0', 'img/maiz0.png');
		this.load.image('plantatres1', 'img/maiz1.png');
		this.load.image('plantatres2', 'img/maiz2.png');

		this.load.image('recipientuno', 'img/botella.png');
		this.load.image('recipientdos', 'img/llanta.png');
		this.load.image('recipientres', 'img/maceta.png');
		this.load.image('recipientuno0', 'img/botella0.png');
		this.load.image('recipientdos0', 'img/llanta0.png');
		this.load.image('recipientres0', 'img/maceta0.png');
		this.load.image('mediumphase', 'img/mediumphase.png');

		this.load.image('win', 'img/you_win.png');
		// load spritesheets
		this.load.spritesheet('candy', 'img/candy.png', 125, 125);
		this.load.spritesheet('monster-idle', 'img/monster-idle.png', 103, 131);
		this.load.spritesheet('button-start', 'img/button_start.png', 401, 143);
		this.load.spritesheet('button-instrucciones', 'img/button_instrucciones.png', 400, 192);
	},
	create: function(){
		// start the MainMenu state
		this.state.start('MainMenu');
	}
};
