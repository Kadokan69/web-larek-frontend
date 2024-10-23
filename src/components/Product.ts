import { IProductItem } from '../types';
import { Component } from './base/Component';
import { IEvents } from './base/events';

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
	protected _inBasket?: boolean;

	constructor(protected container: HTMLElement, protected events: IEvents) {
		super(container);
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
				this.events.emit('product:select', { id: this._id });
			});
		}

		if (this._button) {
			this._button.addEventListener('click', () => {
				this.events.emit('product:submit', { id: this._id });
			});
		}

		if (this._delete) {
			this._delete.addEventListener('click', () => {
				this.events.emit('basket:delete', { id: this._id });
			});
		}
	}

	render(productData: Partial<IProductItem>) {
		if (!productData) return this.container;

		const { description, image, category, inBasket, ...data } = productData;
		if(this._description) this._description.textContent = description;
		if (this._image) (this._image.src = image), (this._image.alt = data.title);
		if (this._category) {
			this._category.textContent = category;
			switch (category) {
				case 'софт-скил':
					this._category.classList.add('card__category_soft');
					break;
				case 'дополнительное':
					this._category.classList.add('card__category_additional');
					break;
				case 'кнопка':
					this._category.classList.add('card__category_button');
					break;
				case 'хард-скил':
					this._category.classList.add('card__category_hard');
					break;
				default:
					this._category.classList.add('card__category_other');
					break;
			}
		}
		if (inBasket) {
			if (this._button) this._button.disabled = true;
		}

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

	set index(index: number) {
		this._index.textContent = String(index + 1);
	}

	set title(title: string) {
		this._title.textContent = title;
	}

	set id(id: string) {
		this._id = id;
	}
}
