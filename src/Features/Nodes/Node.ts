import { Graphics, InteractionEvent } from 'pixi.js';

import { PushAwayComponent } from '../PushAway/PushAwayComponent';

export const Node = {
  create(args?: { x?: number; y?: number; radius?: number }) {
    const circle = new Graphics();

    circle.addComponent(PushAwayComponent);
    circle.beginFill(0xffffff * Math.random());
    circle.drawCircle(args?.x ?? 0, args?.y ?? 0, args?.radius ?? 20);
    circle.pivot.set(10, 10);
    circle.interactive = true;
    circle.buttonMode = true;
    circle.on("pointerdown", (e: InteractionEvent) => {
      console.log("Clicked on ", e.target);
    });

    return circle;
  },
};
