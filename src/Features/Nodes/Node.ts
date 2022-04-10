import { Circle, Container, Graphics, InteractionEvent } from 'pixi.js';

import { HoverableComponent } from '../Hoverable/HoverableComponent';
import { HoverMenuComponent } from '../HoverMenu/HoverMenuComponent';
import { PushAwayComponent } from '../PushAway/PushAwayComponent';

export const Node = {
  create(args?: { x?: number; y?: number; radius?: number }) {
    const radius = args?.radius ?? 10;

    const node = new Container();
    node.addComponent(new PushAwayComponent());
    node.addComponent(new HoverableComponent());
    node.addComponent(
      new HoverMenuComponent([
        { text: "Add note", onClick: () => console.log("Clicked A") },
      ])
    );

    const circle = new Graphics();
    circle.beginFill(0xffffff * Math.random());
    circle.drawCircle(0, 0, radius);
    circle.interactive = true;
    circle.buttonMode = true;
    circle.on("pointerdown", (e: InteractionEvent) => {
      console.log("Clicked on ", {
        x: e.currentTarget.worldTransform.tx.toFixed(0),
        y: e.currentTarget.worldTransform.ty.toFixed(0),
        node,
      });
    });

    const hoverEnt = new Container();
    hoverEnt.hitArea = new Circle(0, 0, radius * 3);
    hoverEnt.interactive = true;

    node.interactiveChildren = true;
    node.addChild(hoverEnt);
    node.addChild(circle);

    node.position.set(args?.x ?? radius, args?.y ?? radius);

    node.interactive = true;

    return node;
  },
};
