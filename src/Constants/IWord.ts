/* eslint-disable semi */
export default interface IWordResponse {
  id: string,
  word: string,
  image: string,
  audio: string,
  audioMeaning: string,
  audioExample: string,
  textMeaning: string,
  textExample: string,
  transcription: string,

  group: number,
  page: number,
  textExampleTranslate: string,
  textMeaningTranslate: string,
  wordTranslate: string,
}

interface IGetWord {
  difficulty: string,
  id: string,
  wordId: string,
}


interface IUserWord {
  difficulty: string,
  id: string,
  optional: IOptional,
  wordId: string,
}


interface IWordPost {
  difficulty: string,
  optional: IOptional,
}

interface IOptional {
  page: number,
  row: number,
  success: boolean
}


export { IWordPost, IGetWord, IUserWord };
