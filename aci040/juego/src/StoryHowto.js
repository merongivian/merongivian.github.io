Candy.StoryHowto = function(game){};
Candy.StoryHowto.prototype = {
	create: function(){
		// display images
		this.add.sprite(0, -10, 'instrucciones');
		this.add.sprite(-130, Candy.GAME_HEIGHT-514, 'monster-cover');
		// add the button that will start the game
		this.add.button(Candy.GAME_WIDTH-401-10, Candy.GAME_HEIGHT-143-10, 'button-start', this.startGame, this, 1, 0, 2);
	},
	startGame: function() {
		// start the Game state
		this.state.start('Game');
	}
};
