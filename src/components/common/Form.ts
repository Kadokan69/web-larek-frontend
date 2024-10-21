import { Component } from '../base/Component';
import { IEvents } from '../base/events';

export abstract class Form<T> extends Component<T> {
	protected _inputs: NodeListOf<HTMLInputElement>;
	protected _formName: string;
	protected _modalActions: HTMLElement;
	protected _submitButton: HTMLButtonElement;

	constructor(protected container: HTMLElement, protected events: IEvents) {
		super(container);
		this._inputs = this.container.querySelectorAll<HTMLInputElement>('.form__input');
		this._modalActions = this.container.querySelector('.modal__actions');
		this._submitButton = this._modalActions.querySelector('.button');
		this._formName = this.container.getAttribute('name');

		this.container.addEventListener('submit', (evt) => {
			evt.preventDefault();
			this.events.emit(`${this._formName}:submit`, this.getInputValues());
		});
		this.container.addEventListener('input', (event: InputEvent) => {
			const target = event.target as HTMLInputElement;
			const field = target.name;
			const value = target.value;
			this.events.emit(`${this._formName}:input`, { [field]: value });
		});
	}
	protected getInputValues() {
		const valuesObject: Record<string, string> = {};
		this._inputs.forEach((element) => {
			valuesObject[element.name] = element.value;
		});
		return valuesObject;
	}

	isValid() {
		this._submitButton.disabled = false;
	}
	noValid() {
		this._submitButton.disabled = true;
	}

	reset() {
		this._inputs.forEach((item) => (item.value = null));
	}
}
