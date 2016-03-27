"use strict";
{
  let listeners = [];
  let element = document.getElementById("equation");
  var Input = class Input{

    static registerListiner(listener){
      listeners.push(listener);
    }

    static onChange(vars){
      for(let listener of listeners){
        listener.event(vars);
      }
    }
  }
  element.onchange = Input.onChange;
}

class UI{
  constructor(canvas, input, numberConverter){
    this.vars = {};
    this.hidden = {};
    this.ul = document.createElement("ul");
    this.ul.className = "varList";
    this.hasBeenAdded = false;
    this.graph = canvas;
    this.input = input;
    this.numberConverter = numberConverter;
  }

  getValues(){
    let returns = {};
    for(let id in this.vars){
      if(!(this.hidden[id])){
        returns[id] = this.vars[id].valueUI;
      }
    }
    return returns;
  }

  addVar(name, callBack){
    if(this.vars[name]){
      this.hidden[name] = false;
      return;
    }
    let divWrapper = document.createElement("div");
    divWrapper.id = name;
    let input = document.createElement("input");
    input.className = "varInput";
    input.value = "0";
    let span = document.createElement("span");
    span.className = "varInputLable";
    divWrapper.className = "varWrapper";
    span.textContent = name + ":\t";
    divWrapper.appendChild(span);
    divWrapper.appendChild(input);
    this.vars[name] = divWrapper;
    this.vars[name].valueUI = "0";
    let vars = this.vars;
    let self = this;
    input.onchange = function(event){
      vars[name].valueUI = event.srcElement.value;
      self.callBack();
    }
  }

  callBack(){
    let vars = {};
    let changeing = [];
    let input = [];
    let colors = [];
    for(let index in this.vars){
      vars[index] = this.vars[index].childNodes[1].value;
    }
    for(let i = 0; i<100; i++){
      for(let k = 1; k<=1; k++){
        let x = Math.cos(i/50*Math.PI)*k;
        let y = Math.sin(i/50*Math.PI)*k;
        colors.push({c:0x10101 * ~~(i*256/100)})
        input.push({x:x, y:y});
        changeing.push({x: x + " + i*" + y});
      }
    }
    let answerPoints = this.numberConverter.convertAnswersToPoints(vars,changeing);
    this.graph.graph(answerPoints, colors);
    this.input.graph(input, colors)
  }


  clearVars(){
    for(let index in this.vars){
      this.hidden[index] = true;
    }
  }

  updateDisplay(){
    if(!this.hasBeenAdded){
      this.hasBeenAdded = true;
      document.getElementById("vars").appendChild(this.ul);
    }
    for(let element in this.vars){
      if(!(this.vars[element].parentNode)){
        let listEntry = document.createElement("li");
        listEntry.className = "varListEntry";
        listEntry.appendChild(this.vars[element]);
        this.ul.appendChild(listEntry);
      }
      let listEntry = this.vars[element].parentNode;
      listEntry.style.display = this.hidden[element] ? "none" : "";
    }
    this.sort();
  }

  sort(){
    let new_ul = this.ul.cloneNode(false);

    // Add all lis to an array
    var lis = [];
    for(var i = this.ul.children.length; i--;){
        if(this.ul.children[i].nodeName === 'LI')
            lis.push(this.ul.children[i]);
    }

    // Sort the lis in descending order
    lis.sort(function(a, b){
       return a.firstChild.id.localeCompare(b.firstChild.id);
    });

    // Add them into the ul in order
    for(var i = 0; i < lis.length; i++)
        new_ul.appendChild(lis[i]);
    this.ul.parentNode.replaceChild(new_ul, this.ul);
    this.ul = new_ul;
  }
}

class EventHandler{
  constructor(ui, numberConverter){
    this.uI = ui;
    this.numberConverter = numberConverter;
  }

  event(evnt){
    if(!(evnt.srcElement.value) || !(evnt.srcElement.value.length > 0)){
      return;
    }
    let letters = "abcdfghjklmnopqrstuvwyz";
    let string = evnt.srcElement.value.toLowerCase();
    this.uI.clearVars();
    for(let i = 0; i<string.length; i++){
      if(string[i] != "p" || !(string.length-1 > i && string[i+1] === "i")){
        if(letters.indexOf(string[i]) >= 0){
          this.uI.addVar(string[i]);
        }
      }
    }
    this.uI.updateDisplay();
    this.numberConverter.setEquation(evnt.srcElement.value);
    let element = document.getElementById("output");
    element.textContent = "`" + evnt.srcElement.value + "`";
    MathJax.Hub.Queue(
      ["Typeset",MathJax.Hub,element]
    );
    this.uI.callBack();
  }
}
