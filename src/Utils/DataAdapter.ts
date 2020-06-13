import { ISettingsParams } from '../Components/Settings';
import { EventDispatcherCall, EventDispatcher } from '../Components/EventDispatcher';
import IUser, { IUserRegister } from '../Constants/IUser';
import IWordResponse, { IWordPost, IUserWord } from '../Constants/IWord';
import { backend } from '../Constants/Constants';

export default class DataAdapter {
  private eventDispatcherCall: EventDispatcherCall;
  private params: ISettingsParams;
  private static token: string;
  private static userId: string;

  constructor(eventDispatcher: EventDispatcher) {
    this.eventDispatcherCall = eventDispatcher.call;
    eventDispatcher.subscribe.setUser((user: IUser) => {
      DataAdapter.token = user.token;
      DataAdapter.userId = user.userId;
    });
  }

  public setStartParameters(params: ISettingsParams) {
    this.params = params;
  }

  public static async registration(event: IUserRegister) {
    const rawResponse = await fetch(`${backend}/users`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });

    if (rawResponse.ok) {
      const content = await rawResponse.json();
      return content;
    }
    const errorText = await rawResponse.text();
    throw Error(errorText);
  }

  public static async logIn(event: IUserRegister) {
    const rawResponse = await fetch(`${backend}/signin`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });

    if (rawResponse.ok) {
      const content = await rawResponse.json();
      return content;
    }
    const errorText = await rawResponse.text();
    throw Error(errorText);
  }

  public static async getUserWords() {
    const rawResponse = await fetch(`${backend}/users/${DataAdapter.userId}/words`, {
      method: 'GET',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${DataAdapter.token}`,
        Accept: 'application/json',
      },
    } as any);
    if (rawResponse.ok) {
      const content: IUserWord[] = await rawResponse.json();
      return content;
    }
    const errorText = await rawResponse.text();
    throw Error(errorText);
  }

  public static async getWords(group: number, page: number) {
    const rawResponse = await fetch(`${backend}/words?group=${group}&page=${page}`);
    if (rawResponse.ok) {
      const content: IWordResponse[] = await rawResponse.json();
      return content;
    }
    const errorText = await rawResponse.text();
    throw Error(errorText);
  }

  public static async postWord(wordId: string, word: IWordPost) {
    const rawResponse = await fetch(`${backend}/users/${DataAdapter.userId}/words/${wordId}`, {
      method: 'POST',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${DataAdapter.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(word),
    } as any);
    if (rawResponse.ok) {
      const content: IWordResponse[] = await rawResponse.json();
      return content;
    }
    const errorText = await rawResponse.text();
    throw Error(errorText);
  }

  public static async putWord(wordId: string, word: IWordPost) {
    const rawResponse = await fetch(`${backend}/users/${DataAdapter.userId}/words/${wordId}`, {
      method: 'PUT',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${DataAdapter.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(word),
    } as any);
    if (rawResponse.ok) {
      const content: IWordResponse[] = await rawResponse.json();
      return content;
    }
    const errorText = await rawResponse.text();
    throw Error(errorText);
  }

  public static async deleteWord(wordId: string) {
    const rawResponse = await fetch(`${backend}/users/${DataAdapter.userId}/words/${wordId}`, {
      method: 'DELETE',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${DataAdapter.token}`,
        Accept: 'application/json',
      },
    } as any);
    if (rawResponse.ok) {
      return true;
    }
    const errorText = await rawResponse.text();
    throw Error(errorText);
  }
}
