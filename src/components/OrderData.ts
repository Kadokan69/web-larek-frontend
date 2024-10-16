import { IOrder, TProductItemId } from '../types';
import { IEvents } from './base/events';

export class OrderData{
	protected payment: string;
	protected email: string;
	protected phone: string;
	protected address: string;
	protected total: number;
	protected items: string[] = [];

	constructor(protected events: IEvents) {}
	getItems(){
		const id = new Array
		this.items.forEach(i => id.push(i))
		return id
	}

	setItems(item: string){
		this.items.push(item);
		this.events.emit("orderItems:change", { product: this.items })
	}
	setOrder(dataOrder: IOrder) {
		this.payment = dataOrder.payment;
		this.email = dataOrder.email;
		this.phone = dataOrder.phone;
		this.address = dataOrder.address;
		this.total = dataOrder.total;
		this.items = dataOrder.items;
	}


	set _payment(payment: string) {
		this.payment = payment;
	}

	set _address(address: string){
		this.address = address;
	}

	set _email(email: string){
		this.email = email;
	}

	set _phone(phone: string){
		this.phone = phone;
	}

	setTotal(value: number){
		this.total = value;
	}

	get _total(){
		return this.total;
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
