import { Component } from './base/Component';
import { IEvents } from './base/events';

interface ISuccess {
	content: HTMLElement;
}

export class Success extends Component<ISuccess> {
	protected total: HTMLElement;
	protected button: HTMLButtonElement;

	constructor(protected container: HTMLElement, protected events: IEvents) {
		super(container);
		this.total = this.container.querySelector('.order-success__description');
		this.button = this.container.querySelector('.order-success__close');

		this.button.addEventListener('click', (evt) => {
			this.events.emit(`success:submit`);
		});
	}

	set _total(total: number) {
		this.total.textContent = `Списано ${String(total)} синапсов`;
	}
}
