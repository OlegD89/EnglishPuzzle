import { renderElement } from '../../Utils/Utils';
import { EventDispatcher } from '../EventDispatcher';

export default class ControlsLevelController {
  private view: ControlsLevelView;

  constructor(eventDispatcher: EventDispatcher) {
    this.view = new ControlsLevelView();
  }

  public render(layout: Node) {
    this.view.renderLevel(layout, ['1', '2', '3'], '1');
    this.view.renderPage(layout, ['1', '2', '3'], '1');
    this.view.onChangeLevel((index: number) => {
      debugger;
    });
    this.view.onChangePage((index: number) => {
      debugger;
    });
  }
}

class ControlsLevelView {
  private selectLevel: HTMLSelectElement;
  private selectPage: HTMLSelectElement;

  public renderLevel(layout: Node, values: string[], valueChecked: string) {
    const selectLevelDesc = renderElement(layout, 'label', 'droplist-label', 'Level');
    this.selectLevel = renderElement(selectLevelDesc, 'select', 'droplist droplist-level');
    values.forEach((value) => {
      const element = renderElement(this.selectLevel, 'option', undefined, value);
      if (value === valueChecked) element.selected = true;
    });
  }

  public renderPage(layout: Node, values: string[], valueChecked: string) {
    const selectPageDesc = renderElement(layout, 'label', 'droplist-label', 'Page');
    this.selectPage = renderElement(selectPageDesc, 'select', 'droplist droplist-page');
    values.forEach((value) => {
      const element = renderElement(this.selectPage, 'option', undefined, value);
      if (value === valueChecked) element.selected = true;
    });
  }

  public onChangeLevel(func: (value: number) => void) {
    this.selectLevel.onchange = () => {
      func(this.selectLevel.selectedIndex);
    };
  }

  public onChangePage(func: (value: number) => void) {
    this.selectLevel.onchange = () => {
      func(this.selectLevel.selectedIndex);
    };
  }
}
