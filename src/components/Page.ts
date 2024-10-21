import { Component } from './base/Component';
import { IEvents } from './base/events';

interface IPage {
	catalog: HTMLElement[];
}

export class Page extends Component<IPage> {
	protected catalog: HTMLElement;
	protected page: HTMLElement;
	protected basket: HTMLButtonElement;
	protected counter: HTMLElement;

	constructor(protected container: HTMLElement, events: IEvents) {
		super(container);
		this.page = container;
		this.basket = this.container.querySelector('.header__basket');
		this.counter = this.container.querySelector('.header__basket-counter');
		this.catalog = this.container.querySelector('.gallery');

		this.basket.addEventListener('click', () => {
			events.emit('basket:open');
		});
	}

	set _catalog(items: HTMLElement[]) {
		this.catalog.replaceChildren(...items);
	}

	set _counter(total: number) {
		this.counter.textContent = String(total);
	}

	set locked(value: boolean) {
		if (value) {
			this.container.classList.add('page__wrapper_locked');
		} else {
			this.container.classList.remove('page__wrapper_locked');
		}
	}
}
