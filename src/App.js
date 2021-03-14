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

function setup() {
  //Create the cat sprite
  let cat = new PIXI.Sprite(app.loader.resources.f1.texture);
  //Add the cat to the stage
  app.stage.addChild(cat);
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

export default App;
