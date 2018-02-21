function Base() {
  this.element;
  this.width = 600;
  this.height = 100;

  this.create = function() {
    this.element = document.createElement('div');
    
    this.element.style.top = 260 + 'px';
    this.element.style.margin = "0 auto";    
    this.element.style.position = 'absolute';    
    this.element.style.background = '#000000';
    this.element.style.width = this.width + 'px';
    this.element.style.height = this.height + 'px';
  }
}