import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

interface IFormData {
    content: HTMLElement;
}

export class Modal extends Component<IFormData>{
    protected _content: HTMLElement;
    protected _buttonClose: HTMLButtonElement;


    constructor(container: HTMLElement,protected events: IEvents){
        super(container)
 
        this._buttonClose = ensureElement<HTMLButtonElement>('.modal__close', container);
        this._content = ensureElement<HTMLElement>('.modal__content', container);

        this._buttonClose.addEventListener('click', this.close.bind(this))
        // this.container.addEventListener('click', this.close.bind(this))
    }

    set content(value: HTMLElement) {
        this._content.replaceChildren(value);
    }

    open() {
        console.log(this.container);
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