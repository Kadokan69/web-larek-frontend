import { IOrder, TProductItemId } from "../types";
import { IEvents } from "./base/events";

export class OrderData implements IOrder {
    payment: string;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: string[];
    events: IEvents;

    constructor(events: IEvents){
        this.events = events
    }

    setOrder(dataOrder:IOrder){
        this.payment = dataOrder.payment;
        this.email = dataOrder.email;
        this.phone = dataOrder.phone;
        this.address = dataOrder.address;
        this.total = dataOrder.total;
        this.items = dataOrder.items;
        this.events.emit('basket:submit')
    }

    getOrder(){
        return { payment: this.payment, email:this.email, phone:this.phone, address: this.address, total: this.total, items: this.items}
    }
}