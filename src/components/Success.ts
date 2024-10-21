import { Component } from './base/Component';
import { IEvents } from './base/events';

interface ISuccess {
	content: HTMLElement;
}

export class Success extends Component<ISuccess> {
	protected _total: HTMLElement;
	protected _button: HTMLButtonElement;

	constructor(protected container: HTMLElement, protected events: IEvents) {
		super(container);
		this._total = this.container.querySelector('.order-success__description');
		this._button = this.container.querySelector('.order-success__close');

		this._button.addEventListener('click', (evt) => {
			this.events.emit(`success:submit`);
		});
	}

	set total(total: number) {
		this._total.textContent = `Списано ${String(total)} синапсов`;
	}
}
