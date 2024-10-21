import { IEvents } from './base/events';
import { Form } from './common/Form';

interface IOrederForm {
	content: HTMLElement;
}

export class OrderForm extends Form<IOrederForm> {
	protected _payment: NodeListOf<HTMLButtonElement>;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container, events);
		this._payment = this.container.querySelectorAll('.button_alt');
		this._payment.forEach((item) =>
			item.addEventListener('click', () => {
				this.events.emit(`order:input`, { payment: item.name });
			})
		);
	}

	togglePaymant(data: string) {
		this._payment.forEach((item) => {
			if (item.name === data) {
				item.classList.replace('button_alt', 'button_alt-active');
			} else {
				item.classList.replace('button_alt-active', 'button_alt');
			}
		});
	}
}
