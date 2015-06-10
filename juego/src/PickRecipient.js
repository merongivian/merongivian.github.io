Candy.PickRecipient = function(game){};
Candy.PickRecipient.prototype = {
	create: function(){
		this.add.sprite(0, -10, 'menu_recipient');
		this.add.button(100, 580, 'recipientuno', this.pickRecipientUno, this, 1, 0, 2);
		this.add.button(340, 400, 'recipientdos', this.pickRecipientDos, this, 1, 0, 2);
    this.add.button(100, 400, 'recipientres', this.pickRecipientTres, this, 1, 0, 2);

		var fontStylePause = { font: "30px Rockwell", fill: "#000000", stroke: "#333", strokeThickness: 0, align: "center" };
		this.add.text(160, 680, "Botella", fontStylePause);
		this.add.text(405, 500, "Llanta", fontStylePause);
		this.add.text(160, 500, "Maseta", fontStylePause);
	},
	pickRecipientUno: function() {
    Candy.recipient = 1
		this.state.start('PickSeed');
	},
	pickRecipientDos: function() {
    Candy.recipient = 2
		this.state.start('PickSeed');
	},
	pickRecipientTres: function() {
    Candy.recipient = 3
		this.state.start('PickSeed');
	}
};
