"use strict";
class Graph{
  constructor(domElement){
    this.dom = domElement;
    console.log(this);
    this.canvas = domElement.firstElementChild;
    this.ctx = this.canvas.getContext('2d');
    this.points = [];
    var self = this;
    this.canvas.width = this.dom.offsetWidth;
    this.canvas.height = this.dom.offsetHeight;
    this.canvas.addEventListener('click', function() {
      let val = 36;
      self.reset();
      for(let i = 0; i<val; i++){
        self.points.push({x:Math.cos(2*Math.PI*i/val)*10+Math.random()-0.5, y:Math.sin(2*Math.PI*i/val)*10+Math.random()-0.5});
      }
      self.render();
     }, false);
  }

  repaint(t){
    let val = 70;
    this.reset();
    for(let i = 0; i<val; i++){
      this.points.push({x:Math.cos(2*Math.PI*i/val)*10+Math.sin(t)*Math.cos(Math.PI*i*3/35),
         y:Math.sin(2*Math.PI*i/val)*10+Math.cos(t)*Math.sin(Math.PI*i*3/35)});
    }
    this.render();
  }

  reset(){
    while(this.points.length > 0) {
      this.points.pop();
    }
  }

  fit(){
    this.canvas.width  = canvas.offsetWidth;
    this.canvas.height = canvas.offsetHeight;
  }

  setPoints(points){
    this.points = points;
  }

  render(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    let zAndC = this.getZoomAndCenter();
    let zoom = zAndC.zoom;
    let center = zAndC.center;
    this.ctx.save();
    this.ctx.translate(center.x, center.y);
    this.ctx.scale(zoom, zoom);
    this.ctx.fillStyle = "orange";
    this.ctx.beginPath();
    if(this.points[0]){
      this.ctx.moveTo(this.points[0].x, this.points[0].y);
      for(let point of this.points){
        this.ctx.lineTo(point.x, point.y);
      }
      this.ctx.lineTo(this.points[0].x, this.points[0].y);
    }
    this.ctx.fill();
    this.ctx.restore();
  }

  getResolution(){
    return [this.canvas.offsetWidth,this.canvas.offsetHeight];
  }

  getZoomAndCenter(){
    let max = this.getMax();
    let width = max[1]-max[0];
    let height = max[3]-max[2];
    let imageCenter = [(max[0]+max[1])/2,(max[2]+max[3])/2];
    let resolution = this.getResolution();
    let zoom = Math.min(resolution[0]/width, resolution[1]/height);
    let center = {x:resolution[0]/2 - imageCenter[0]*zoom, y:resolution[1]/2 - imageCenter[1]*zoom};
    return {zoom: zoom, center: center};
  }

  getMax(){
    let max = [this.points[0].x, this.points[0].x, this.points[0].y, this.points[0].y];
    for(let point of this.points){
      max[0] = Math.min(point.x, max[0]);
      max[1] = Math.max(point.x, max[1]);
      max[2] = Math.min(point.y, max[2]);
      max[3] = Math.max(point.y, max[3]);
    }
    return max;
  }
}
var graph = new Graph(document.getElementById("canvasWrap"));
var f = function(){
       window.requestAnimationFrame(f);
       graph.repaint(Date.now()/1000);
};
f();
