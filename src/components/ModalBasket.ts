import { IProductItem } from '../types';
import { Component } from './base/Component';
import { IEvents } from './base/events';

interface IModalBasket {
	catalog: HTMLElement[];
}

export class ModalBasket extends Component<IModalBasket> {
	protected _catalog: HTMLElement;
	protected _basketButton: HTMLButtonElement;
	protected _basketPrice: HTMLElement;

	constructor(protected container: HTMLElement, protected events: IEvents) {
		super(container);
		this._catalog = this.container.querySelector('.basket__list');
		this._basketButton = this.container.querySelector('.basket__button');
		this._basketPrice = this.container.querySelector('.basket__price');

		this._basketButton?.addEventListener('click', (evt) => {
			evt.preventDefault();
			this.events.emit(`basket:submit`);
		});
	}
	setBasket(productData: HTMLElement[]) {
		if (!productData) return this.container;
		this._catalog.replaceChildren(...productData);
	}

	setTotal(value: number) {
		this._basketPrice.textContent = `${String(value)} синапсов`;
	}

	toggleButton(data: IProductItem[]) {
		if (data.length !== 0) {
			this._basketButton.disabled = false;
		} else {
			this._basketButton.disabled = true;
		}
	}
}
