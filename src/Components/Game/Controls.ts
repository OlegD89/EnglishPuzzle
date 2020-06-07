import { renderElement } from '../../Utils/Utils';
import { EventDispatcher } from '../EventDispatcher';
import ControlsLevelController from './ControlsLevel';
import ControlsHelperController from './ControlsHelper';

export default class ControlsController {
  private view: ControlsView;
  private level: ControlsLevelController;
  private helper: any;

  constructor(eventDispatcher: EventDispatcher) {
    this.view = new ControlsView();
    this.level = new ControlsLevelController(eventDispatcher);
    this.helper = new ControlsHelperController(eventDispatcher);
  }

  public render(layout: Node) {
    this.view.render(layout);
    this.level.render(this.view.levelPanel);
    this.helper.render(this.view.helperPanel);
  }
}

class ControlsView {
  public levelPanel: Node;
  public helperPanel: Node;

  public render(layout: Node) {
    const controlsPanel = renderElement(layout, 'div', 'controls-panel');
    this.levelPanel = renderElement(controlsPanel, 'div', 'level-panel');
    this.helperPanel = renderElement(controlsPanel, 'div', 'helper-panel');
  }
}
