import { EventDispatcher, EventDispatcherCall } from '../EventDispatcher';
import { renderElement, arrayPopByKey, shuffle } from '../../Utils/Utils';
import DataAdapter from '../../Utils/DataAdapter';
import IWordResponse, { IUserWord } from '../../Constants/IWord';
import GameRowController from './GameRow';
import GameResourseController from './GameResource';
import { rowCount, rowNumberWidth } from '../../Constants/Constants';
import paintings from '../../Constants/Paintings';

export default class GamePanelController {
  private view: GamePanelView;
  private gameRows: GameRowController[] = [];
  private gameRowActive: GameRowController;
  private resourse: GameResourseController;
  private wordsResponse: IWordResponse[];
  private page: number;
  private rowHeight: number;
  private userWords: IUserWord[];
  private eventDispatcherCall: EventDispatcherCall;

  constructor(eventDispatcher: EventDispatcher) {
    this.view = new GamePanelView();
    this.resourse = new GameResourseController();
    this.eventDispatcherCall = eventDispatcher.call;
    eventDispatcher.subscribe.setUser(() => {
      DataAdapter.getUserWords().then((userWords: IUserWord[]) => {
        this.userWords = userWords;
        // userWords.forEach((w) => {
        //   if (!w.optional.success) DataAdapter.deleteWord(w.wordId);
        // });
        this.load();
        // window.document.gete
      });
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
  }

  private load() {
    this.page = 0;
    DataAdapter.getWords(0, this.page).then((wordsResponse: IWordResponse[]) => {
      this.calcRowHeigth();
      this.wordsResponse = shuffle(wordsResponse.filter((o) => o.textExample.split(' ').length < 10));

      const userWords = this.getUserPageWords();

      let lastWordIsSuccess = false;
      userWords.forEach((userWord: IUserWord) => {
        const wordResponse = arrayPopByKey(this.wordsResponse, 'id', userWord.wordId);
        lastWordIsSuccess = userWord.optional.success;
        this.addGameRow(wordResponse, !userWord.optional.success);
      });

      // const userWord = userWords[1];
      // userWord.optional.success = true;
      // DataAdapter.putWord(userWord.wordId, {
      //   difficulty: userWord.difficulty,
      //   optional: userWord.optional,
      // });

      if (lastWordIsSuccess) {
        this.addGameRowAndSave(this.wordsResponse[0], true);
      }

      // debugger
      // DataAdapter.postWord(this.wordsResponse[0].id, {
      //   difficulty: 'weak',
      //   optional: {
      //     page: this.page,
      //     row: 1,
      //     success: false,
      //   },
      // }).then((testRes) => {
      //   debugger;
      //   DataAdapter.getUserWords().then((tsest) => {
      //     debugger;
      //   }).catch((e) => {
      //     debugger;
      //   });
      // });
      // this.resultResize();
    }).catch((error) => {
      debugger;
    });
  }

  public show() {
    const time = this.userWords && this.gameRows.length >= this.getUserPageWords().length ? 0 : 500;
    setTimeout(() => {
      this.resize();
      this.gameRows.forEach((gr) => {
        if (gr !== this.gameRowActive) gr.renderBackgroundImageWords();
      });
    }, time);
  }

  private addGameRowAndSave(wordResponse: IWordResponse, isActiveRow: boolean) {
    const userWords = this.getUserPageWords();
    if (userWords.length !== 0 && !userWords[userWords.length - 1].optional.success) {
      const userWord = userWords[userWords.length - 1];
      userWord.optional.success = true;
      DataAdapter.putWord(userWord.wordId, {
        difficulty: userWord.difficulty,
        optional: userWord.optional,
      });
    }
    DataAdapter.postWord(wordResponse.id, {
      difficulty: 'weak',
      optional: {
        page: this.page,
        row: this.gameRows.length + 1,
        success: false,
      },
    }).then((newWord: IUserWord) => {
      this.userWords.push(newWord);
      this.addGameRow(wordResponse, isActiveRow);
      this.eventDispatcherCall.runNextWord();
    }).catch(() => {
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
      this.addGameRowAndSave(this.wordsResponse[this.gameRows.length], true);
    } else {
      // TODO Скрыть границы и показать информацию по картине
      this.view.showResult();
      this.gameRows.forEach((gr) => gr.hideBorders());
      // this.view.showInfo();
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

  private getUserPageWords() {
    return this.userWords.filter((userWord) => userWord.optional.page === this.page)
      // eslint-disable-next-line no-nested-ternary
      .sort((a, b) => (a.optional.row > b.optional.row ? 1 : b.optional.row > a.optional.row ? -1 : 0));
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
  private resultButton: HTMLButtonElement;

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
    this.resultButton = renderElement(resultButtons, 'button',
      'game__result-button result-button__result game__result-button_hide', 'Result');
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

  public showResult() {
    this.showContinue();
    this.resultButton.classList.remove('game__result-button_hide');
  }

  public hideResult() {
    this.hideContinue();
    this.resultButton.classList.add('game__result-button_hide');
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
