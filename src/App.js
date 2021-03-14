import logo from "./logo.svg";
import "./App.css";
import f1Url from "./f1.png";
import { useState, useEffect } from "react";
import * as PIXI from "pixi.js";
import sound from "./campfire-1.mp3";

let app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
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
  .load(() => console.log("LOADED"));
app.renderer.plugins.interaction.on("pointerdown", (event) => {
  let coords = event.data.getLocalPosition(app.stage);
  setup(coords.x, coords.y);
});
app.renderer.backgroundColor = 0x5fddff;

let background = new PIXI.Graphics();
let message = new PIXI.Text("Hello Pixi!");
// message.anchor = 0.5;
message.anchor.x = 0.5;
message.anchor.y = 0.5;
message.x = window.innerWidth / 2;
message.y = window.innerHeight / 2;

let fires = [];
let cat;
function setup(x, y) {
  //Create the cat sprite
  cat = new PIXI.Sprite(app.loader.resources.f1.texture);
  //Add the cat to the stage
  cat.anchor.x = 0.5;
  cat.anchor.y = 0.5;
  cat.x = x;
  cat.y = y;
  fires.push(cat);
  app.stage.addChild(cat);
  app.render();

  var audio = new Audio(sound);
  audio.play();
}

let cosBase = 0;
console.log(Math.cos(2 * Math.PI), Math.cos(0));
function App() {
  const [text, setText] = useState("Some cool text");
  useEffect(() => {
    console.log("effect");
    document.body.appendChild(app.view);
    background.beginFill(0x5fddff);
    background.drawRect(0, 0, 256, 256);
    app.stage.addChild(background);
    app.stage.addChild(message);

    app.ticker.add((delta) => {
      // just for fun, let's rotate mr rabbit a little
      // delta is 1 if running at 100% performance
      // creates frame-independent transformation
      //console.log(Math.cos(delta));
      cosBase += 0.01 * delta;
      if (cosBase > 2 * Math.PI) cosBase = 0;
      message.rotation = (Math.cos(cosBase) * Math.PI) / 4;
      for (let fire of fires) {
        fire.rotation = (Math.cos(cosBase) * Math.PI) / 4;
      }
      // console.log(Math.cos(cosBase));
      // message.rotation += 0.1 * delta;
    });
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

export default App;
