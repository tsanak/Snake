var Snake = function(grid)
{
  this.initialSpeed = grid;
  this.speedX = this.initialSpeed;
  this.speedY = 0;
  this.posX = grid;
  this.posY = grid;
  this.currentDir = 'right';
  this.tail = [];
  this.total = 0;
  this.headColor = '#00ad42';
  this.tailColor = '#006627';

  this.drawSnake = function()
  {
    if (this.total === this.tail.length) {
      for (var i = 0; i < this.tail.length - 1; i++) {
        this.tail[i] = this.tail[i + 1];
      }
    }
    this.tail[this.total - 1] = createVector(this.posX, this.posY);

    this.posX += this.speedX;
    this.posY += this.speedY;
    //Let the snake go from one side to the other
    // through the boundaries
    if(this.posX > width-grid)
    {
      this.posX = 0;
    }
    if(this.posX < 0)
    {
      this.posX = width;
    }
    if(this.posY > height-grid)
    {
      this.posY = 0;
    }
    if(this.posY < 0)
    {
      this.posY = height;
    }
    //this.posX = constrain(this.posX,0,width-grid);
    //this.posY = constrain(this.posY,0,height-grid);

    fill(this.tailColor);
    for (var i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, grid, grid);
    }
    fill(this.headColor);
    rect(this.posX,this.posY,grid,grid);
  };

  this.moveSnake = function(keyCode)
  {
    if(keyCode === LEFT_ARROW)
    {
      if(this.currentDir != 'right')
      {
        this.speedX = -this.initialSpeed;
        this.speedY = 0;
        this.currentDir = 'left';
      }
    } else if(keyCode === RIGHT_ARROW)
    {
      if(this.currentDir != 'left')
      {
        this.speedX = this.initialSpeed;
        this.speedY = 0;
        this.currentDir = 'right';
      }
    } else if(keyCode === UP_ARROW)
    {
      if(this.currentDir != 'down')
      {
        this.speedY = -this.initialSpeed;
        this.speedX = 0;
        this.currentDir = 'up';
      }
    } else if(keyCode === DOWN_ARROW)
    {
      if(this.currentDir != 'up')
      {
        this.speedY = this.initialSpeed;
        this.speedX = 0;
        this.currentDir = 'down';
      }
    }
  };

  this.eat = function(position){
    var d = dist(this.posX, this.posY , position.x , position.y);
    if(d<4)
    {
      this.grow();
      return true;
    }
    return false;
  }
  this.grow = function(){
    this.total++;
  };

  this.death = function(){
    for (var i = 0; i < this.tail.length - 1; i++) {
      var pos = this.tail[i];
      var d = dist(this.posX,this.posY,pos.x,pos.y);
      if(d<1)
      {
        this.total = 0;
        this.tail = [];
        console.log("exases");
        return true;
      }
    }
    return false;
  }
}
