import { ReactiveSystem } from '../../ecs/ecs-types';
import { HoverableComponent } from './HoverableComponent';

export const HoverableSystem: ReactiveSystem = {
  query: (ent) => !!ent.getComponent(HoverableComponent),
  onAdded: (ent) => {
    ent.on("pointerover", () => {
      const comp = ent.getComponent(HoverableComponent)!;
      comp.isHovered = true;
      ent.addComponent(comp);
    });

    ent.on("pointerout", () => {
      const comp = ent.getComponent<HoverableComponent>(HoverableComponent)!;
      comp.isHovered = false;
      ent.addComponent(comp);
    });
  },
  onRemoved: (ent) => {
    ent.removeAllListeners("pointerover").removeAllListeners("pointerout");
  },
};
