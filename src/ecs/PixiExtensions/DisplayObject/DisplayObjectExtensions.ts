import { DisplayObject } from 'pixi.js';

import { Component } from '../../ecs-types';

type OnChangeEvent = (changedEntity: DisplayObject) => void;

declare global {
  namespace GlobalMixins {
    interface DisplayObject {
      components?: { [key: string]: Component };
      getComponent<T extends Component = Component>(key: string): T | undefined;
      addComponent<T extends Component>(component: T): void;
      removeComponent(key: string): void;
      onChanged: OnChangeEvent;
    }
  }
}

DisplayObject.prototype.getComponent = function <T extends Component>(
  key: string
) {
  return this.components?.[key] as T | undefined;
};

DisplayObject.prototype.addComponent = function <T extends Component>(
  component: T
) {
  if (!this.components) this.components = { [component._type]: component };
  else this.components[component._type] = component;

  this.onChanged(this);
};

DisplayObject.prototype.removeComponent = function (key: string) {
  if (this.components?.[key] !== undefined) {
    delete this.components?.[key];
    this.onChanged(this);
  }
};

DisplayObject.prototype.onChanged = function (ent: DisplayObject) {
  this.parent?.onChanged(ent);
};

export function init() {}
