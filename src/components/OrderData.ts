import { FormErrors, IOrder, IProductItem, TProductItemId } from '../types';
import { IEvents } from './base/events';

export class OrderData {
	payment: string;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: string[];

	constructor(protected events: IEvents) {}

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

	// 	getTotal(){
	// 		return this.total
	// 	}

	// 	setBasket(product: IProductItem){
	// 		if(!this.basket.find(i => i.id == product.id)){
	// 		this.basket.push(product);
	// 		this.setItems(product.id);
	// 		this.total = this.total + product.price;
	// 	}
	// }
	// 	deleteItem(product: string){
	// 		this.basket.filter(item => item.id !== product)
	// 	}

	// 	getItems(){
	// 		return this.items
	// 	}

	// 	protected setItems(item: string){

	// 		this.items.push(item);
	// 		this.events.emit("orderItems:change", { product: this.items })
	// 	}
	// 	setOrder(dataOrder: IOrder) {
	// 		this.payment = dataOrder.payment;
	// 		this.email = dataOrder.email;
	// 		this.phone = dataOrder.phone;
	// 		this.address = dataOrder.address;
	// 		this.total = dataOrder.total;
	// 		this.items = dataOrder.items;
	// 	}

	// 	deleteItems(product: string){

	// 		const deleteProduct = this.items.filter((number) => number !== product);
	// 		this.items = deleteProduct;
	// 	}

	// 	getIndex(product: string){
	// 		return this.items.indexOf(product) + 1
	// 	}

	// 	set _payment(payment: string) {
	// 		this.payment = payment;
	// 		this.events.emit("orderContact:change")
	// 	}

	// 	get _payment() {
	// 		return this.payment
	// 	}

	// 	set _address(address: string){
	// 		this.address = address;
	// 		this.events.emit("orderContact:change")
	// 	}

	// 	get _address(){
	// 		return this.address
	// 	}

	// 	set _email(email: string){
	// 		this.email = email;
	// 		this.events.emit("orderContact:change")
	// 	}

	// 	set _phone(phone: string){
	// 		this.phone = phone;
	// 		this.events.emit("orderContact:change")
	// 	}

	// 	get _total(){
	// 		return this.total;
	// 	}
}
