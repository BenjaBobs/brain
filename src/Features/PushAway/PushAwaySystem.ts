import { ReactiveSystem, UpdateSystem } from '../../ecs/ecs-types';
import { PushAwayComponent } from './PushAwayComponent';

export const PushAwaySystem: UpdateSystem & ReactiveSystem = {
  query: (ent) => !!ent.getComponent(PushAwayComponent._type),
  onAdded: (ent) => console.log("PushAway added", ent.transform._worldID),
  onRemoved: (ent) => console.log("PushAway removed", ent.transform._worldID),
  update: (entities, deltaTime) => {
    for (const entA of entities) {
      for (const entB of entities) {
        if (entA === entB) continue;

        const direction = entA.position.subtract(entB.position);
        let mag = direction.magnitude();
        if (mag < 100) {
          if (mag === 0) {
            mag = 1;
            direction.x += Math.random();
            direction.y += Math.random();
          }

          const factor = 1 / mag;

          entA.x += direction.x * factor * deltaTime;
          entA.y += direction.y * factor * deltaTime;
        }
      }
    }
  },
};
