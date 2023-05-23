function Snake() 
{
  var x = [];
  var y = [];
  var length;
  var direction;
  var color;
  var stay_straight;
  var st;
  var vcor;
   
  this.initSnake = function(v_in, v_color) {
    st = new State();    
    st.initState();  
    
    x.push(random(0, width / 2) % st.subdivision);
    y.push(random(0, height / 2) % st.subdivision);

    direction = ((random(1,9) % 9) >> 1) << 1;
    length = SNAKE_MIN_LEN;
    
    if (v_color) {
      vcor = v_color;
    } else {
      vcor = 1;
    }
    
    if (v_in) {
      stay_straight = v_in;
      
    } else {
      stay_straight = 5;   
    }
        
  };
  
  this.grow = function() {
    let len = length + 1;
    
        if (len < SNAKE_MIN_LEN)
            len = SNAKE_MIN_LEN;
    
        if (len > SNAKE_MAX_LEN)
          len = SNAKE_MAX_LEN;
    
        for (let n = 1; n<=(len - 1); n++) {
          x.push(x[0]);
          y.push(y[0]);
        }
    
    length = len;    
  }
  
  this.move = function(){
    let n = 0, dir = 0;
    let x1 = 0, y1 = 0;   
    
    /* Snake head position */    
    x1 = x[n]
    y1 = y[n]
    
    /* and direction */
    dir = direction;

    /* 0=up, 2=right, 4=down, 6=left */
    switch(dir)
    {
        case 0: y1++;       break;
        case 1: y1++; x1++; break;
        case 2:       x1++; break;
        case 3: y1--; x1++; break;
        case 4: y1--;       break;
        case 5: y1--; x1--; break;
        case 6:       x1--; break;
        case 7: y1++; x1--; break;
    }
    /* Check bounds and change direction */
    if (x1 < 0 && (dir >= 5 && dir <= 7)) {
        x1 = 1;
        dir -= 4;
    }
    else if (y1 < 0 && (dir >= 3 && dir <= 5)) {
        y1 = 1;
        dir -= 4;
    }
    else if (x1 >= st.gw && (dir >= 1 && dir <= 3)) {
        x1 = st.gw - 1;
        dir += 4;
    }
    else if (y1 >= st.gh && (dir == 7 || dir == 0 || dir == 1)) {
        y1 = st.gh - 1;
        dir += 4;
    }
    else if (stay_straight == 0) {
        /* Slightly change snake heading */
        rnd = random(128,999999) % 128;
      
        if(rnd > 130)
            dir -= 3;
        else if(rnd > 120)
            dir += 3;          
        else if(rnd > 110)
            dir += 2;
        else if(rnd > 100)
            dir -= 2;
        else if(rnd>80)
            dir++;         
        else if(rnd == 45)
            dir--;          
        else if(rnd == 1)
            dir++;
        else if(rnd == 2)
            dir--;
        stay_straight = 4;
        //console.log('rnd:'+rnd+' dir:'+dir)
    }
    else {
        stay_straight--;
    }

    if (dir < 0)
        dir = -dir;
    
    dir = dir % 8;

    direction = dir;

    /* Copy x,y coords in "tail" positions */
        
    for(n = length-1; n > 0; n--) {
        x[n] = x[n-1];
        y[n] = y[n-1];
    }
    
    /* New head position */
    x[0] = x1;
    y[0] = y1;    
    
  }
  
  this.snk_clear = function() {
    let x = 0 ;
    let y = 0 ;

    
    fill('black');
    
    for (y = 0; y < st.gh; y++){ 
        for (x = 0; x < st.gw; x++) {
            rect(st.sw * x, st.sh * y,
                            st.border ? st.sw - st.border : st.sw, 
                            st.border ? st.sh - st.border : st.sh);    
        }
    }
  }
  
  this.render  = function() {
    
    var i
    var n
    var body_col
    var tail_pos = 0;    
    var p = 0;
    var str ='';
    
    /* Tail is always SNAKE_TAIL_LEN blocks long */
    tail_pos = length - SNAKE_TAIL_LEN;   

    assert(SNAKE_TAIL_LEN < SNAKE_MIN_LEN);
    assert(length >= SNAKE_MIN_LEN);
    assert(tail_pos > 0);
    
    /* Draw the snake tail with color gradient */
    i = SNAKE_TAIL_LEN;
    
    for (n = length - 1; n >= tail_pos; n--, i--) 
    { 
      
      p = (255 - (i * (30 % SNAKE_MAX_LEN)));
      if (vcor == 1) {
        str = 'rgb('+p+',0,0)';
      } 
      else if (vcor == 2) {
        str = 'rgb(0,'+p+',0)';        
      }
      else if (vcor == 3 ) {
        str = 'rgb(0,0,'+p+')';        
      }
      
      fill(str);
      rect(st.sw * x[i], st.sh * y[i],
              st.border ? st.sw - st.border : st.sw, 
              st.border ? st.sh - st.border : st.sh);
    }
    //-------------
    for (n = tail_pos - 1; n >= 0; n--) 
    {
      p = (255 - (n * (30 % SNAKE_MAX_LEN)));
      if (vcor == 1) {
        str = 'rgb('+p+',0,0)';
      } 
      else if (vcor == 2) {
        str = 'rgb(0,'+p+',0)';        
      }
      else if (vcor == 3 ) {
        str = 'rgb(0,0,'+p+')';        
      }
      
      fill(str);
      rect(st.sw * x[n], st.sh * y[n],
              st.border ? st.sw - st.border : st.sw, 
              st.border ? st.sh - st.border : st.sh);
      
    }        
    //--------------       
  }
  
}