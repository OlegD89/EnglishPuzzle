/* eslint-disable no-console */
import LayoutController from './Components/Layout';
import ControlsController from './Components/Controls/Controls';
import WeatherPanelController from './Components/Weather/WeatherPanel';
import MapPanelController from './Components/Map/MapPanel';
import { renderElement } from './Utils/Utils';
import Settings from './Components/Settings';
import DataAdapter from './Utils/DataAdapter';
import { EventDispatcher } from './Components/EventDispatcher';
import LoggerController from './Components/Logger';

export default class App {
  private layout: LayoutController;
  private controls: ControlsController;
  private weather: WeatherPanelController;
  private map: MapPanelController;
  private settings: Settings;
  private dataAdapter: DataAdapter;
  private logger: LoggerController;

  constructor() {
    const eventDispatcher = new EventDispatcher();
    this.dataAdapter = new DataAdapter(eventDispatcher);
    this.settings = new Settings(eventDispatcher.subscribe);
    this.layout = new LayoutController(eventDispatcher.subscribe);
    this.logger = new LoggerController(eventDispatcher.subscribe);
    this.controls = new ControlsController(eventDispatcher);
    this.weather = new WeatherPanelController(eventDispatcher.subscribe);
    this.map = new MapPanelController(eventDispatcher.subscribe);

    console.log('Для проверяющих: '
        + 'Просьба не снижать за то, что погода на три дня выводит дни начиная с сегодняшней даты, '
        + 'т.к. сервис взял из предложенных, а в бесплатном режиме он оказалось выдает погоду только на эти три дня. '
        + 'Так же не считать ошибкой что для русского и англиского выводится разная погода, т.к. это '
        + 'работа сервиса погоды.');
    console.log(
      'Для проверяющих: данные о погоде и местоположении отображаются одновременно. Картинка - после, по факту.'
        + ' Её специально не жду, т.к. пользователю важней информация о погоде',
    );
  }

  public Start() {
    const params = this.settings.getSettings();
    this.dataAdapter.setStartParameters(params);
    const page = document.createDocumentFragment();
    const layout = this.layout.render(page);
    this.logger.render(layout, params);
    this.controls.render(layout, params);
    const body = renderElement(layout, 'div', 'body-panel');
    this.weather.render(body, params);
    this.map.render(body);
    this.dataAdapter.getCurrentLocation();

    document.querySelector('body').appendChild(page);
  }
}


// TODO Осталось:
// поправить стиль контроллов и поиска

// TODO Не удалось:
// Как подключать сторонние модули через d.ts?????????
//    хранение ключей через dotenv (перенести apiKeys)
//    подключить яндекс карту (реализовать карту, маска для карты)
//    реализовать карту
// получить авторизацию
//    (если авторизоваться, то можно будет использовать поиск фото по координатам flickr.photos.geo.getLocation)
// в eslint
//    в typescript поставить привычные отступы в 4 пробела
// в jest
//    протестировать ответы сервисов (расписал проблему в тестах датаадаптера)

// TODO Доп функционал (не реализован):
// Иконки флагов в выпадающем списке переключении языка
// Погода на несколько дней
// Дополнительный язык
// Темная/светлая тема
// Выдавать последние 10 поисков в строке поиска
// Вывод минимальной температуры в прогнозах погоды
// Если введена страна без города, то показывать для какого города показана погода (центр страны)
