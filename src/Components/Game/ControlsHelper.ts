import { renderElement } from '../../Utils/Utils';
import { EventDispatcher, EventDispatcherCall } from '../EventDispatcher';

export default class ControlsHelperController {
  private view: ControlsHelperView;
  private eventDispatcherCall: EventDispatcherCall;

  constructor(eventDispatcher: EventDispatcher) {
    this.view = new ControlsHelperView();
    this.eventDispatcherCall = eventDispatcher.call;
  }

  public render(layout: Node) {
    this.view.render(layout);
    this.view.onClickSpeak(() => {
      this.eventDispatcherCall.clickSound();
    });
    this.view.onClickTranlate(() => {
      debugger;
    });
    this.view.onClickBackground(() => {
      debugger;
    });
  }
}

class ControlsHelperView {
  private speak: HTMLSpanElement;
  private tranlate: HTMLSpanElement;
  private background: HTMLSpanElement;

  public render(layout: Node) {
    this.speak = renderElement(layout, 'span', 'button-icon button-icon-speak');
    this.tranlate = renderElement(layout, 'span', 'button-icon button-icon-tranlate');
    this.background = renderElement(layout, 'span', 'button-icon button-icon-background');
  }

  public onClickSpeak(func: () => void) {
    this.speak.onclick = () => {
      this.speak.classList.add('button-icon_active');
      func();
    };
  }

  public onClickTranlate(func: () => void) {
    this.tranlate.onclick = () => { func(); };
  }

  public onClickBackground(func: () => void) {
    this.background.onclick = () => { func(); };
  }
}
