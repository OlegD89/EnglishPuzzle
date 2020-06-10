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
      } else {
        this.resourseLayout.insertBefore(source, current);
      }
    };
  }

  public addWord(word: IWordGame) {
    const span = renderElement(this.resourseLayout, 'span', 'game__word', word.text);
    span.style.width = `${word.width * 100}%`;
    word.element = span;
  }
}
