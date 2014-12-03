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
		this.load.image('background', 'juego/img/background.png');
		this.load.image('instrucciones', 'juego/img/instrucciones.png');
		this.load.image('floor', 'juego/img/floor.png');
		this.load.image('monster-cover', 'juego/img/monster-cover.png');
		this.load.image('title', 'juego/img/title.png');
		this.load.image('game-over', 'juego/img/gameover.png');
		this.load.image('score-bg', 'juego/img/score-bg.png');
		this.load.image('button-pause', 'juego/img/button-pause.png');
		// load spritesheets
		this.load.spritesheet('candy', 'juego/img/candy.png', 82, 98);
		this.load.spritesheet('monster-idle', 'juego/img/monster-idle.png', 103, 131);
		this.load.spritesheet('button-start', 'juego/img/button-start.png', 401, 143);
		this.load.spritesheet('button-instrucciones', 'juego/img/button-instrucciones.png', 401, 143);
	},
	create: function(){
		// start the MainMenu state
		this.state.start('MainMenu');
	}
};
