import { Component } from '../../ecs/ecs-types';

export class HoverMenuComponent extends Component {
  constructor(
    public menuItems: {
      text: string;
      onClick: () => void;
    }[]
  ) {
    super();
  }
}
