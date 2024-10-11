import { IProductData, IProductItem } from "../types";
import { IEvents } from "./base/events";

export class ProductData implements IProductData {
    total: number;
    items: IProductItem[];
    preview: string | null;
    events: IEvents

    constructor(events: IEvents){
        this.events = events;
    }

    set productCard(data: IProductItem[]){
        this.items = data
        this.events.emit('product:load')
        
    }

    set productTotal(data: number){
        this.total = data
    }
    
    get productCard(){
        return this.items
    }

}