import { DisplayObject } from 'pixi.js';

export abstract class Component {
  get typename(): string {
    return (this as any).__proto__.constructor.name;
  }
}

export interface ECSSystem {
  query: EntityQuery;
}

export interface ReactiveSystem extends ECSSystem {
  onAdded?: (entity: DisplayObject) => void;
  onRemoved?: (entity: DisplayObject) => void;
}

export interface UpdateSystem extends ECSSystem {
  update: (entities: DisplayObject[], deltaTime: number) => void;
}

export interface ECSSystemCached extends ECSSystem {
  querySymbol: symbol;
}

export type EntityQuery = (entity: DisplayObject) => boolean | undefined;
