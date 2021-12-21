import '@pixi/math';
import '@pixi/math-extras';

import * as PIXI from 'pixi.js';

import { ECSSystem, initEcs, updateLoop } from './ecs/ecs';
import { Node } from './Features/Nodes/Node';

const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
});

initEcs(app);
console.log(app);

for (const systemPackage of Object.values(
  import.meta.globEager("./Features/**/*System.ts")
)) {
  console.log(systemPackage);
  const system = Object.values(systemPackage) as ECSSystem[];
  app.addSystem(system[0]);
}

const style = new PIXI.TextStyle({
  fontFamily: "Arial",
  fontSize: 36,
  fontStyle: "italic",
  fontWeight: "bold",
  fill: ["#ffffff", "#00ff99"], // gradient
  stroke: "#4a1850",
  strokeThickness: 5,
  dropShadow: true,
  dropShadowColor: "#000000",
  dropShadowBlur: 4,
  dropShadowAngle: Math.PI / 6,
  dropShadowDistance: 6,
  wordWrap: true,
  wordWrapWidth: 440,
  lineJoin: "round",
});

const basicText = new PIXI.Text("Click to add circle", style);
basicText.x = 10;
basicText.y = 10;

app.stage.interactive = true;
app.stage.buttonMode = true;
app.stage.hitArea = new PIXI.Rectangle(
  0,
  0,
  app.screen.width,
  app.screen.height
);
app.stage.on("pointerdown", (e: PIXI.InteractionEvent) => {
  if (e.target === app.stage) {
    console.log("clicked outside", [e.data.global.x, e.data.global.y]);
    app.stage.addChild(
      Node.create({
        x: e.data.global.x,
        y: e.data.global.y,
      })
    );
  }
});

app.stage.addChild(basicText);

document.body.appendChild(app.view);

app.ticker.maxFPS = 60;
app.ticker.add((dt) => updateLoop(app, dt));
