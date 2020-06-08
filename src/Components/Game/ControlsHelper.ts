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
    this.view.onClickTranslation(() => {
      this.eventDispatcherCall.clickTranslation();
    });
    this.view.onClickBackground(() => {
      this.eventDispatcherCall.clickBackground();
    });
  }
}

class ControlsHelperView {
  private speak: HTMLSpanElement;
  private translation: HTMLSpanElement;
  private background: HTMLSpanElement;

  public render(layout: Node) {
    this.speak = renderElement(layout, 'span', 'button-icon button-icon-speak');
    this.translation = renderElement(layout, 'span', 'button-icon button-icon-tranlate');
    this.background = renderElement(layout, 'span', 'button-icon button-icon-background');
    this.speak.title = 'Speaking the text';
    this.translation.title = 'Show translation';
    this.background.title = 'Show background image';
  }

  public onClickSpeak(func: () => void) {
    this.speak.onclick = () => {
      this.speak.classList.add('button-icon_active');
      func();
    };
  }

  public onClickTranslation(func: () => void) {
    this.translation.onclick = () => {
      this.translation.classList.add('button-icon_active');
      func();
    };
  }

  public onClickBackground(func: () => void) {
    this.background.onclick = () => {
      this.background.classList.add('button-icon_active');
      func();
    };
  }
}
