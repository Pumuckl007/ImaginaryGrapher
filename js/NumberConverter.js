"use strict";
class NumberConverter{

  setEquation(eq){
    this.equation = eq;
    this.parser = math.parser();
  }

  evalEquation(vars){
    for(let index in vars){
      console.log(index + " " + vars[index]);
      this.parser.eval(index + " = " + vars[index]);
    }
    return this.parser.eval(this.equation);
  }

  evalEquationChangeing(vars, changeing){
    let answers = [];
    for(let index in vars){
      this.parser.eval(index + " = " + vars[index]);
    }
    for(let i = 0; i<changeing.length; i++){
      for(let index in changeing[i]){
        this.parser.eval(index + " = " + changeing[i][index]);
      }
      answers.push(this.parser.eval(this.equation));
    }
    return answers;
  }

  convertAnswersToPoints(vars, changeing){
    let answers = this.evalEquationChangeing(vars, changeing);
    let points = [];
    for(let answer of answers){
      points.push({x:answer.re, y:answer.im});
    }
    return points;
  }
}
