import { IEvents } from './base/events';

export class OrderData {
	protected payment: string;
	protected email: string;
	protected phone: string;
	protected address: string;
	protected total: number;
	protected items: string[];

	constructor(protected events: IEvents) {}

	setItems(item: string[]) {
		this.items = item;
	}

	setTotal(value: number) {
		this.total = value;
	}

	getPayment() {
		return this.payment;
	}

	checkValidOrder() {
		if (this.payment.length !== 0 && this.address.length !== 0) {
			this.events.emit('form:valid', this);
		} else {
			this.events.emit('form:novalid');
		}
	}

	checkValidContact() {
		if (this.email.length !== 0 && this.phone.length !== 0) {
			this.events.emit('form:valid');
		} else {
			this.events.emit('form:novalid');
		}
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

	reset() {
		this.payment = '';
		this.email = '';
		this.phone = '';
		this.address = '';
		this.total = null;
		this.items = [];
	}
}
