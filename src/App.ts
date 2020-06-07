import LayoutController from './Components/Layout';
import StartController from './Components/Start';
import Settings from './Components/Settings';
import DataAdapter from './Utils/DataAdapter';
import { EventDispatcher } from './Components/EventDispatcher';
import LoggerController from './Components/Logger';

export default class App {
  private layout: LayoutController;
  private start: StartController;
  private settings: Settings;
  private dataAdapter: DataAdapter;
  private logger: LoggerController;

  constructor() {
    const eventDispatcher = new EventDispatcher();
    this.dataAdapter = new DataAdapter(eventDispatcher);
    this.settings = new Settings(eventDispatcher.subscribe);
    this.logger = new LoggerController(eventDispatcher.subscribe);
    this.layout = new LayoutController(eventDispatcher.subscribe);
    this.start = new StartController(eventDispatcher);
  }

  public Start() {
    const params = this.settings.getSettings();
    this.dataAdapter.setStartParameters(params);
    const page = document.createDocumentFragment();
    const layout = this.layout.render(page);
    this.logger.render(page);
    const start = this.start.render(layout);
    // this.controls.render(layout, params);

    document.querySelector('body').appendChild(page);
  }
}


// TODO Реализовать:
// поправить стили входных форм
// Доработать вывод сообщений - сделать всплывающее окно
// Добавить прогресс (загрузку)
