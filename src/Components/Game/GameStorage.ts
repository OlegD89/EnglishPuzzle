class GameStorage {
  private static currentWord: HTMLElement;

  public static wordToGame: (element: HTMLElement) => void;
  public static wordToResourse: (element: HTMLElement) => void;

  public static setWord(word: HTMLElement) {
    if (word.classList.contains('game__word')) {
      this.currentWord = word;
    }
  }

  public static getWord(): HTMLElement {
    const word = this.currentWord;
    this.currentWord = undefined;
    return word;
  }
}

export default GameStorage;
