import { renderElement } from '../../Utils/Utils';
import { EventDispatcher, EventDispatcherCall } from '../EventDispatcher';
// import LogInController from './LogIn';

export default class StartController {
  private view: StartView;
  private gameShow: (isShow: boolean) => void;
  private eventDispatcherCall: EventDispatcherCall;

  constructor(eventDispatcher: EventDispatcher, gameShow: (isShow: boolean) => void) {
    this.view = new StartView();
    this.gameShow = gameShow;
    this.eventDispatcherCall = eventDispatcher.call;
    eventDispatcher.subscribe.setUser((user) => {
      if (user.userId) {
        this.view.show();
      } else {
        this.view.hide();
        this.gameShow(false);
      }
    });
  }

  public render(layout: Node) {
    this.view.render(layout);
    this.view.onClickStart(() => {
      this.view.hide();
      this.gameShow(true);
    });
    this.view.onClickLogOut(() => this.eventDispatcherCall.setUser({
      message: undefined,
      token: undefined,
      userId: undefined,
    }));
  }
}

class StartView {
  private startPage: HTMLDivElement;
  private button: HTMLButtonElement;
  private logOut: HTMLButtonElement;

  public render(layout: Node) {
    this.startPage = renderElement(layout, 'div', 'start-page start-page_hide');
    renderElement(this.startPage, 'h1', 'header', 'English puzzle');
    renderElement(this.startPage, 'p', 'start-page__description', 'Click on words, collect phrases');
    renderElement(this.startPage, 'p', 'start-page__description',
      'Words can be drag and drop. Select tooltips in the menu');
    this.button = renderElement(this.startPage, 'button', 'start-page__button', 'Start');
    this.logOut = renderElement(this.startPage, 'button', 'start-page__button start-page__logOut', 'LogOut');
  }

  public onClickStart(func: () => void) {
    this.button.onclick = () => { func(); };
  }

  public onClickLogOut(func: () => void) {
    this.logOut.onclick = () => { func(); };
  }

  public show() {
    this.startPage.classList.remove('start-page_hide');
  }

  public hide() {
    this.startPage.classList.add('start-page_hide');
  }
}
