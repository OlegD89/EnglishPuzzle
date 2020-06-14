import { renderElement, shuffle } from '../../Utils/Utils';
import IWordGame from './IWordGame';
import GameStorage from './GameStorage';

export default class GameResourseController {
  private view: GameResourseView;

  constructor() {
    this.view = new GameResourseView();
  }

  public render(resoursePanel: Node) {
    this.view.render(resoursePanel);
    GameStorage.wordToResourse = (element: HTMLElement) => this.view.appendWordElement(element);
  }

  public clear() {
    this.view.clear();
  }

  public renderWords(words: IWordGame[]) {
    shuffle(words).forEach((word: IWordGame) => this.view.addWord(word));
  }
}

class GameResourseView {
  public resourseLayout: HTMLDivElement;

  public render(resoursePanel: Node) {
    renderElement(resoursePanel, 'div', 'game__row');
    this.resourseLayout = renderElement(resoursePanel, 'div', 'game__resourse-layuot');

    this.resourseLayout.onmousedown = (e) => {
      GameStorage.setWord(e.target as HTMLElement);
    };
    this.resourseLayout.onmouseup = (e) => {
      const source = GameStorage.getWord();
      if (!source) return;
      const current = e.target as HTMLElement;

      if (current === this.resourseLayout) {
        this.resourseLayout.append(source);
      } else if (current === source) {
        this.wordClick(current); // click and mousedown conflicting
      } else {
        this.resourseLayout.insertBefore(source, current);
      }
    };
  }

  public clear() {
    this.resourseLayout.innerHTML = '';
  }

  public appendWordElement(element: HTMLElement) {
    this.resourseLayout.append(element);
  }

  public addWord(word: IWordGame) {
    const span = renderElement(this.resourseLayout, 'span', 'game__word', word.text);
    span.style.width = `${word.width * 100}%`;
    word.element = span;
  }

  // eslint-disable-next-line class-methods-use-this
  private wordClick(element: HTMLElement) {
    if (element.classList.contains('game__word')) {
      GameStorage.wordToGame(element);
    }
  }
}
