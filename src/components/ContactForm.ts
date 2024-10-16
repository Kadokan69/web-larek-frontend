import { IEvents } from "./base/events";
import { Form } from "./common/Form";


interface IContactForm{
  content: HTMLElement;
}

export class ContactForm extends Form<IContactForm>{
  

  constructor(container: HTMLElement,protected events: IEvents){
    super(container, events);
    
  }
}