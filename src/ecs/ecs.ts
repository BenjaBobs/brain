import './PixiExtensions/DisplayObject/DisplayObjectExtensions';

import { Application, Container, DisplayObject } from 'pixi.js';

import { initApp } from './PixiExtensions/Application/ApplicationExtensions';

export function initEcs(app: Application) {
  initApp(app);
  listenForChanges(app.stage);
  app.stage.onChanged = (ent) => {
    const queryCaches = Object.values(app.ecs!.queries.symbolMap).map(
      (sym) => app.ecs!.queries.caches[sym]
    );

    const allTouched: DisplayObject[] = [ent];
    let upwards = ent.parent;
    while (upwards) {
      allTouched.unshift(upwards);
      upwards = upwards.parent;
    }
    getRecursiveChildren(ent, allTouched);

    for (const touchedEntity of allTouched) {
      for (const queryCache of queryCaches) {
        const isMember = queryCache.query(touchedEntity);
        const wasMember = queryCache.cache.includes(touchedEntity) ?? false;

        if (isMember !== wasMember) {
          if (isMember && !wasMember) {
            for (const system of queryCache.reactiveSystems) {
              system.onAdded?.(touchedEntity);
            }
          } else if (!isMember && wasMember) {
            for (const system of queryCache.reactiveSystems) {
              system.onRemoved?.(touchedEntity);
            }
          }

          if (isMember) {
            queryCache.cache.push(touchedEntity);
          } else {
            queryCache.cache.splice(queryCache.cache.indexOf(touchedEntity), 1);
          }
        }
      }
    }
  };
}

function listenForChanges(entity: DisplayObject) {
  const prev = (entity as any).onChildrenChange as (length: number) => void;
  const patched = function (length: number) {
    prev(length);
    entity.onChanged(entity);
  };

  (entity as any).onChildrenChange = patched;
}

export interface Component {
  _type: string;
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

export type EntityQuery = (entity: DisplayObject) => boolean;

export function updateLoop(app: Application, deltaTime: number) {
  for (const system of app.ecs?.systems.update ?? []) {
    const symbol = (system as unknown as ECSSystemCached).querySymbol;

    const queryCache = app.ecs!.queries.caches[symbol];

    if (queryCache.cache.length) {
      system.update(queryCache.cache, deltaTime);
    }
  }
}

function getRecursiveChildren(ent: DisplayObject, collector: DisplayObject[]) {
  const cont = ent as Container;

  if (cont.children?.length) {
    for (const child of cont.children) {
      collector.push(child);
      getRecursiveChildren(child, collector);
    }
  }
}
