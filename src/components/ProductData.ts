import { IProductItem } from '../types';
import { IEvents } from './base/events';

export class ProductData {
	protected total: number;
	protected catalog: IProductItem[];

	constructor(protected events: IEvents) {}

	setProduct(items: IProductItem[]) {
		this.catalog = items;
	}

	getProduct() {
		return this.catalog;
	}

	getTotal(items: IProductItem[]) {
		let totalPrise = 0;
		items.forEach((item) => (totalPrise = totalPrise + item.price));
		return totalPrise;
	}
}
