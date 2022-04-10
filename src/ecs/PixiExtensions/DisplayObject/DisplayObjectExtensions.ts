import { DisplayObject } from 'pixi.js';

import { Component } from '../../ecs-types';
import { CTOR } from '../../utils';

type OnChangeEvent = (changedEntity: DisplayObject) => void;

declare global {
  namespace GlobalMixins {
    interface DisplayObject {
      components?: { [key: string]: Component };
      getComponent<T extends Component = Component>(
        type: CTOR<T>
      ): T | undefined;
      addComponent<T extends Component>(component: T): void;
      removeComponent<T extends Component>(type: CTOR<T>): void;
      onChanged: OnChangeEvent;
    }
  }
}

DisplayObject.prototype.getComponent = function <T extends Component>(
  type: CTOR<T>
) {
  return this.components?.[type.name] as T | undefined;
};

DisplayObject.prototype.addComponent = function <T extends Component>(
  component: T
) {
  if (!this.components) this.components = { [component.typename]: component };
  else this.components[component.typename] = component;

  this.onChanged(this);
};

DisplayObject.prototype.removeComponent = function <T extends Component>(
  type: CTOR<T>
) {
  if (this.components?.[type.name] !== undefined) {
    delete this.components?.[type.name];
    this.onChanged(this);
  }
};

DisplayObject.prototype.onChanged = function (ent: DisplayObject) {
  this.parent?.onChanged(ent);
};

export function init() {}
