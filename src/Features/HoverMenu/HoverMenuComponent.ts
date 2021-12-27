import { Component } from '../../ecs/ecs-types';

export type HoverMenuComponent = Component & {
  _type: "HoverMenuComponent";
  active: boolean;
  menuItems: string[];
};

export const HoverMenuComponentType = "HoverMenuComponent";
