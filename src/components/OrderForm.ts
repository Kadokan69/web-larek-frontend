import { IEvents } from './base/events';
import { Form } from './common/Form';

interface IOrederForm {
	content: HTMLElement;
}

export class OrderForm extends Form<IOrederForm> {
	protected payment: NodeListOf<HTMLButtonElement>;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container, events);
		this.payment = this.container.querySelectorAll('.button_alt');
		this.payment.forEach((item) =>
			item.addEventListener('click', () => {
				this.events.emit(`order:input`, { payment: item.name });
			})
		);
	}

	togglePaymant(data: string) {
		this.payment.forEach((item) => {
			if (item.name === data) {
				item.classList.replace('button_alt', 'button_alt-active');
			} else {
				item.classList.replace('button_alt-active', 'button_alt');
			}
		});
	}
}
