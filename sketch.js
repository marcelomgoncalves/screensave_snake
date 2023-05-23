const SNAKE_MIN_LEN = 5
const SNAKE_MAX_LEN = 20
const SNAKE_TAIL_LEN = 4

var s,s1;
var v_delay = 200;

function setup() {
  createCanvas(640, 480);
  background('#000000');
         
  s = new Snake();
  s.initSnake();
  
  s1 = new Snake();
  s1.initSnake(1,2);
  
}

function draw() {
  s.snk_clear();
  s1.snk_clear();
  
  s.grow();
  s.render();  
  s1.render();
  s.move();
  s1.move();
  
    wait(v_delay);  
  
}

function assert( outcome, description ) { 
    var passFail = outcome ? true : false; 
    return outcome;
}

function wait(time)
{
  start = millis()
  do
  {
    current = millis();
  }
  while(current < start + time)
}