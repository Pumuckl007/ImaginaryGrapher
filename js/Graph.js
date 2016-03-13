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
      self.points.push({x:Math.random()*100, y:Math.random()*100});
      self.points.push({x:Math.random()*100, y:Math.random()*100});
      self.points.push({x:Math.random()*100, y:Math.random()*100});
      self.render();
     }, false);
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
    this.ctx.translate(Math.random(), 0);
    this.ctx.scale(zoom, zoom);
    console.log(center.x, center.y);
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

  getAspect(){
    return this.canvas.offsetWidth/this.canvas.offsetHeight;
  }

  getZoomAndCenter(){
    let max = this.getMax();
    let aspect = this.getAspect();
    let width = max[1]-max[0];
    let height = max[3]-max[2];
    let center = {x:width/2, y:height/2};
    let scaleMax = Math.max(width, height*aspect);
    let pixleWidth = this.canvas.offsetWidth;
    let zoom = pixleWidth/scaleMax;
    return {zoom: zoom, center: center};
  }

  getMax(){
    let max = [Number.MAX_VALUE,Number.MIN_VALUE,Number.MAX_VALUE,Number.MIN_VALUE];
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
