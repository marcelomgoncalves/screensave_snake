function State() {
  var delay;
  var subdivision;
  var border;
  var ncolors;
  var dbuf;
  var cpus
  var sw
  var sh
  var gw
  var gh;  
  
  this.initState = function(){

    this.delay =  500;  //milisegundos
    this.subdivision = 40; 
    this.border = 0; 
    this.fg = "#000000";
    this.bg = "#FF0000"; 
    this.sw = width / this.subdivision;
    this.sh = height / this.subdivision;
    this.gw = this.sw ? width / this.sw : 0;
    this.gh = this.sh ? height / this.sh : 0;      
    
  }  
}

