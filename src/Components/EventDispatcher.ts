// TODO search оставил в качестве примера
interface ISearchEvent {
  readonly search: string;
}

interface IEventDispatchers {
  search: EventDispatcherBase<ISearchEvent>;
}


class EventDispatcher {
  private eventDispatchers: IEventDispatchers;

  public call: EventDispatcherCall;
  public subscribe: EventDispatcherSubscribe;

  constructor() {
    this.eventDispatchers = {
      search: new EventDispatcherBase<ISearchEvent>(),
    };
    this.call = new EventDispatcherCall(this.eventDispatchers);
    this.subscribe = new EventDispatcherSubscribe(this.eventDispatchers);
  }
}

class EventDispatcherCall {
  private eventDispatchers: IEventDispatchers;

  constructor(eventDispatchers: IEventDispatchers) {
    this.eventDispatchers = eventDispatchers;
  }

  public search(event: ISearchEvent) {
    this.eventDispatchers.search.call(event);
  }
}

class EventDispatcherSubscribe {
  private eventDispatchers: IEventDispatchers;

  constructor(eventDispatchers: IEventDispatchers) {
    this.eventDispatchers = eventDispatchers;
  }

  public search(handler: Handler<ISearchEvent>) {
    this.eventDispatchers.search.subscribe(handler);
  }
}

type Handler<T> = (event: T) => void;

class EventDispatcherBase<T> {
  private handlers: Handler<T>[] = [];

  public call(event: T) {
    // TODO: Не понял суть запрета
    // eslint-disable-next-line no-restricted-syntax
    for (const h of this.handlers) {
      h(event);
    }
  }

  public subscribe(handler: Handler<T>) {
    this.handlers.push(handler);
  }
}

export {
  EventDispatcher, EventDispatcherCall, EventDispatcherSubscribe, 
};
