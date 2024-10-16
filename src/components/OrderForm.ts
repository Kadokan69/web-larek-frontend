import { TOrderForm } from "../types";
import { Component } from "./base/Component";
import { IEvents } from "./base/events";
import { Modal } from "./common/Modal";

interface IOrederForm{
  content: HTMLElement;
}

export class Order extends Component<IOrederForm>{
  protected _form: HTMLFormElement;
  protected _payment: NodeListOf<HTMLButtonElement>;
  protected _address: HTMLElement;
  protected _modalActions: HTMLElement;
  protected _inputs: NodeListOf<HTMLInputElement>;
  protected formName: string;
  protected submitButton: HTMLButtonElement;
  protected errors: HTMLElement;
  protected orderButtons: HTMLElement;

  constructor(container: HTMLElement,protected events: IEvents){
    super(container);
    this._inputs = this.container.querySelectorAll<HTMLInputElement>('.form__input');
    this._payment = this.container.querySelectorAll('.button_alt');
    this._address = this.container.querySelector('.order__field');
    this._modalActions = this.container.querySelector('.modal__actions');
    this.formName = this.container.getAttribute('name');
		this.submitButton = this.container.querySelector('.order__button');
    this.orderButtons = this.container.querySelector('.order__buttons')
    this.errors = this.container.querySelector('.form__errors');

    this.container.addEventListener('submit', (evt) => {
			evt.preventDefault();
			this.events.emit(`${this.formName}:submit`, this.getInputValues());
		});
		this.container.addEventListener('input', (event: InputEvent) => {
			const target = event.target as HTMLInputElement;
			const field = target.name;
			const value = target.value;
			this.events.emit(`${this.formName}:input`, { field, value });
      if(this._inputs.values){
        this.submitButton.disabled = false
      } else{
        this.submitButton.disabled = true
      }
		});

    this._payment.forEach(item => item.addEventListener('click', (evt) => {
      evt.preventDefault();
      const name = item.name
      this.events.emit(`payment:change`,  {item: name}  );
    }))

    
  }

  protected getInputValues() {
		const valuesObject: Record<string, string> = {};
		this._inputs.forEach((element) => {
			valuesObject[element.name] = element.value;
		});
		return valuesObject;
	}

}