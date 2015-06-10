Candy.TheEnd = function(game){};
Candy.TheEnd.prototype = {
	create: function(){
		// display images
		this.add.sprite(0, -10, 'game_background');
		// add the button that will start the game
    this.add.sprite((Candy.GAME_WIDTH-420)/2, (Candy.GAME_HEIGHT-221)/2, 'win');
    var gam = this;
    setTimeout(function(){
      gam.input.onDown.add(gam.pickRecipient, gam);
    }, 1000);
	},
	pickRecipient: function() {
		// start the Game state
		this.state.start('PickRecipient');
	}
};
