/* eslint-disable max-classes-per-file */
// TODO search оставил в качестве примера

import IUser from '../Constants/User';


interface ILoggerEvent {
  readonly text: string;
  readonly isError: boolean;
}

interface IEventDispatchers {
  start: EventDispatcherBase<void>;
  setUser: EventDispatcherBase<IUser>;
  logger: EventDispatcherBase<ILoggerEvent>;
}

class EventDispatcher {
  private eventDispatchers: IEventDispatchers;

  public call: EventDispatcherCall;
  public subscribe: EventDispatcherSubscribe;

  constructor() {
    this.eventDispatchers = {
      start: new EventDispatcherBase<void>(),
      setUser: new EventDispatcherBase<IUser>(),
      logger: new EventDispatcherBase<ILoggerEvent>(),
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

  public start() {
    this.eventDispatchers.start.call();
  }

  public setUser(user: IUser) {
    this.eventDispatchers.setUser.call(user);
  }

  public logger(text: string, isError: boolean = false) {
    this.eventDispatchers.logger.call({ text, isError });
  }
}

class EventDispatcherSubscribe {
  private eventDispatchers: IEventDispatchers;

  constructor(eventDispatchers: IEventDispatchers) {
    this.eventDispatchers = eventDispatchers;
  }

  public start(handler: Handler<void>) {
    this.eventDispatchers.start.subscribe(handler);
  }

  public setUser(handler: Handler<IUser>) {
    this.eventDispatchers.setUser.subscribe(handler);
  }

  public logger(handler: Handler<ILoggerEvent>) {
    this.eventDispatchers.logger.subscribe(handler);
  }
}

type Handler<T> = (event: T) => void;

class EventDispatcherBase<T> {
  private handlers: Handler<T>[] = [];

  public call(event: T) {
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
  EventDispatcher, EventDispatcherCall, EventDispatcherSubscribe, ILoggerEvent,
};
