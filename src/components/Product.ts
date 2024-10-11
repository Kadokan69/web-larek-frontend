import { IProductItem } from "../types";
import { cloneTemplate } from "../utils/utils";
import { Component } from "./base/Component";
import { IEvents } from "./base/events"

export class Product extends Component<IProductItem>{

    protected events: IEvents;
    protected _description?: HTMLElement;
    protected _image?: HTMLImageElement;
    protected _title: HTMLElement;
    protected _category?: HTMLElement;
    protected _price: HTMLElement;
    protected _button?: HTMLButtonElement;
    protected _id: string;

    constructor(protected container: HTMLElement, events: IEvents){
        super(container)
        this.events = events;

        this._description = this.container.querySelector('.card__text');
        this._image = this.container.querySelector('.card__image');
        this._title = this.container.querySelector('.card__title');
        this._category = this.container.querySelector('.card__category');
        this._price = this.container.querySelector('.card__price');
        this._button = this.container.querySelector('.button');

            this.container.addEventListener('click', () => {
                this.events.emit('product:select', { product: this });
                
            });
            if(this._button){
            this._button.addEventListener('click', () => {
                this.events.emit('product:submit', { product: this })
            })}

    }

    render(productData: Partial<IProductItem>){

        if(!productData) return this.container

        const {description, title, image, ...data} = productData;
        if (image) this.image = {image, title}
       return super.render(data)

    }

    set price(price: number){
        this._price.textContent = `${String(price)} синапсов`
    }

    set title(title: string){
        this._title.textContent = title;
    }

    set image({image, title}: {image: string, title: string}){
        this._image.src = image;
        this._image.alt = title
    }

    set category(category: string){
        this._category.textContent = category;
    }

    set description(description: string){
        this._description.textContent = description
    }

    set id(id: string){
        this._id = id
    }

    get id() {
        return this._id
    }

    
}