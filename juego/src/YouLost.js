Candy.YouLost = function(game){};
Candy.YouLost.prototype = {
	create: function(){
		// display images
		this.add.sprite(0, -10, 'game_background');
		// add the button that will start the game
    var gam = this;
    this.add.sprite((Candy.GAME_WIDTH-494)/2, (Candy.GAME_HEIGHT-271)/2, 'game-over');
    setTimeout(function(){
      gam.input.onDown.add(gam.playAgain, gam);
    }, 1000);
	},
	playAgain: function() {
		this.state.start('Game');
	}
};
