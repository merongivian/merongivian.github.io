Candy.PickSeed = function(game){};
Candy.PickSeed.prototype = {
	create: function(){
		this.add.sprite(0, -10, 'menu_seed');
		this.add.button(100, 380, 'plantauno', this.pickSeedOne, this, 1, 0, 2);
		this.add.button(130, 540, 'plantados', this.pickSeedTwo, this, 1, 0, 2);
    this.add.button(370, 340, 'plantatres', this.pickSeedThree, this, 1, 0, 2);

		var fontStylePause = { font: "30px Rockwell", fill: "#000000", stroke: "#333", strokeThickness: 0, align: "center" };
		this.add.text(180, 710, "Ají", fontStylePause);
		this.add.text(405, 600, "Maíz", fontStylePause);
		this.add.text(140, 510, "Tomate", fontStylePause);
	},
	pickSeedOne: function() {
    Candy.seed = 1;
		this.state.start('Game');
	},
	pickSeedTwo: function() {
    Candy.seed = 2;
		this.state.start('Game');
	},
	pickSeedThree: function() {
    Candy.seed = 3;
		this.state.start('Game');
	}
};
