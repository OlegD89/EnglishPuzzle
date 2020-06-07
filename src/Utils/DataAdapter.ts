import { ISettingsParams } from '../Components/Settings';
import { EventDispatcherCall, EventDispatcher } from '../Components/EventDispatcher';
import { IUserRegister } from '../Constants/User';

export default class DataAdapter {
  private eventDispatcherCall: EventDispatcherCall;
  private params: ISettingsParams;

  constructor(eventDispatcher: EventDispatcher) {
    this.eventDispatcherCall = eventDispatcher.call;
  }

  public setStartParameters(params: ISettingsParams) {
    this.params = params;
  }

  public static async registration(event: IUserRegister) {
    const rawResponse = await fetch('https://afternoon-falls-25894.herokuapp.com/users', {
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
    const rawResponse = await fetch('https://afternoon-falls-25894.herokuapp.com/signin', {
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
}
