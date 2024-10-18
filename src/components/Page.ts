import { Component } from './base/Component';
import { IEvents } from './base/events';

interface IPage {
	catalog: HTMLElement[];
}

export class Page extends Component<IPage> {
	protected _catalog: HTMLElement;
	protected _page: HTMLElement;
	protected _basket: HTMLButtonElement;
	protected _counter: HTMLElement;

	constructor(protected container: HTMLElement, events: IEvents) {
		super(container);
		this._page = container;
		this._basket = this.container.querySelector('.header__basket');
		this._counter = this.container.querySelector('.header__basket-counter');
		this._catalog = this.container.querySelector('.gallery');

		this._basket.addEventListener('click', () => {
			events.emit('basket:open');
		});
	}

	set catalog(items: HTMLElement[]) {
		this._catalog.replaceChildren(...items);
	}

	set counter(total: number) {
		this._counter.textContent = String(total);
	}

	set locked(value: boolean) {
		if (value) {
			this.container.classList.add('page__wrapper_locked');
		} else {
			this.container.classList.remove('page__wrapper_locked');
		}
	}
}
