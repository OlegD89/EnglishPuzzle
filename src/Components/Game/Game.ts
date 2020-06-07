import { EventDispatcher } from '../EventDispatcher';
import { renderElement } from '../../Utils/Utils';
import IUser from '../../Constants/IUser';
import ControlsController from './Controls';
import GamePanelController from './GamePanel';

export default class GameController {
  private view: GameView;
  private user: IUser;
  private controls: ControlsController;
  private gamePanel: GamePanelController;

  constructor(eventDispatcher: EventDispatcher) {
    this.view = new GameView();
    this.controls = new ControlsController(eventDispatcher);
    this.gamePanel = new GamePanelController(eventDispatcher);
    eventDispatcher.subscribe.setUser((user: IUser) => {
      this.user = user;
      this.view.show();
    });
  }

  public render(layout: Node) {
    this.view.render(layout);
    this.controls.render(this.view.gameLayout);
    this.gamePanel.render(this.view.gameLayout);
  }
}

class GameView {
  public gameLayout: HTMLDivElement;

  public render(layout: Node) {
    this.gameLayout = renderElement(layout, 'div', 'game-layout');
  }

  public show() {
    this.gameLayout.classList.remove('game_hide');
  }

  public hide() {
    this.gameLayout.classList.add('game_hide');
  }
}
