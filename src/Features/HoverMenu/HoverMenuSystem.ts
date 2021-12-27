import { Container, Text, TextStyle } from 'pixi.js';

import { Component, ReactiveSystem } from '../../ecs/ecs-types';
import { HoverMenuComponent, HoverMenuComponentType } from './HoverMenuComponent';

const _menuItem: Component = {
  _type: "_menuItem",
};

export const HoverMenuSystem: ReactiveSystem = {
  query: (ent) =>
    ent.getComponent<HoverMenuComponent>(HoverMenuComponentType)?.active ??
    false,
  onAdded: (ent) => {
    const comp = ent.getComponent<HoverMenuComponent>(HoverMenuComponentType)!;
    if ((ent as Container).addChild) {
      const cont = ent as Container;
      let idx = 0;
      for (const item of comp.menuItems) {
        const textItem = text(item);
        textItem.addComponent(_menuItem);
        textItem.transform.position.x += 20;
        textItem.transform.position.y +=
          (textItem.style.fontSize as number) * ++idx + -70;

        cont.addChild(textItem);
      }
    }
  },
  onRemoved: (ent) => {
    const cont = ent as Container;

    const menuItems = cont.children.filter((c) =>
      c.getComponent(_menuItem._type)
    );
    cont.removeChild(...menuItems);
  },
};

function text(text: string) {
  const style = new TextStyle({
    fontFamily: "Arial",
    fontSize: 12,
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

  return new Text(text, style);
}
