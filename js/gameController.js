function GameController(element) {
  var element = document.getElementById(element);
  var container, base, player, enemy, animator, score;

  this.init = function () {
    base = new Base();
    score = new Score();
    enemy = new Enemy();
    player = new Player();
    container = new Container();

    container.create();
    element.appendChild(container.element);

    base.create();
    container.append(base.element);

    player.create();
    container.append(player.element);

    enemy.create();
    container.append(enemy.element);

    score.create();
    container.append(score.element);

    animator = new Animator(container, base, player, gameController, enemy, score);
    animator.animate();
  }

  this.restart = function () {
    element.removeChild(container.element);
    gameController.init();
  }
}

var gameController = new GameController('gameController');
gameController.init();