import { renderElement } from '../../Utils/Utils';
import { EventDispatcher } from '../EventDispatcher';
// import LogInController from './LogIn';

export default class StartController {
  private view: StartView;
  private gameShow: () => void;
  // private logIn: LogInController;

  constructor(eventDispatcher: EventDispatcher, gameShow: () => void) {
    this.view = new StartView();
    this.gameShow = gameShow;
    // this.logIn = new LogInController(eventDispatcher);
    eventDispatcher.subscribe.setUser(() => {
      this.view.show();
    });
  }

  public render(layout: Node) {
    this.view.render(layout);
    // this.logIn.render(layout);
    this.view.onClickStart(() => {
      this.view.hide();
      this.gameShow();
      // this.logIn.show();
    });
  }
}

class StartView {
  private startPage: HTMLDivElement;
  private button: HTMLButtonElement;

  public render(layout: Node) {
    this.startPage = renderElement(layout, 'div', 'start-page start-page_hide');
    renderElement(this.startPage, 'h1', 'header', 'English puzzle');
    renderElement(this.startPage, 'p', 'start-page__description', 'Click on words, collect phrases');
    renderElement(this.startPage, 'p', 'start-page__description',
      'Words can be drag and drop. Select tooltips in the menu');
    this.button = renderElement(this.startPage, 'button', 'start-page__button', 'Start');
  }

  public onClickStart(func: () => void) {
    this.button.onclick = () => { func(); };
  }

  public show() {
    this.startPage.classList.remove('start-page_hide');
  }

  public hide() {
    this.startPage.classList.add('start-page_hide');
  }
}
