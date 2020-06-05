import { EventDispatcherSubscribe } from './EventDispatcher';

interface ISettingsParams {
}

export default class Settings {
  private settings: ISettingsParams;

  constructor(eventDispatcherSubscribe: EventDispatcherSubscribe) {
    this.settings = Settings.loadSettings() || Settings.defaultSettings();
    // eventDispatcherSubscribe.temperatureUnit((event: ITemperatureUnitEvent) => {
    //   Settings.saveSettings(this.settings);
    // });
  }

  public getSettings(): ISettingsParams {
    return this.settings;
  }

  private static saveSettings(settings: ISettingsParams) {
    localStorage.setItem('weather-dos', JSON.stringify(settings));
  }

  private static loadSettings(): ISettingsParams {
    const settings = localStorage.getItem('weather-dos');
    if (settings) {
      return JSON.parse(settings) as ISettingsParams;
    }
    return null;
  }

  private static defaultSettings(): ISettingsParams {
    return {
    };
  }
}

export { ISettingsParams };
