import { AppApi } from './components/AppApi';
import { Api } from './components/base/api';
import { IEvents, EventEmitter } from './components/base/events';
import { Modal } from './components/common/Modal';
import { OrderData } from './components/OrderData';
import { Page } from './components/Page';
import { Product } from './components/Product';
import { ProductData } from './components/ProductData';
import './scss/styles.scss';
import { IApi, IOrder } from './types';
import { API_URL, CDN_URL ,settings } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';




const events: IEvents = new EventEmitter();


const api = new AppApi(CDN_URL, API_URL);

const productData = new ProductData(events)
const orderData = new OrderData(events)

const productTemplateCatalog: HTMLTemplateElement = document.querySelector('#card-catalog');
const pageElement: HTMLElement = document.querySelector('.page')
const successElemant = ensureElement<HTMLElement>('#success')
const page = new Page(pageElement, events)
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
console.log(modal);



events.onAll((event: { eventName: any; data: any; }) => {
    console.log(event.eventName, event.data)
})


//Получаем список массив товаров
api.getProduct().then((res) => {
    console.log(res)
    productData.productCard = res; 
    events.emit('initialData: loaded')
})
// api.setOrder(order.getOrder()).then(res => console.log(res)).catch(err => console.error(err))

events.on('initialData: loaded', () => {
    const productArray = productData.productCard.map((item) => {
        const productInstans = new Product(cloneTemplate(productTemplateCatalog), events);
        return productInstans.render(item)
    })

    page.render({catalog: productArray})
})

events.on('product:select', modal.open)

events.on('basket:open', modal.render)



