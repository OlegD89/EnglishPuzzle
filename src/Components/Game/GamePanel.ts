import { EventDispatcher } from '../EventDispatcher';
import { renderElement, shuffle } from '../../Utils/Utils';
import ControlsController from './Controls';
import DataAdapter from '../../Utils/DataAdapter';
import IUser from '../../Constants/IUser';
import IWordResponse from '../../Constants/IWord';
import { fileResource } from '../../Constants/Constants';

interface IWordGame {
  text: string,
  width: number,
  index: number,
  element: HTMLElement,
}

export default class GamePanelController {
  private view: GamePanelView;
  private controls: ControlsController;
  private user: IUser;
  private words: IWordGame[];
  private wordResponse: IWordResponse;

  constructor(eventDispatcher: EventDispatcher) {
    this.view = new GamePanelView();
    eventDispatcher.subscribe.setUser((user: IUser) => {
      this.user = user;
    });
    eventDispatcher.subscribe.clickSound(() => {
      this.view.soundPlay();
    });
    eventDispatcher.subscribe.clickTranslation(() => {
      this.view.showTranslation(this.wordResponse.textExampleTranslate);
    });
    eventDispatcher.subscribe.clickBackground(() => {
      this.renderBackgroundImageWords();
    });
  }

  public render(layout: Node) {
    this.view.render(layout);
    this.view.onClickCheckButton(() => this.checkPossiotions());
    this.load();
  }

  private load() {
    DataAdapter.getWords(0, 0).then((wordsResponse: IWordResponse[]) => {
      // eslint-disable-next-line prefer-destructuring
      this.wordResponse = wordsResponse.filter((o) => o.textExample.split(' ').length < 10)[0];
      const text = this.wordResponse.textExample.replace('<b>', '').replace('</b>', '');
      const textLength = text.replace(/ /g, '').length;
      this.words = text.split(' ')
        .map((word: string, index: number) => ({ text: word, index, width: word.length / textLength } as IWordGame));
      const wordsShuffle = shuffle(this.words);
      this.renderWords(wordsShuffle);
      this.view.addSound(fileResource + this.wordResponse.audioExample);
      this.view.onClickReverseColorTextButton(() => this.words.map((o) => o.element));
    }).catch((error) => {
      debugger;
    });
  }

  private checkPossiotions() {
    this.view.checkPosition(this.words.map((o) => o.text));
  }

  private renderWords(words: IWordGame[]) {
    words.forEach((word: IWordGame) => this.view.addWord(word));
  }

  private renderBackgroundImageWords() {
    // const textLength = words.map((o) => o.text)
    //   .reduce((accumulator, word) => accumulator + word.length, 0) + words.length - 1;
    // const layoutWidth = this.view.resultLayout.clientWidth;
    // words.forEach((word: string) => this.view.addBackgroundImageWord(word, word.length / textLength, ));
    this.words.reduce((accumulator, word: IWordGame) => {
      // const width = word.length / textLength;
      this.view.addBackgroundImageWord(word, accumulator);
      return accumulator + word.width;
    }, 0);
  }
}

class GamePanelView {
  public resultLayout: HTMLDivElement;
  private resourseLayout: HTMLDivElement;
  private source: HTMLElement;
  private checkButton: HTMLButtonElement;
  private reverseColorTextButton: HTMLButtonElement;
  private translation: HTMLSpanElement;
  private speaker: HTMLAudioElement;

  public render(layout: Node) {
    this.translation = renderElement(layout, 'span', 'game__result-translate');
    this.resultLayout = renderElement(layout, 'div', 'game__result-layuot');
    this.resourseLayout = renderElement(layout, 'div', 'game__resourse-layuot');
    const resultButtons = renderElement(layout, 'div', 'game__result-buttons');
    this.checkButton = renderElement(resultButtons, 'button', 'game__check', 'Check');
    this.reverseColorTextButton = renderElement(resultButtons, 'button', 'game__check', 'ReverseColorText');

    this.resourseLayout.onmousedown = (e) => {
      this.source = e.target as HTMLElement;
    };
    this.resultLayout.onmouseup = (e) => {
      if (!this.source) return;
      const current = e.target as HTMLElement;
      if (current === this.resultLayout) {
        this.resultLayout.append(this.source);
      } else {
        this.resultLayout.insertBefore(this.source, current);
      }
      this.source = undefined;
    };

    this.resultLayout.onmousedown = (e) => {
      this.source = e.target as HTMLElement;
    };
    this.resourseLayout.onmouseup = (e) => {
      if (!this.source) return;
      const current = e.target as HTMLElement;
      if (current === this.resourseLayout) {
        this.resourseLayout.append(this.source);
      } else {
        this.resourseLayout.insertBefore(this.source, current);
      }
      this.source = undefined;
    };
  }

  public addWord(word: IWordGame) {
    const span = renderElement(this.resourseLayout, 'span', 'game__word', word.text);
    span.style.width = `${word.width * 100}%`;
    word.element = span;
  }

  public addBackgroundImageWord(word: IWordGame, startPosition: number) {
    word.element.classList.add('puzzle');
    word.element.style.backgroundPositionX = `-${startPosition * this.resultLayout.clientWidth}px`;
    word.element.style.backgroundSize = `${this.resultLayout.clientWidth}px auto`;
    // word.element.style.backgroundPositionY = '70%';
    // word.element.style.backgroundImage
  }

  public checkPosition(words: string[]) {
    this.resultLayout.childNodes.forEach((value: HTMLElement, index: number) => {
      value.classList.remove('puzzle');
      value.style.backgroundImage = undefined;
      value.classList.remove('game__word_true', 'game__word_false');
      if (value.textContent === words[index]) {
        value.classList.add('game__word_true');
      } else {
        value.classList.add('game__word_false');
      }
    });
  }

  public onClickCheckButton(func: () => void) {
    this.checkButton.onclick = func;
  }

  public showTranslation(translation: string) {
    this.translation.textContent = translation;
  }

  public addSound(soundUrl: string) {
    this.speaker = renderElement(this.resourseLayout, 'audio', 'game__speaker');
    this.speaker.src = soundUrl;
  }

  public soundPlay() {
    this.speaker.play();
  }

  public onClickReverseColorTextButton(getWordsElement: () => HTMLElement[]) {
    this.reverseColorTextButton.onclick = () => {
      const elements = getWordsElement();
      if (elements[0].classList.contains('game__word_color-reverse')) {
        elements.forEach((o) => o.classList.remove('game__word_color-reverse'));
      } else {
        elements.forEach((o) => o.classList.add('game__word_color-reverse'));
      }
    };
  }
}
