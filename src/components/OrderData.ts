import { FormErrors, IOrder, IProductItem, TProductItemId } from '../types';
import { IEvents } from './base/events';

export class OrderData{
	 payment: string;
	 email: string;
	 phone: string;
	 address: string;
	 total: number;
	 items: string[];
	 formErrors: FormErrors = {};

	constructor(protected events: IEvents) {}

	validateOrder() {
        const errors: typeof this.formErrors = {};
        if (!this.email) {
            errors.email = 'Необходимо указать email';
        }
        if (!this.phone) {
            errors.phone = 'Необходимо указать телефон';
        }
        this.formErrors = errors;
        this.events.emit('formErrors:change', this.formErrors);
        return Object.keys(errors).length === 0;
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
		this.payment = null
		this.email = null
		this.phone = null
		this.address = null
		this.total = null
		this.items = []
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
