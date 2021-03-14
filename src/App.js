import "./App.css";
import f1Url from "./f1.png";
import f2Url from "./f2.png";
import f3Url from "./f3.png";
import f4Url from "./f4.png";
import { useState, useEffect } from "react";
import * as PIXI from "pixi.js";
import sound from "./campfire-1.mp3";
import laser from "./laser.mp3";

function randomNumber(min, max) {
  // min and max included
  return Math.random() * (max - min) + min;
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight - 50,
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
app.renderer.backgroundColor = 0xffffff;

let message = new PIXI.Text("");
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
      cat.scale.x = cat.scale.y = randomNumber(0.6, 0.8);
      break;
    case 2:
      console.log(randomNumber(0.2, 0.4));
      cat = new PIXI.Sprite(app.loader.resources.f2.texture);
      cat.scale.x = cat.scale.y = randomNumber(0.2, 0.4);
      break;
    case 3:
      cat = new PIXI.Sprite(app.loader.resources.f3.texture);
      cat.scale.x = cat.scale.y = randomNumber(0.2, 0.4);
      break;
    case 4:
      cat = new PIXI.Sprite(app.loader.resources.f4.texture);
      cat.scale.x = cat.scale.y = randomNumber(0.2, 0.4);
      break;
    default:
      cat = new PIXI.Sprite(app.loader.resources.f1.texture);
      break;
  }
  cat.alpha = 0.1;
  //Add the cat to the stage
  cat.anchor.x = 0.5;
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

  var audio = new Audio(laser);
  audio.play();

  var audio2 = new Audio(sound);
  audio2.play();
}

function App() {
  const [text, setText] = useState("Some cool text");
  useEffect(() => {
    document.getElementById("canva").appendChild(app.view);
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
    <div className="App">
      <input
        type="text"
        id="mytext"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div id="canva" />
      {/* <button onClick={() => console.log("HELO")}>{"/endrage"}</button> */}
    </div>
  );
}

export default App;
