import { Component } from '../base/Component';
import { IEvents } from '../base/events';

export abstract class Form<T> extends Component<T> {
	protected _inputs: NodeListOf<HTMLInputElement>;
	protected formName: string;
	protected errors: HTMLElement;
	protected modalActions: HTMLElement;
	protected submitButton: HTMLButtonElement;

	constructor(protected container: HTMLElement, protected events: IEvents) {
		super(container);
		this._inputs = this.container.querySelectorAll<HTMLInputElement>('.form__input');
		this.modalActions = this.container.querySelector('.modal__actions');
		this.submitButton = this.modalActions.querySelector('.button');
		this.formName = this.container.getAttribute('name');

		this.container.addEventListener('submit', (evt) => {
			evt.preventDefault();
			this.events.emit(`${this.formName}:submit`, this.getInputValues());
		});
		this.container.addEventListener('input', (event: InputEvent) => {
			const target = event.target as HTMLInputElement;
			const field = target.name;
			const value = target.value;
			this.events.emit(`${this.formName}:input`, { [field]: value });
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
		this.submitButton.disabled = false;
	}
	noValid() {
		this.submitButton.disabled = true;
	}

	reset() {
		this._inputs.forEach((item) => (item.value = null));
	}
}
