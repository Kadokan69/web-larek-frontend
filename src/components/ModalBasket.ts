import { IProductItem } from "../types";
import { Component } from "./base/Component";
import { IEvents } from "./base/events";

interface IModalBasket{
  catalog: HTMLElement[];
}

export class ModalBasket extends Component<IModalBasket>{

  protected catalog: HTMLElement;
  protected basketButton: HTMLButtonElement;
  protected basketPrice: HTMLElement;

  constructor(protected container: HTMLElement,protected events: IEvents){
    super(container)
    this.catalog = this.container.querySelector('.basket__list');
    this.basketButton = this.container.querySelector('.basket__button');
    this.basketPrice = this.container.querySelector('.basket__price');

    this.basketButton?.addEventListener('click', (evt) => {
			evt.preventDefault();
			this.events.emit(`basket:submit`);
		})
  }
  setBasket(productData: HTMLElement[]) {
    if (!productData) return this.container;
		this.catalog.replaceChildren(...productData);
  }

  setTotal(value: number){
    this.basketPrice.textContent = `${String(value)} синапсов`
  }
}