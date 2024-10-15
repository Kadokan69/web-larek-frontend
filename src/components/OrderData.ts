import { IOrder, TProductItemId } from '../types';
import { IEvents } from './base/events';

export class OrderData implements IOrder {
	payment: string;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: string[] = [];

	constructor(protected events: IEvents) {}

	setOrder(dataOrder: IOrder) {
		this.payment = dataOrder.payment;
		this.email = dataOrder.email;
		this.phone = dataOrder.phone;
		this.address = dataOrder.address;
		this.total = dataOrder.total;
		this.items = dataOrder.items;
	}

	set _items(items: string) {
		if (!this.items.find((i) => i === items)) {
			this.items.push(items);
            this.events.emit("orderItems:change", { product: this.items })
		}
	}

	set _payment(payment: string) {
		this.payment = payment;
	}

	set _address(address: string){
		this.address = address;
	}

	getOrder() {
		return {
			payment: this.payment,
			email: this.email,
			phone: this.phone,
			address: this.address,
			total: this.total,
			items: this.items,
		};
	}
}
