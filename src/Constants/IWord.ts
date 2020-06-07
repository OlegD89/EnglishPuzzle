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
