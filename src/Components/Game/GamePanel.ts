import { EventDispatcher } from '../EventDispatcher';
import { renderElement, shuffle } from '../../Utils/Utils';
import ControlsController from './Controls';
import DataAdapter from '../../Utils/DataAdapter';
import IUser from '../../Constants/IUser';
import IWordResponse from '../../Constants/IWord';
import { fileResource } from '../../Constants/Constants';

export default class GamePanelController {
  private view: GamePanelView;
  private controls: ControlsController;
  private user: IUser;
  private words: string[];

  constructor(eventDispatcher: EventDispatcher) {
    this.view = new GamePanelView();
    eventDispatcher.subscribe.setUser((user: IUser) => {
      this.user = user;
    });
    eventDispatcher.subscribe.clickSound(() => {
      this.view.soundPlay();
    });
  }

  public render(layout: Node) {
    this.view.render(layout);
    this.view.onClickCheckButton(() => this.checkPossiotions());
    this.load();
  }

  private load() {
    DataAdapter.getWords(0, 0).then((wordsResponse: IWordResponse[]) => {
      const wordResponse = wordsResponse.filter((o) => o.textExample.split(' ').length < 10)[0];
      const text = wordResponse.textExample.replace('<b>', '').replace('</b>', '');
      this.view.showTranslate(wordResponse.textExampleTranslate);
      this.words = text.split(' ');
      const wordsShuffle = shuffle(this.words);
      this.renderWords(wordsShuffle, text.replace(/ /g, '').length);
      this.view.addSound(fileResource + wordResponse.audioExample);
    }).catch((error) => {
      debugger;
    });
  }

  private checkPossiotions() {
    this.view.checkPosition(this.words);
  }

  private renderWords(words: string[], textLength: number) {
    words.forEach((word: string) => this.view.addWord(word, (word.length / textLength) * 100));
  }
}

class GamePanelView {
  private resultLayout: HTMLDivElement;
  private resourseLayout: HTMLDivElement;
  private source: HTMLElement;
  private checkButton: HTMLButtonElement;
  private translate: HTMLSpanElement;
  private speaker: HTMLAudioElement;

  public render(layout: Node) {
    this.translate = renderElement(layout, 'span', 'game__result-translate');
    this.resultLayout = renderElement(layout, 'div', 'game__result-layuot');
    this.resourseLayout = renderElement(layout, 'div', 'game__resourse-layuot');
    const resultButtons = renderElement(layout, 'div', 'game__result-buttons');
    this.checkButton = renderElement(resultButtons, 'button', 'game__check', 'Check');

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

  public addWord(word: string, precent: number) {
    const span = renderElement(this.resourseLayout, 'span', 'game__word', word);
    span.style.width = `${precent}%`;
  }

  public checkPosition(words: string[]) {
    this.resultLayout.childNodes.forEach((value: HTMLElement, index: number) => {
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

  public showTranslate(translate: string) {
    this.translate.textContent = translate;
  }

  public addSound(soundUrl: string) {
    this.speaker = renderElement(this.resourseLayout, 'audio', 'game__speaker');
    this.speaker.src = soundUrl;
  }

  public soundPlay() {
    this.speaker.play();
  }
}
