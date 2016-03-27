(function(){
  let inPutGraph = new Graph(document.getElementById("canvasWrap2"));
  let outPutGraph = new Graph(document.getElementById("canvasWrap"));
  let numberConverter = new NumberConverter();
  let uI = new UI(outPutGraph, inPutGraph, numberConverter);
  let eh = new EventHandler(uI, numberConverter);
  Input.registerListiner(eh);
})();
