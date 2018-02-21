function Player() {
  this.element;
  this.width = 20; 
  this.height = 50;
  this.gravity = 0;
  this.velocity = 5;
  this.playerX = 30;
  this.playerY = 210;
  this.isJumping = false;

  var GRAVITY = {
    SINGLE_JUMP: 12,
    DOUBLE_JUMP: 15
  };
  var initialGravity = 0;

  this.create = function() {
    this.element = document.createElement('div');

    this.element.style.position = 'absolute';
    this.element.style.background = '#fff028';
    this.element.style.width = this.width + 'px';
    this.element.style.top = this.playerY + 'px';
    this.element.style.left = this.playerX + 'px';
    this.element.style.height = this.height + 'px';
  }

  this.startSingleJump = function () {
    this.isJumping = true;
    this.gravity = initialGravity = GRAVITY.SINGLE_JUMP;
  }

  this.startDoubleJump = function () {
    this.isJumping = true;
    this.gravity = initialGravity = GRAVITY.DOUBLE_JUMP;
  }

  this.move = function () {
    if(this.gravity < -initialGravity){
      this.isJumping = false;
      
      return;
    }

    this.playerY -= this.gravity;
    this.gravity -= 1;
    this.element.style.top = this.playerY + 'px';

  }
}