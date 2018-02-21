function Enemy() {
  this.element;

  var CONSTANTS = {
    WIDTH: 5,
    POS_X: 600,
    POS_Y: 210,
    VELOCITY: 3,
    BASE_HEIGHT: 100,
    SMALL_HEIGHT: 25,
    LARGE_HEIGHT: 75,
    CONTAINER_HEIGHT: 360
  }
  
  this.posX = CONSTANTS.POS_X;
  this.width = CONSTANTS.WIDTH;
  this.height = CONSTANTS.LARGE_HEIGHT;
  this.posY = CONSTANTS.CONTAINER_HEIGHT - CONSTANTS.BASE_HEIGHT - this.height;

  this.create = function () {
    this.element = document.createElement('div');

    this.element.style.position = 'absolute';
    this.element.style.background = '#e8230d';
    this.element.style.top = this.posY + 'px';
    this.element.style.left = this.posX + 'px';
    this.element.style.width = this.width + 'px';
    this.element.style.height = this.height + 'px';
  }

  this.move = function () {
    if (this.posX < -this.width) {
      this.posX = CONSTANTS.POS_X;

      var toss = Math.floor(Math.random()*2);
      this.height =  toss ? CONSTANTS.SMALL_HEIGHT : CONSTANTS.LARGE_HEIGHT;
      this.element.style.height = this.height + 'px';

      this.posY = CONSTANTS.CONTAINER_HEIGHT - CONSTANTS.BASE_HEIGHT - this.height;
      this.element.style.top = this.posY + 'px';
    }
    else {
      this.posX -= CONSTANTS.VELOCITY;
    }
    this.element.style.left = this.posX + 'px';
  }
}