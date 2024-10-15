import { AppApi } from './components/AppApi';
import { Api } from './components/base/api';
import { IEvents, EventEmitter } from './components/base/events';
import { Modal } from './components/common/Modal';
import { ModalBasket } from './components/ModalBasket';
import { Order } from './components/Order';
import { OrderData } from './components/OrderData';
import { Page } from './components/Page';
import { Product } from './components/Product';
import { ProductData } from './components/ProductData';
import './scss/styles.scss';
import { IApi, IOrder, IProductItem } from './types';
import { API_URL, CDN_URL, settings } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';

const events: IEvents = new EventEmitter();

const api = new AppApi(CDN_URL, API_URL);

const productData = new ProductData(events);
const orderData = new OrderData(events);

const productTemplateCatalog: HTMLTemplateElement = document.querySelector('#card-catalog');
const pageElement: HTMLElement = document.querySelector('.page');
const modalElement: HTMLElement = document.querySelector('#modal-container');
const successTemplate: HTMLTemplateElement = document.querySelector('#success');
const basketTemplate: HTMLTemplateElement = document.querySelector('#basket');
const orderTemplate: HTMLTemplateElement = document.querySelector('#order');
const contactsTemplate: HTMLTemplateElement = document.querySelector('#contacts');
const productBasketTemplate: HTMLTemplateElement = document.querySelector('#card-basket');
const productPreviewTemplate: HTMLTemplateElement = document.querySelector('#card-preview');
const page = new Page(pageElement, events);
const modal = new Modal(modalElement, events);
const order = new OrderData(events);
const basket = new ModalBasket(cloneTemplate(basketTemplate), events);
console.log(modal.content);

events.onAll((event: { eventName: any; data: any }) => {
	console.log(event.eventName, event.data);
});

//Получаем список массив товаров
api.getProduct().then((res) => {
	productData.productCard = res;
	events.emit('initialData: loaded');
});
// api.setOrder(order.getOrder()).then(res => console.log(res)).catch(err => console.error(err))

events.on('initialData: loaded', () => {
	const productArray = productData.productCard.map((item) => {
		const productInstans = new Product(cloneTemplate(productTemplateCatalog), events);
		return productInstans.render(item);
	});
	console.log(productData.productCard);

	page.render({ catalog: productArray });
});

//Модальное окно с товаром
events.on('product:select', (data: { product: IProductItem }) => {
	const productItem = new Product(cloneTemplate(productPreviewTemplate), events);
	const { product } = data;
	const id = productData.getProduct(product.id);
	modal.render({ content: productItem.render(id) });
});

//Добавление товара в корзину
events.on('product:submit', (data: { product: IProductItem }) => {
	order._items = data.product.id;
});

//Количество товаров в кнопке корзина
events.on('orderItems:change', (data: { product: string[] }) => {
	page.counter = String(data.product.length);
});

// Блокируем прокрутку страницы если открыта модалка
events.on('modal:open', () => {
	page.locked = true;
});

// ... и разблокируем
events.on('modal:close', () => {
	page.locked = false;
});



// Корзина

// Добавление товра в корзину
events.on('basket:open', () => {
	if (order.items) {
		let total = 0;
		const arr = order.items.map((item) => {
			const productItem = new Product(cloneTemplate(productBasketTemplate), events);
			productItem.index = order.items.indexOf(item) + 1;
			total = total + productData.getProduct(item).price;
			basket.total = total;
			console.log(productData.getProduct(item).price);
			
			return productItem.render(productData.getProduct(item));
		});
		
		modal.render({ content: basket.render({ catalog: arr }) });
	}
});

//Удаление товара из корзины
events.on('basket:delete', (data:{ product: IProductItem } ) => {
		const arri = order.items.filter(item => item !== data.product.id)
		order.items = arri
		
		let total = 0;
		const arr = order.items.map((item) => {
			const productItem = new Product(cloneTemplate(productBasketTemplate), events);
			productItem.index = order.items.indexOf(item) + 1;
			total = total + productData.getProduct(item).price;
			basket.total = total;
			console.log(productData.getProduct(item).price);
			
			return productItem.render(productData.getProduct(item));
		});
		
		modal.render({ content: basket.render({ catalog: arr }) });
		events.emit('orderItems:change', ({product: order.items}))
})

//Форма оформления заказа

events.on('basket:submit', () => {
	const orderForem = new Order(cloneTemplate(orderTemplate), events)
	modal.render({content: orderForem.render()})
})


events.on('payment:change', (data:{item: string}) => {
	order._payment = data.item;
})

events.on('order:submit', (data:{ address: string}) => {
	order._address = data.address;
	console.log(order);
	
})

//Форма контакты