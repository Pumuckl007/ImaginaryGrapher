"use strict";
var operands = [["+","-"], ["*","/"], ["^"]]
class Equation{

  constructor(){
    this.operator = new Operation();
    this.oppEscelation = [];
    this.oppEscelation.push(this.operator);
    this.baseCurrentOpp = this.operator;
  }

  goUp(){
    let opp = this.operator;
    if(opp.left){
      if(opp.right){
        let right = opp.right;
        let newOpp = new Operation(right);
        this.operator.setRight(newOpp);
        this.operator = newOpp;
      } else {
        opp.setRight(new Operation());
        this.operator = opp.right;
      }
      this.baseCurrentOpp = this.operator;
      this.oppEscelation.push(this.operator);
    } else {
      opp.setLeft(new Operation());
      this.operator = opp.left;
      this.baseCurrentOpp = this.operator;
      this.oppEscelation.push(this.operator);
    }
  }

  goDown(){
    let parent = this.oppEscelation[this.oppEscelation.length-2];
    if(parent){
      if(parent.left === this.baseCurrentOpp){
        this.baseCurrentOpp = parent;
        this.oppEscelation.pop();
        this.operator = this.baseCurrentOpp;
      } else {
        let opp = new Operation(this.baseCurrentOpp);
        parent.setRight(opp);
        this.operator = opp;
        this.baseCurrentOpp = parent;
        this.oppEscelation.pop();
      }
    }
  }

  append(operation){
    if(this.operator.opp){
      let right = this.operator.right;
      let newOpp = new Operation(right, operation);
      this.operator.setRight(newOpp);
      this.operator = newOpp;
      this.oppEscelation[this.oppEscelation.length-1] = this.operator;
    } else {
      this.operator.opp = operation;
    }
  }

  appendVar(aVar){
    let opp = this.operator;
    if(opp.left){
      opp.setRight(aVar);
    } else {
      opp.setLeft(aVar);
    }
  }

  static build(equation, variables){

  }

}

class Operation{
  constructor(left, opp, right){
    this.setLeft(left);
    this.setRight(right);
    this.opp = opp;
  }

  eval(){
    if(this.left){
      if(this.right){
        return this.left.eval()[this.opp](this.right.eval());
      } else {
        return this.left.eval();
      }
    } else {
      if(this.right){
        return this.right.eval();
      }
    }
    return 0;
  }

  toString(){
    if(this.left){
      if(this.right){
        return "(" + this.left.toString() + " " + this.opp + " " + this.right.toString() + ")";
      } else {
        return this.left.toString();
      }
    } else {
      if(this.right){
        return this.right.toString();
      }
    }
    return "";
  }

  setLeft(left){
    this.left = left;
    if(this.left){
      this.left.parent = this;
    }
  }

  setRight(right){
    this.right = right;
    if(this.right){
      this.right.parent = this;
    }
  }
}

class Value{
  constructor(value){
    this.value = value;
  }

  getValue(){
    return this.value;
  }

  setValue(value){
    this.value = value;
  }

  eval(){
    return this.value;
  }

  toString(){
    return "(" + this.value + ")";
  }
}

var test = function(){
  var e = new Equation();
  window.e = e;
  e.goUp();
  e.appendVar(new Value(new Number(12,0)));
  e.append("multiply");
  e.appendVar(new Value(new Number(4,0)));
  e.append("divide");
  e.appendVar(new Value(new Number(6,0)));
  e.append("multiply");
  // e.appendVar(new Value(new Number(2,0)));
  console.log(e.baseCurrentOpp.toString());
  let times = 1;
  for(var i = 0; i<times; i++){
    e.goUp();
    e.appendVar(new Value(new Number(Math.random(), Math.random())));
    e.append("pow");
    e.appendVar(new Value(new Number(Math.random(), Math.random())));
  }
  for(var i = 0; i<times; i++){
    e.goDown();
  }
  // e.goDown();
  e.goUp();
  e.appendVar(new Value(new Number(13,37)));
  e.append("multiply");
  e.appendVar(new Value(new Number(1,-1)));
  e.goDown();
  e.gojsDown();
  e.append("sub");
  e.appendVar(new Value(new Number(1,5)));
}
