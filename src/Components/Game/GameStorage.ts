class GameStorage {
  private static currentWord: HTMLElement;

  public static setWord(word: HTMLElement) {
    this.currentWord = word;
  }

  public static getWord():HTMLElement {
    const word = this.currentWord;
    this.currentWord = undefined;
    return word;
  }
}

export default GameStorage;
