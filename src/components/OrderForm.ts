import { IEvents } from "./base/events";
import { Form } from "./common/Form";


interface IOrederForm{
  content: HTMLElement;
}

export class Order extends Form<IOrederForm>{
  protected _payment: NodeListOf<HTMLButtonElement>;
  

  constructor(container: HTMLElement,protected events: IEvents){
    super(container, events);
    this._payment = this.container.querySelectorAll('.button_alt');
    
    this._payment.forEach(item => item.addEventListener('click', () => {
      const name = item.name
      this.events.emit(`payment:change`,  {item: name}  );
    }))
  }
}