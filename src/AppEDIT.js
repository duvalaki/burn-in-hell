import logo from "./logo.svg";
import "./App.css";
import f1Url from "./f1.png";
import { useState, useEffect } from "react";
import * as PIXI from "pixi.js";

let app = new PIXI.Application({
  width: 256,
  height: 256,
  antialias: true,
  transparent: false,
  resolution: 1,
});
app.loader
  .add([
    {
      name: "f1",
      url: f1Url,
    },
  ])
  .load(() => setup());
app.renderer.plugins.interaction.on("pointerdown", (event) => {});

let background = new PIXI.Graphics();
let message = new PIXI.Text("Hello Pixi!");

var fires = [];
var numberOfFires = 1;

function setup() {
  //Create the cat sprite
  let cat = new PIXI.Sprite(app.loader.resources.f1.texture);
  //Add the cat to the stage
  app.stage.addChild(cat);

  for (var i = 0; i < numberOfFired; i++){
    var newFire = {
        x: random(width-10),
        y: random(height-10),
        xv: random(-5,5),
        yv: random(-5,5),

    };
    newFire.draw = function(){
        this.x = this.x + this.xv;
        if (this.x > width - 10 || this.x < 0){
            this.xv = this.xv * -1;
        }
        this.y = this.y + this.yv;
        if(this.y > height - 10 || this.y < 0){
            this.yv = this.yv * -1;
        }
        rect(this.x, this.y, 10,10);     
    };
    fires.push( newFire );
}
}

function App() {
  const [text, setText] = useState("Some cool text");
  useEffect(() => {
    document.body.appendChild(app.view);
    background.beginFill(0x5fddff);
    background.drawRect(0, 0, 256, 256);
    background.interactive = true;
    background.mousedown = (e) => {
      console.log("background", e);
    };
    app.stage.addChild(background);
    app.stage.addChild(message);
  }, []);

  message.text = text;
  return (
    <div className="App" tabIndex="-1">
      <button
        onClick={(e) => {
          console.log(e);
          console.log(document.getElementById("mytext"));
          document.getElementById("mytext").focus();
        }}
      >
        Activate Lasers
      </button>
      <input
        tabIndex="-1"
        type="text"
        id="mytext"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
}

function draw(){
  // variables acutally get hoisted to the top of the function by the javascript compile
  var i; // i is available at the start of the function but holds the value undefined
  //background('blue');
  // drawing the moles
  for(var i = 0; i < fires.length; i++){
      fires[i].draw();
  }

  function mousedown(){
    /// check the moles to see if any are clicked
    // if clicked then remove from array
 /*   for ( var i = 0; i < moles.length; i++){
        moles[i].jump();
    }
    */
   for (fire of fires){
       if(mouseX > fire.x && mouseX < (fire.x + fire.size)){
           alert();
       }

    


   }
}
}


export default App;
