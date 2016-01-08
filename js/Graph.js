"use strict";
class Graph{
  constructor(domElement){
    this.canvas = domElement;
    this.ctx = this.canvas.getContext('2d');
    this.points = [];
  }

  fit(){
    this.canvas.width  = canvas.offsetWidth;
    this.canvas.height = canvas.offsetHeight;
  }

  setPoints(points){
    this.points = points;
  }

  render(){
    let zAndC = this.getZoomAndCenter();
    let zoom = zAndC.zoom;
    let center = zAndC.center;
    this.ctx.save();
    this.ctx.scale(zoom, zoom);
    this.ctx.beginPath();
    if(this.points[0]){
      this.ctx.moveTo(this.points[0].x, this.points[0].y);
      for(let point in this.points){
        this.ctx.lineTo(point.x, point.y);
      }
      this.ctx.lineTo(this.points[0].x, this.points[0].y);
    }
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.restore();
  }

  getAspect(){
    return this.canvas.offsetWidth/this.canvas.offsetHeight;
  }

  getZoomAndCenter(){
    let max = this.getMax();
    let aspect = this.getAspect();
    let width = max[2]-max[0];
    let height = max[3]-max[1];
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
