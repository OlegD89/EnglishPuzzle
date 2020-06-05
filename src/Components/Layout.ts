import { renderElement } from '../Utils/Utils';
import { EventDispatcherSubscribe } from './EventDispatcher';

export default class LayoutController {
  private view: LayoutView;

  constructor(eventDispatcherSubscribe: EventDispatcherSubscribe) {
    this.view = new LayoutView();
  }

  public render(layout: Node): Node {
    this.view.render(layout);
    return this.view.getLayout();
  }
}

class LayoutView {
  private layout: HTMLDivElement;
  private loading: HTMLDivElement;

  public render(layout: Node) {
    this.layout = renderElement(layout, 'div', 'layout');
    renderElement(this.layout, 'div', 'layout__blackout');
    this.loading = renderElement(this.layout, 'div', 'loading');
    renderElement(this.layout, 'h1', 'header', 'Weather');
  }

  public getLayout() {
    return this.layout;
  }

  public changeImage(currentUrl: string) {
    this.layout.style.backgroundImage = `url(${currentUrl})`;
  }

  public showLoading() {
    this.loading.classList.remove('loading_hide');
  }

  public hideLoading() {
    this.loading.classList.add('loading_hide');
  }
}
