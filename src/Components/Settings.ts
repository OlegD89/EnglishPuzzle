import { EventDispatcherSubscribe } from './EventDispatcher';
import IUser from '../Constants/IUser';

interface ISettingsParams {
  userId: string,
  token: string,
}

export default class Settings {
  private settings: ISettingsParams;

  constructor(eventDispatcherSubscribe: EventDispatcherSubscribe) {
    this.settings = Settings.loadSettings() || Settings.defaultSettings();
    eventDispatcherSubscribe.setUser((user: IUser) => {
      this.settings.userId = user.userId;
      this.settings.token = user.token;
      this.saveSettings();
    });
  }

  public getSettings(): ISettingsParams {
    return this.settings;
  }

  private saveSettings() {
    localStorage.setItem('puzzle-dos', JSON.stringify(this.settings));
  }

  private static loadSettings(): ISettingsParams {
    const settings = localStorage.getItem('puzzle-dos');
    if (settings) {
      return JSON.parse(settings) as ISettingsParams;
    }
    return null;
  }

  private static defaultSettings(): ISettingsParams {
    return {
      userId: undefined,
      token: undefined,
    };
  }
}

export { ISettingsParams };
