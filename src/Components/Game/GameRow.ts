import { renderElement } from '../../Utils/Utils';
import IWordResponse from '../../Constants/IWord';
import { fileResource, rowCount } from '../../Constants/Constants';
import GameResourseController from './GameResource';
import IWordGame from './IWordGame';
import GameStorage from './GameStorage';

export default class GameRowController {
  private view: GameRowView;
  private wordResponse: IWordResponse;
  private words: IWordGame[];
  // private isVisibleBackgroundImage: boolean;
  private isActiveRow: boolean;
  private resource: GameResourseController;
  // private positionY: string;
  rowHeight: number;
  row: number;

  constructor(wordResponse: IWordResponse, resource: GameResourseController, isActiveRow: boolean = false) {
    this.view = new GameRowView();
    this.resource = resource;
    this.wordResponse = wordResponse;
    this.isActiveRow = isActiveRow;

    const text = wordResponse.textExample.replace('<b>', '').replace('</b>', '');
    const textLength = text.replace(/ /g, '').length;
    this.words = text.split(' ')
      .map((word: string, index: number) => ({ text: word, index, width: word.length / textLength } as IWordGame));
  }

  public render(resultPanel: HTMLElement, row: number, rowHeight: number) {
    // this.positionY = `${(row - 1) * (100 / rowCount)}%`;
    this.row = row;
    this.rowHeight = rowHeight;
    // this.positionY = `-${row * rowHeight}px`;
    this.view.render(resultPanel, row, rowHeight);
    this.view.onResultResize(() => this.resultResize());
    if (this.isActiveRow) {
      this.view.addEvents();
      this.view.addSound(fileResource + this.wordResponse.audioExample);
      this.resource.renderWords(this.words);
    } else {
      // this.view.addWords(this.words);
    }
  }

  public reverseColorText() {
    GameRowView.reverseColorText(this.getWordElements());
  }

  public checkPosition() {
    return this.view.checkPosition(this.words.map((o) => o.text));
  }

  public surrender() {
    this.view.setSuccessPosition(this.getWordElements());
  }

  public getTextExampleTranslate(): string {
    return this.wordResponse.textExampleTranslate;
  }

  public renderBackgroundImageWords() {
    // this.isVisibleBackgroundImage = true;
    this.words.reduce((accumulator, word: IWordGame) => {
      this.view.addBackgroundImageWord(word, accumulator, this.getPostitionY());
      return accumulator + word.width;
    }, 0);
  }

  public soundPlay() {
    this.view.soundPlay();
  }

  public deactivate() {
    this.isActiveRow = false;
    this.renderBackgroundImageWords();
    this.view.removeEvents();
  }

  public changeHeight(rowHeight: number) {
    this.rowHeight = rowHeight;
    this.view.changeHeight(this.getWordElements(), rowHeight, this.getPostitionY());
  }

  private getPostitionY(): string {
    return `-${this.row * this.rowHeight}px`;
  }

  private getWordElements(): HTMLElement[] {
    return this.words.map((word: IWordGame) => word.element);
  }

  private resultResize() {
    // if (!this.isVisibleBackgroundImage) return;
    // обновить размер игровой панели
    // вызвать обновление у строк
    // this.words.reduce((accumulator, word: IWordGame) => {
    //   this.view.resizeBackgroundImageWord(word, accumulator);
    //   return accumulator + word.width;
    // }, 0);
  }
}

class GameRowView {
  public resultPanel: HTMLElement;
  public resultLayout: HTMLElement;
  private speaker: HTMLAudioElement;
  private resultRow: HTMLDivElement;

  public render(resultPanel: HTMLElement, row: number, rowHeight: number) {
    this.resultPanel = resultPanel;
    this.resultRow = renderElement(resultPanel, 'div', 'game__panel game__panel-row');
    this.resultRow.style.height = `${rowHeight}px`;
    renderElement(this.resultRow, 'div', 'game__row', row.toString());
    this.resultLayout = renderElement(this.resultRow, 'div', 'game__result-layuot');
  }

  public addEvents() {
    this.resultLayout.onmousedown = (e) => {
      GameStorage.setWord(e.target as HTMLElement);
    };
    this.resultLayout.onmouseup = (e) => {
      const source = GameStorage.getWord();
      if (!source) return;
      const current = e.target as HTMLElement;
      if (current === this.resultLayout) {
        this.resultLayout.append(source);
      } else {
        this.resultLayout.insertBefore(source, current);
      }
    };
  }

  public removeEvents() {
    this.resultLayout.onmousedown = undefined;
    this.resultLayout.onmouseup = undefined;
  }


  public static reverseColorText(wordElements: HTMLElement[]) {
    if (wordElements[0].classList.contains('game__word_color-reverse')) {
      wordElements.forEach((o) => o.classList.remove('game__word_color-reverse'));
    } else {
      wordElements.forEach((o) => o.classList.add('game__word_color-reverse'));
    }
  }

  public addBackgroundImageWord(word: IWordGame, startPosition: number, positionY: string) {
    word.element.classList.add('puzzle');
    word.element.style.backgroundPositionX = `-${startPosition * this.resultLayout.clientWidth}px`;
    word.element.style.backgroundSize = `${this.resultLayout.clientWidth}px auto`;
    // word.element.style.backgroundSize = `${this.resultRow.clientWidth}px auto`;
    word.element.style.backgroundPositionY = positionY;
    // word.element.style.backgroundImage
  }

  public resizeBackgroundImageWord(word: IWordGame, startPosition: number, positionY: string) {
    word.element.style.backgroundPositionX = `-${startPosition * this.resultLayout.clientWidth}px`;
    word.element.style.backgroundSize = `${this.resultLayout.clientWidth}px auto`;
    // word.element.style.backgroundSize = `${this.resultRow.clientWidth}px auto`;
    word.element.style.backgroundPositionY = positionY;
    // word.element.style.backgroundImage
  }

  public checkPosition(words: string[]) {
    let isCorrect = !!this.resultLayout.childNodes.length;
    this.resultLayout.childNodes.forEach((value: HTMLElement, index: number) => {
      value.classList.remove('puzzle');
      value.style.backgroundImage = undefined;
      value.classList.remove('game__word_true', 'game__word_false');
      if (value.textContent === words[index]) {
        value.classList.add('game__word_true');
      } else {
        value.classList.add('game__word_false');
        isCorrect = false;
      }
    });
    return isCorrect;
  }

  public setSuccessPosition(words: HTMLElement[]) {
    words.forEach((word) => this.resultLayout.append(word));
  }

  public addSound(soundUrl: string) {
    this.speaker = renderElement(this.resultPanel, 'audio', 'game__speaker');
    this.speaker.src = soundUrl;
  }

  public soundPlay() {
    this.speaker.play();
  }

  public changeHeight(wordElements: HTMLElement[], rowHeight: number, positionY: string) {
    this.resultRow.style.height = `${rowHeight}px`;
    wordElements.forEach((wordElement) => {
      wordElement.style.backgroundPositionY = positionY;
    });
  }

  public onResultResize(func: () => void) {
    let width = this.resultLayout.offsetWidth;
    window.addEventListener('resize', () => {
      if (width === this.resultLayout.offsetWidth) return;
      width = this.resultLayout.offsetWidth;
      func();
    });
  }
}
