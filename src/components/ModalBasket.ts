import { Component } from "./base/Component";
import { IEvents } from "./base/events";

interface IModalBasket{
  catalog: HTMLElement[];
}

export class ModalBasket extends Component<IModalBasket>{

  protected _catalog: HTMLElement;
  protected _basketButton: HTMLButtonElement;
  protected _basketPrice: HTMLElement;

  constructor(protected container: HTMLElement, events: IEvents){
    super(container)
    this._catalog = this.container.querySelector('.basket__list');
    this._basketButton = this.container.querySelector('.basket__button');
    this._basketPrice = this.container.querySelector('.basket__price');
  }

  set catalog(items: HTMLElement[]) {
		this._catalog.replaceChildren(...items);
	}

  set total(total: number){
    this._basketPrice.textContent = String(total);
  }

  deleteItems(id:HTMLElement){
    this._catalog.removeChild(id);
    super.render()
  }

}