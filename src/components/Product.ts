import { IProductItem } from '../types';
import { cloneTemplate, ensureElement } from '../utils/utils';
import { Component } from './base/Component';
import { IEvents } from './base/events';
import { OrderData } from './OrderData';

export class Product extends Component<IProductItem> {
	protected _description?: HTMLElement;
	protected _image?: HTMLImageElement;
	protected _title: HTMLElement;
	protected _category?: HTMLElement;
	protected _price: HTMLElement;
	protected _button?: HTMLButtonElement;
	protected _id: string;
	protected _index?: HTMLElement;
	protected _delete?: HTMLElement;
	events: IEvents;

	constructor(protected container: HTMLElement, events: IEvents) {
		super(container);
		this.events = events;
		this._description = this.container.querySelector('.card__text');
		this._image = this.container.querySelector('.card__image');
		this._title = this.container.querySelector('.card__title');
		this._category = this.container.querySelector('.card__category');
		this._price = this.container.querySelector('.card__price');
		this._button = this.container.querySelector('.button');
		this._index = this.container.querySelector('.basket__item-index');
		this._delete = this.container.querySelector('.basket__item-delete');

		if (this.container instanceof HTMLButtonElement) {
			this.container.addEventListener('click', () => {
				this.events.emit('product:select', { product: this });
			});
		}

		if (this._button) {
			this._button.addEventListener('click', () => {
				this.events.emit('product:submit', { product: this });
			});
			this.events.on('product:submit', () => (this._button.disabled = true));
		}

		if (this._delete) {
			this._delete.addEventListener('click', () => {
				this.events.emit('basket:delete', { product: this });
			});
		}
	}

	render(productData: Partial<IProductItem>) {
		if (!productData) return this.container;

		const { description, image, ...data } = productData;
		if (this._image) (this._image.src = image), (this._image.alt = data.title);
		return super.render(data);
	}

	set price(price: number) {
		if (price === null) {
			this._price.textContent = `Бесценно`;
			if (this._button) this._button.disabled = true;
		} else {
			this._price.textContent = `${String(price)} синапсов`;
		}
	}

	set title(title: string) {
		this._title.textContent = title;
		console.log(title);
	}

	set image({ image, title }: { image: string; title: string }) {
		this._image.src = image;
		this._image.alt = title;
	}

	set category(category: string) {
		if (this._category) this._category.textContent = category;
	}

	set description(description: string) {
		this._description.textContent = description;
	}

	set index(index: number) {
		this._index.textContent = String(index);
	}

	set id(id: string) {
		this._id = id;
	}

	get id() {
		return this._id;
	}
}
