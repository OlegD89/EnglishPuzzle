import { ISettingsParams } from '../Components/Settings';
import { EventDispatcherCall, EventDispatcher } from '../Components/EventDispatcher';

export default class DataAdapter {
  private eventDispatcherCall: EventDispatcherCall;
  private params: ISettingsParams;

  constructor(eventDispatcher: EventDispatcher) {
    this.eventDispatcherCall = eventDispatcher.call;
    // eventDispatcher.subscribe.search((event: ISearchEvent) => {});
  }

  public setStartParameters(params: ISettingsParams) {
    this.params = params;
  }
}
