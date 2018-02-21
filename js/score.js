function Score() {
  this.element;

  this.create = function () {
    this.element = document.createElement('div');

    this.element.style.padding = '5px';
    this.element.style.float = 'right';
    this.element.style.fontSize = '25px';
    this.element.style.color = '#e8230d';
  }
}