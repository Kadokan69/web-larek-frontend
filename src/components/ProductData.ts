import { IProductData, IProductItem } from '../types';
import { IEvents } from './base/events';

export class ProductData{
	protected total: number;
	protected catalog: IProductItem[];
	protected priseTotal: number;
	

	constructor(protected events: IEvents) {}

	setProduct(items: IProductItem[]){
		this.catalog = items;		
	}

	getProduct(){
		return this.catalog
	}

	getTotal(product: IProductItem[]){
		let totalPrise = 0;
		product.forEach(item => totalPrise = totalPrise + item.price)
		return totalPrise
	}

}