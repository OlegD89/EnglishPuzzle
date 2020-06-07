import { renderElement } from '../Utils/Utils';
import { EventDispatcherSubscribe, ILoggerEvent } from './EventDispatcher';

export default class LoggerController {
  private view: LoggerView;

  constructor(eventDispatcherSubscribe: EventDispatcherSubscribe) {
    this.view = new LoggerView();
    eventDispatcherSubscribe.logger((event: ILoggerEvent) => {
      if (event.isError) {
        this.view.error(event.text);
      } else {
        this.view.success(event.text);
      }
    });
  }

  public render(layout: Node) {
    this.view.render(layout);
  }
}

class LoggerView {
  logger: HTMLElement;

  public render(layout: Node) {
    this.logger = renderElement(layout, 'b', 'logger-panel logger-panel_success logger-panel_hide');
  }

  public success(text: string) {
    this.logger.classList.remove('logger-panel_hide');
    this.logger.classList.remove('logger-panel_error');
    this.logger.classList.add('logger-panel_success');
    this.logger.textContent = text;
    setTimeout(() => {
      this.logger.classList.add('logger-panel_hide');
      this.logger.classList.remove('logger-panel_success');
    }, 3000);
  }

  public error(text: string) {
    this.logger.classList.remove('logger-panel_hide');
    this.logger.classList.remove('logger-panel_success');
    this.logger.classList.add('logger-panel_error');
    this.logger.textContent = text;
    setTimeout(() => {
      this.logger.classList.add('logger-panel_hide');
      this.logger.classList.remove('logger-panel_error');
    }, 3000);
  }
}
