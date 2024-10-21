import { IProductItem } from '../types';
import { cloneTemplate, ensureElement } from '../utils/utils';
import { Component } from './base/Component';
import { IEvents } from './base/events';
import { OrderData } from './OrderData';

export class Product extends Component<IProductItem> {
	protected description?: HTMLElement;
	protected image?: HTMLImageElement;
	protected title: HTMLElement;
	protected category?: HTMLElement;
	protected price: HTMLElement;
	protected button?: HTMLButtonElement;
	protected id: string;
	protected index?: HTMLElement;
	protected delete?: HTMLElement;
	protected inBasket?: boolean;

	constructor(protected container: HTMLElement, protected events: IEvents) {
		super(container);
		this.description = this.container.querySelector('.card__text');
		this.image = this.container.querySelector('.card__image');
		this.title = this.container.querySelector('.card__title');
		this.category = this.container.querySelector('.card__category');
		this.price = this.container.querySelector('.card__price');
		this.button = this.container.querySelector('.button');
		this.index = this.container.querySelector('.basket__item-index');
		this.delete = this.container.querySelector('.basket__item-delete');

		if (this.container instanceof HTMLButtonElement) {
			this.container.addEventListener('click', () => {
				this.events.emit('product:select', { id: this._id });
			});
		}

		if (this.button) {
			this.button.addEventListener('click', () => {
				this.events.emit('product:submit', { id: this._id });
			});
		}

		if (this.delete) {
			this.delete.addEventListener('click', () => {
				this.events.emit('basket:delete', { id: this._id });
			});
		}
	}

	render(productData: Partial<IProductItem>) {
		if (!productData) return this.container;

		const { description, image, category, inBasket, ...data } = productData;
		if (this.image) (this.image.src = image), (this.image.alt = data.title);
		if (this.category) {
			this.category.textContent = category;
			switch (category) {
				case 'софт-скил':
					this.category.classList.add('card__category_soft');
					break;
				case 'дополнительное':
					this.category.classList.add('card__category_additional');
					break;
				case 'кнопка':
					this.category.classList.add('card__category_button');
					break;
				case 'хард-скил':
					this.category.classList.add('card__category_hard');
					break;
				default:
					this.category.classList.add('card__category_other');
					break;
			}
		}
		if (inBasket) {
			if (this.button) this.button.disabled = true;
		}

		return super.render(data);
	}

	set _price(price: number) {
		if (price === null) {
			this.price.textContent = `Бесценно`;
			if (this.button) this.button.disabled = true;
		} else {
			this.price.textContent = `${String(price)} синапсов`;
		}
	}

	set _index(index: number) {
		this.index.textContent = String(index + 1);
	}

	set _title(title: string) {
		this.title.textContent = title;
	}

	set _id(id: string) {
		this.id = id;
	}
}
