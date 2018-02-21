function Animator(container, base, player, gameController, enemy, score) {
  var that = this;

  this.base = base;
  this.enemy = enemy;
  this.score = score;
  this.player = player;
  this.container = container;
  this.gameController = gameController;

  this.game = true;

  var analyser;
  var KEY_CODES = {
    S: 83,
    SPACE: 32,
    ENTER: 13
  }
  var score = 0;

  initialise = function () {
    var hasMedia = checkUserMedia();
    if (!hasMedia) {
      alert('Oops. We cannot access your microphone for the game');
    }
    else {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      var context = new AudioContext();

      navigator.getUserMedia({ audio: true }, function (stream) {
        var microphone = context.createMediaStreamSource(stream);
        var filter = context.createBiquadFilter();

        analyser = context.createAnalyser();
        analyser.fftSize = 2048;
        var data = new Uint8Array(analyser.frequencyBinCount);
        microphone.connect(analyser);
      }, handleError);
    }
  }

  checkUserMedia = function () {
    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia || navigator.msGetUserMedia);
  }

  handleError = function () {
    alert('Could not get audio input');
  }

  initialise();

  this.animate = function () {
    var x = 1;
    if (that.game) {
      checkCollision();
      that.move(enemy);
      document.onkeydown = checkKeyDown;
      if (analyser) {
        var data = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(data);
        var sum = 0;
        data.map(function (d) {
          sum += d;
        })
        var avg = sum / data.length;
        if (!that.player.isJumping) {
          if (avg > 10)
            startDoubleJump();
          else if (avg > 5 && avg < 10)
            startSingleJump()
        }
      }

      if (that.player.isJumping) {
        that.move(player)
      }
      if (that.enemy.posX === 0) {
        score += 1;
      }
      that.score.element.innerHTML = 'Score: ' + score;
    }
    else {
      setTimeout(function () {
        that.container.element.style.fontSize = '30px';
        that.container.element.style.textAlign = 'center';
        that.container.element.innerHTML = 'Hah! Looks like you weren\'t loud enough!<br />Press Enter to restart.<br />Score: ' + score;
      }, 2000);
    }
    window.requestAnimationFrame(that.animate);
  }

  this.move = function (object) {
    object.move();
  }

  checkKeyDown = function (e) {
    if (!that.game) {
      that.gameController.restart();
    }
  }

  startSingleJump = function () {
    that.player.startSingleJump();
  }

  startDoubleJump = function () {
    that.player.startDoubleJump();
  }

  checkCollision = function () {
    if (that.enemy.posX > that.player.playerX &&
      that.enemy.posX < that.player.playerX + that.player.width &&
      that.player.playerY + that.player.height >= that.enemy.posY &&
      that.player.playerY + that.player.height <= that.enemy.posY + that.enemy.height) {
      that.game = false;
    }
  }
}