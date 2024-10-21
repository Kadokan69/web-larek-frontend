import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { IEvents } from '../base/events';

interface IFormData {
	content: HTMLElement | HTMLElement[];
}

export class Modal extends Component<IFormData> {
	protected content: HTMLElement;
	protected buttonClose: HTMLButtonElement;

	constructor(protected container: HTMLElement, protected events: IEvents) {
		super(container);

		this.buttonClose = ensureElement<HTMLButtonElement>('.modal__close', container);
		this.content = ensureElement<HTMLElement>('.modal__content', container);

		this.buttonClose.addEventListener('click', this.close.bind(this));
		this.container.addEventListener('click', this.close.bind(this));
		this.content.addEventListener('click', (event) => event.stopPropagation());
	}

	set _content(value: HTMLElement) {
		this.content.replaceChildren(value);
	}

	open() {
		this.container.classList.add('modal_active');
		this.events.emit('modal:open');
	}

	close() {
		this.container.classList.remove('modal_active');
		this.content = null;
		this.events.emit('modal:close');
	}

	render(data: IFormData): HTMLElement {
		super.render(data);
		this.open();
		return this.container;
	}
}
