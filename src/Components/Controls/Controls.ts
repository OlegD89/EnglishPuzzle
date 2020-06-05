import { renderElement } from '../../Utils/Utils';
import { ISettingsParams } from '../Settings';
import { EventDispatcher } from '../EventDispatcher';

export default class ControlsController {
  private view: ControlsView;

  constructor(eventDispatcher: EventDispatcher) {
    this.view = new ControlsView();
  }

  public render(layout: Node, params: ISettingsParams) {
    this.view.render(layout);
  }
}

class ControlsView {
  public settingsPanel: Node;
  public searchPanel: Node;

  public render(layout: Node) {
    const controlsPanel = renderElement(layout, 'div', 'controls-panel');
    this.settingsPanel = renderElement(controlsPanel, 'div', 'settings-panel');
    this.searchPanel = renderElement(controlsPanel, 'div', 'search-panel');
  }
}
