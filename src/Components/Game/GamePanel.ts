import { EventDispatcher } from '../EventDispatcher';
import { renderElement } from '../../Utils/Utils';
import DataAdapter from '../../Utils/DataAdapter';
import IUser from '../../Constants/IUser';
import IWordResponse from '../../Constants/IWord';
import GameRowController from './GameRow';
import GameResourseController from './GameResource';

export default class GamePanelController {
  private view: GamePanelView;
  private user: IUser;
  private gameRows: GameRowController[] = [];
  private gameRowActive: GameRowController;
  private resourse: GameResourseController;

  constructor(eventDispatcher: EventDispatcher) {
    this.view = new GamePanelView();
    this.resourse = new GameResourseController();
    eventDispatcher.subscribe.setUser((user: IUser) => {
      this.user = user;
    });
    eventDispatcher.subscribe.clickSound(() => {
      this.gameRowActive.soundPlay();
    });
    eventDispatcher.subscribe.clickTranslation(() => {
      this.view.showTranslation(this.gameRowActive.getTextExampleTranslate());
    });
    eventDispatcher.subscribe.clickBackground(() => {
      this.gameRowActive.renderBackgroundImageWords();
    });
  }

  public render(layout: Node) {
    this.view.render(layout);
    this.view.onClickCheckButton(() => this.checkPossiotions());
    this.view.onClickReverseColorTextButton(() => this.gameRows.forEach((g) => g.reverseColorText()));
    this.view.onPanelResize(() => this.resultResize());
    this.resourse.render(this.view.getResoursePanel());
    this.load();
  }

  private load() {
    DataAdapter.getWords(0, 0).then((wordsResponse: IWordResponse[]) => {
      const wordResponse = wordsResponse.filter((o) => o.textExample.split(' ').length < 10)[0];
      const isActiveRow = true;
      const gameRow = new GameRowController(wordResponse, this.resourse, isActiveRow);
      gameRow.render(this.view.getGamePanel(), 1);
      if (isActiveRow) this.gameRowActive = gameRow;
      this.gameRows.push(gameRow);
    }).catch((error) => {
      debugger;
    });
  }

  private checkPossiotions() {
    this.gameRowActive.checkPosition();
  }


  private resultResize() {
    // Изменить размер всего окна результатов и ресурсов
  }
}

class GamePanelView {
  private resultPanel: HTMLDivElement;
  private resoursePanel: HTMLDivElement;
  private translation: HTMLSpanElement;
  private checkButton: HTMLButtonElement;
  private reverseColorTextButton: HTMLButtonElement;

  public render(layout: Node) {
    this.translation = renderElement(layout, 'span', 'game__result-translate');
    this.resultPanel = renderElement(layout, 'div', 'game__result-panel');
    this.resoursePanel = renderElement(layout, 'div', 'game__panel');
    const resultButtons = renderElement(layout, 'div', 'game__result-buttons');
    this.checkButton = renderElement(resultButtons, 'button', 'game__check', 'Check');
    this.reverseColorTextButton = renderElement(resultButtons, 'button', 'game__check', 'ReverseColorText');
  }

  public getGamePanel(): HTMLElement {
    return this.resultPanel;
  }

  public getResoursePanel(): HTMLElement {
    return this.resoursePanel;
  }

  public onClickCheckButton(func: () => void) {
    this.checkButton.onclick = func;
  }

  public showTranslation(translation: string) {
    this.translation.textContent = translation;
  }

  public onClickReverseColorTextButton(func: () => void) {
    this.reverseColorTextButton.onclick = func;
  }

  public onPanelResize(func: () => void) {
    let width = this.resultPanel.offsetWidth;
    window.addEventListener('resize', () => {
      if (width === this.resultPanel.offsetWidth) return;
      width = this.resultPanel.offsetWidth;
      func();
    });
  }
}
