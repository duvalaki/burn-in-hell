import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import * as PIXI from "pixi.js";

let app = new PIXI.Application({
  width: 256,
  height: 256,
  antialias: true,
  transparent: false,
  resolution: 1,
});
app.renderer.plugins.interaction.on("pointerdown", (event) => {
  console.log(event.data.global);
});

let background = new PIXI.Graphics();
let message = new PIXI.Text("Hello Pixi!");

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
  console.log(app.renderer.view.getContext("2d"));
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
