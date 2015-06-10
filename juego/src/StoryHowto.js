Candy.StoryHowto = function(game){};
Candy.StoryHowto.prototype = {
	create: function(){
		// display images
		this.add.sprite(0, -10, 'instrucciones');
		this.add.button(80, 760, 'button-start', this.pickRecipient, this, 0, 0, 0);
	},
	pickRecipient: function() {
		// start the Game state
		this.state.start('PickRecipient');
	}
};
