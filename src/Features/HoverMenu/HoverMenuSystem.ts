import { Container, Text, TextStyle } from 'pixi.js';

import { Component, ReactiveSystem } from '../../ecs/ecs-types';
import { HoverableComponent } from '../Hoverable/HoverableComponent';
import { HoverMenuComponent } from './HoverMenuComponent';

class MenuItem extends Component {}

export const HoverMenuSystem: ReactiveSystem = {
  query: (ent) => {
    const menu = ent.getComponent(HoverMenuComponent);
    const hover = ent.getComponent(HoverableComponent);

    return !!menu && hover?.isHovered;
  },
  onAdded: (ent) => {
    const container = ent as Container;
    const hoverMenu = ent.getComponent(HoverMenuComponent)!;

    if (container.addChild) {
      let idx = 0;
      for (const menuItem of hoverMenu.menuItems) {
        const menuItemEntity = text(menuItem.text);
        menuItemEntity.addComponent(new MenuItem());
        menuItemEntity.interactive = true;
        menuItemEntity.on("pointerdown", menuItem.onClick);
        menuItemEntity.transform.position.x += 20;
        menuItemEntity.transform.position.y +=
          (menuItemEntity.style.fontSize as number) * ++idx -
          hoverMenu.menuItems.length *
            (menuItemEntity.style.fontSize as number);

        container.addChild(menuItemEntity);
      }
    }
  },
  onRemoved: (ent) => {
    const cont = ent as Container;

    const menuItems = cont.children.filter((c) => c.getComponent(MenuItem));
    cont.removeChild(...menuItems);
    for (const menuItem of menuItems) {
      menuItem.destroy();
    }
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
