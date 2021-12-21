import { Application, DisplayObject } from 'pixi.js';

import { ECSSystem, ECSSystemCached, EntityQuery, ReactiveSystem, UpdateSystem } from '../../ecs';

type EcsData = {
  queries: {
    symbolMap: { [key: string]: symbol };
    caches: {
      [key: symbol]: {
        query: EntityQuery;
        cache: DisplayObject[];
        reactiveSystems: ReactiveSystem[];
      };
    };
  };
  systems: {
    update: UpdateSystem[];
    reactive: ReactiveSystem[];
    all: ECSSystemCached[];
  };
};

declare global {
  namespace GlobalMixins {
    interface Application {
      addSystem(system: ECSSystem): void;
      ecs?: EcsData;
    }
  }
}

export function initApp(app: Application) {
  if (!app.ecs)
    app.ecs = {
      queries: {
        symbolMap: {},
        caches: {},
      },
      systems: {
        update: [],
        reactive: [],
        all: [],
      },
    };
}

Application.prototype.addSystem = function (system: ECSSystem) {
  if (!this.ecs) throw new Error("remember to init");
  if (
    !system.query ||
    (!(system as UpdateSystem).update &&
      !(
        (system as ReactiveSystem).onAdded ||
        (system as ReactiveSystem).onRemoved
      ))
  )
    return;

  // create a symbol for the query, if this is the first time we encounter it
  const stringedQuery = system.query.toString();
  const symbol = this.ecs.queries.symbolMap[stringedQuery] ?? Symbol();
  if (!this.ecs.queries.symbolMap[stringedQuery]) {
    this.ecs.queries.symbolMap[stringedQuery] = symbol;
  }
  (system as ECSSystemCached).querySymbol = symbol;

  // start a cache for the query if it's new
  if (!this.ecs.queries.caches[symbol]) {
    this.ecs.queries.caches[symbol] = {
      query: system.query,
      cache: [],
      reactiveSystems: [],
    };
  }

  this.ecs.systems.all.push(system as ECSSystemCached);

  // if system is reactive, add it to reactive list
  const reactive = system as ReactiveSystem;
  if (reactive.onAdded || reactive.onRemoved) {
    this.ecs.systems.reactive.push(reactive);
    this.ecs.queries.caches[symbol].reactiveSystems.push(reactive);
  }

  // if system is update, add it to update list
  const update = system as UpdateSystem;
  if (update.update !== undefined) this.ecs.systems.update.push(update);
};
