Candy.Game = function(game){
	// define needed variables for Candy.Game
	this._player = null;
	this._candyGroup = null;
	this._spawnCandyTimer = 0;
	this._fontStyle = null;
	// define Candy variables to reuse them in Candy.item functions
	Candy._scoreText = null;
	Candy._score = 0;
	Candy._health = 0;
};
Candy.Game.prototype = {
	create: function(){
		// start the physics engine
		this.physics.startSystem(Phaser.Physics.ARCADE);
		// set the global gravity
		this.physics.arcade.gravity.y = 200;
		// display images: background, floor and score
		this.add.sprite(0, 0, 'background');
		this.add.sprite(-30, Candy.GAME_HEIGHT-160, 'floor');
		this.add.sprite(10, 5, 'score-bg');
		// add pause button
		this.add.button(Candy.GAME_WIDTH-96-10, 5, 'button-pause', this.managePause, this);
		// create the player
		this._player = this.add.sprite(5, 760, 'monster-idle');
		// add player animation
		this._player.animations.add('idle', [0,1,2,3,4,5,6,7,8,9,10,11,12], 10, true);
		// play the animation
		this._player.animations.play('idle');
		// set font style
		this._fontStyle = { font: "40px Arial", fill: "#FFCC00", stroke: "#333", strokeThickness: 5, align: "center" };
		// initialize the spawn time
		this._spawnCandyTimer = 0;
		// initialize the score text with 0
		Candy._scoreText = this.add.text(120, 20, "0", this._fontStyle);
		// set health of the player
		Candy._health = 10;
		// create new group for candy
		this._candyGroup = this.add.group();
    // randomize candy type
    var type = Math.floor(Math.random()*5);
		// spawn first candy
		Candy.item(this, type);
	},
	managePause: function(){
		// pause the game
		this.game.paused = true;
		// add proper informational text
		var pausedText = this.add.text(100, 250, "Game paused.\nTap anywhere to continue.", this._fontStyle);
		// set event listener for the user's click/tap the screen
		this.input.onDown.add(function(){
			// remove the pause text
			pausedText.destroy();
			// unpause the game
			this.game.paused = false;
		}, this);
	},
	update: function(){
		// update timer every frame
		this._spawnCandyTimer += this.time.elapsed;
		// if spawn timer reach one second (1000 miliseconds)
		if(this._spawnCandyTimer > 1000) {
			// reset it
			this._spawnCandyTimer = 0;
      // randomize candy type
      var type = Math.floor(Math.random()*5);
			// and spawn new candy
			Candy.item(this, type);
		}
		// loop through all candy on the screen
		this._candyGroup.forEach(function(candy){
			// to rotate them accordingly
			candy.angle += candy.rotateMe;
		});
		// if the health of the player drops to 0, the player dies = game over
		if(!Candy._health) {
			// show the game over message
			this.add.sprite((Candy.GAME_WIDTH-594)/2, (Candy.GAME_HEIGHT-271)/2, 'game-over');
			// pause the game
			this.game.paused = true;
      this.input.onDown.add(this.restartGame, this);
		}
	},
  restartGame: function() {
    this.game.state.restart();
  }
};

Candy.item = function(game, type) {
  var _gamee = game;
  var _type  = type;

	this.options = {
    spawnCandy: function(_game){
      // calculate drop position (from 0 to game width) on the x axis
      var dropPos = Math.floor(Math.random()*Candy.GAME_WIDTH);
      // define the offset for every candy
      var dropOffset = [-27,-36,-36,-38,-48];
      // create new candy
      var candy = _game.add.sprite(dropPos, dropOffset[_type], 'candy');
      // add new animation frame

      candy.animations.add('anim', [type], 10, true);
      // play the newly created animation
      candy.animations.play('anim');
      // enable candy body for physic engine
      _game.physics.enable(candy, Phaser.Physics.ARCADE);
      // enable candy to be clicked/tapped
      candy.inputEnabled = true;
      // add event listener to click/tap
      candy.events.onInputDown.add(this.clickCandy, this);
      // be sure that the candy will fire an event when it goes out of the screen
      candy.checkWorldBounds = true;
      // reset candy when it goes out of screen
      candy.events.onOutOfBounds.add(this.removeCandy, this);
      // set the anchor (for rotation, position etc) to the middle of the candy
      candy.anchor.setTo(0.5, 0.5);
      // set the random rotation value
      candy.rotateMe = (Math.random()*4)-2;
      // add candy to the group
      _game._candyGroup.add(candy);
    },
    clickCandy: function(candy){
      // add points to the score
      this.setScore();
      // kill the candy when it's clicked
      candy.kill();
      // update score text
      this.updateLifeStatus();
    },
    removeCandy: function(candy){
      // kill the candy
      candy.kill();
      // decrease player's health
      if (_type == 0 || _type == 1 || _type == 4) {
        Candy._score -= 10;
      }
      // update score text
      this.updateLifeStatus();
    },
    setScore: function(){
      if (_type == 2 || _type == 3) {
        Candy._score -= 10;
      } else {
        Candy._score += 10;
      }
      var gravity = _gamee.physics.arcade.gravity.y
      _gamee.physics.arcade.gravity.y = gravity + Candy._score * 0.5;
    },
    gameOver: function(){
        // show the game over message
      _gamee.add.sprite((Candy.GAME_WIDTH-594)/2, (Candy.GAME_HEIGHT-271)/2, 'game-over');
      Candy._score = 0;
        // pause the game
      //_gamee.game.paused = true;
    },
    updateLifeStatus: function(){
      if (Candy._score < 0) {
        _gamee.input.onDown.add(this.restartGame, _gamee);
        this.gameOver();
      } else {
        Candy._scoreText.setText(Candy._score);
      }
    },
    restartGame: function() {
      _gamee.game.state.restart();
    }
  };
  this.options.spawnCandy(_gamee);
};
