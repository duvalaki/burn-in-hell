import logo from "./logo.svg";
import "./App.css";
import f1Url from "./f1.png";
import f2Url from "./f2.png";
import f3Url from "./f3.png";
import f4Url from "./f4.png";
import { useState, useEffect } from "react";
import * as PIXI from "pixi.js";
import sound from "./campfire-1.mp3";

function randomNumber(min, max) {
  // min and max included
  return Math.random() * (max - min + 1) + min;
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

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
    {
      name: "f2",
      url: f2Url,
    },
    {
      name: "f3",
      url: f3Url,
    },
    {
      name: "f4",
      url: f4Url,
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
function setup(x, y) {
  //Create the cat sprite
  let cat;
  let random = randomIntFromInterval(1, 4);
  switch (random) {
    case 1:
      cat = new PIXI.Sprite(app.loader.resources.f1.texture);
      break;
    case 2:
      cat = new PIXI.Sprite(app.loader.resources.f2.texture);
      break;
    case 3:
      cat = new PIXI.Sprite(app.loader.resources.f3.texture);
      break;
    case 4:
      cat = new PIXI.Sprite(app.loader.resources.f4.texture);
      break;
    default:
      cat = new PIXI.Sprite(app.loader.resources.f4.texture);
      break;
  }
  //Add the cat to the stage
  cat.height = 100;
  cat.width = cat.anchor.x = 0.5;
  cat.anchor.y = 0.5;
  cat.x = x;
  cat.y = y;
  let c = randomNumber(Math.PI / 4, (Math.PI * 3) / 4);
  cat.rotation = (Math.cos(c) * Math.PI) / 4;
  fires.push({
    cosBase: c,
    fire: cat,
  });
  app.stage.addChild(cat);
  app.render();

  var audio = new Audio(sound);
  audio.play();
}

let cosBase = 0;
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
      for (let info of fires) {
        info.cosBase += 0.01 * delta;
        if (info.cosBase > 2 * Math.PI) info.cosBase = 0;
        info.fire.rotation = (Math.cos(info.cosBase) * Math.PI) / 4;
      }
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
