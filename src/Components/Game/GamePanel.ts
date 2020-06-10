import { EventDispatcher } from '../EventDispatcher';
import { renderElement } from '../../Utils/Utils';
import DataAdapter from '../../Utils/DataAdapter';
import IUser from '../../Constants/IUser';
import IWordResponse from '../../Constants/IWord';
import GameRowController from './GameRow';
import GameResourseController from './GameResource';
import { rowCount, rowNumberWidth } from '../../Constants/Constants';
import paintings from '../../Constants/Paintings';

export default class GamePanelController {
  private view: GamePanelView;
  private user: IUser;
  private gameRows: GameRowController[] = [];
  private gameRowActive: GameRowController;
  private resourse: GameResourseController;
  private wordsResponse: IWordResponse[];
  private page: number;
  private rowHeight: number;

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
      this.gameRows.forEach((g) => g.renderBackgroundImageWords());
    });
  }

  public render(layout: Node) {
    this.view.render(layout);
    this.view.onClickSurrenderButton(() => this.surrender());
    this.view.onClickCheckButton(() => this.checkPossiotions());
    this.view.onClickContinueButton(() => this.success());
    this.view.onClickReverseColorTextButton(() => this.gameRows.forEach((g) => g.reverseColorText()));
    this.view.onPanelResize(() => this.resize());
    this.resourse.render(this.view.getResoursePanel());
    this.load();
  }

  private load() {
    this.page = 0;
    DataAdapter.getWords(0, this.page).then((wordsResponse: IWordResponse[]) => {
      this.calcRowHeigth();
      this.wordsResponse = wordsResponse.filter((o) => o.textExample.split(' ').length < 10);
      const isActiveRow = true;
      this.addGameRow(this.wordsResponse[0], isActiveRow);
      // this.resultResize();
    }).catch((error) => {
      debugger;
    });
  }

  private addGameRow(wordResponse: IWordResponse, isActiveRow: boolean) {
    const gameRow = new GameRowController(wordResponse, this.resourse, isActiveRow);
    gameRow.render(this.view.getGamePanel(), this.gameRows.length + 1, this.rowHeight);
    if (isActiveRow) this.gameRowActive = gameRow;
    this.gameRows.push(gameRow);
  }


  private checkPossiotions() {
    const isCorrect = this.gameRowActive.checkPosition();
    if (!isCorrect) return;

    this.view.showContinue();
  }

  private surrender() {
    this.gameRowActive.surrender();
    this.view.showContinue();
  }

  private success() {
    this.view.hideContinue();
    this.gameRowActive.deactivate();
    this.gameRowActive = undefined;
    if (this.gameRows.length !== rowCount) {
      this.addGameRow(this.wordsResponse[this.gameRows.length], true);
    } else {
      // Скрыть границы и показать информацию по картине
    }
  }


  private resize() {
    // const painting = paintings[this.page];
    // const resultPanelHeight = (painting.height / painting.width) * this.view.getWidthtGamePanel();
    // this.rowHeight = resultPanelHeight / (rowCount + 1);
    this.calcRowHeigth();
    this.gameRows.forEach((g) => g.changeHeight(this.rowHeight));
    // Изменить размер всего окна результатов и ресурсов
  }

  private calcRowHeigth() {
    const painting = paintings[this.page];
    const resultPanelHeight = (painting.height / painting.width) * (this.view.getWidthtGamePanel() - rowNumberWidth);
    this.rowHeight = resultPanelHeight / (rowCount + 1);
  }
}

class GamePanelView {
  private resultPanel: HTMLDivElement;
  private resoursePanel: HTMLDivElement;
  private translation: HTMLSpanElement;
  private surrenderButton: HTMLButtonElement;
  private checkButton: HTMLButtonElement;
  private сontinueButton: HTMLButtonElement;
  private reverseColorTextButton: HTMLButtonElement;

  public render(layout: Node) {
    this.translation = renderElement(layout, 'span', 'game__result-translate');
    this.resultPanel = renderElement(layout, 'div', 'game__result-panel');
    this.resoursePanel = renderElement(layout, 'div', 'game__panel');
    const resultButtons = renderElement(layout, 'div', 'game__result-buttons');
    this.surrenderButton = renderElement(resultButtons, 'button',
      'game__result-button result-button__surrender', 'I don\'t know');
    this.сontinueButton = renderElement(resultButtons, 'button',
      'game__result-button result-button__сontinue game__result-button_hide', 'Continue');
    this.checkButton = renderElement(resultButtons, 'button',
      'game__result-button result-button__check', 'Check');
    this.reverseColorTextButton = renderElement(resultButtons, 'button',
      'game__result-button result-button__helper', 'Reverse color text');
  }

  public getGamePanel(): HTMLElement {
    return this.resultPanel;
  }

  public getResoursePanel(): HTMLElement {
    return this.resoursePanel;
  }

  public onClickSurrenderButton(func: () => void) {
    this.surrenderButton.onclick = func;
  }

  public onClickCheckButton(func: () => void) {
    this.checkButton.onclick = func;
  }

  public onClickContinueButton(func: () => void) {
    this.сontinueButton.onclick = func;
  }

  public showTranslation(translation: string) {
    this.translation.textContent = translation;
  }

  public showContinue() {
    this.surrenderButton.classList.add('game__result-button_hide');
    this.checkButton.classList.add('game__result-button_hide');
    this.сontinueButton.classList.remove('game__result-button_hide');
  }

  public hideContinue() {
    this.surrenderButton.classList.remove('game__result-button_hide');
    this.checkButton.classList.remove('game__result-button_hide');
    this.сontinueButton.classList.add('game__result-button_hide');
  }

  public onClickReverseColorTextButton(func: () => void) {
    this.reverseColorTextButton.onclick = func;
  }

  public getWidthtGamePanel(): number {
    return this.resultPanel.offsetWidth;
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
