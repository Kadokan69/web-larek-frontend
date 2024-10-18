import { AppApi } from './components/AppApi';
import { IEvents, EventEmitter } from './components/base/events';
import { Modal } from './components/common/Modal';
import { ModalBasket } from './components/ModalBasket';
import { OrderForm } from './components/OrderForm';
import { OrderData } from './components/OrderData';
import { Page } from './components/Page';
import { Product } from './components/Product';
import { ProductData } from './components/ProductData';
import './scss/styles.scss';
import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate } from './utils/utils';
import { ContactForm } from './components/ContactForm';
import { Success } from './components/Success';

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
const orderForm = new OrderForm(cloneTemplate(orderTemplate), events);
const contactForm = new ContactForm(cloneTemplate(contactsTemplate), events);
const success = new Success(cloneTemplate(successTemplate), events);
const basket = new ModalBasket(cloneTemplate(basketTemplate), events);

events.onAll((event: { eventName: any; data: any }) => {
	console.log(event.eventName, event.data);
});

//Получаем список массив товаров
api.getProduct().then((res) => {
	productData.setProduct(res);
	events.emit('initialData: loaded');
});

events.on('initialData: loaded', () => {
	const catalog = productData.getProduct().map((item) => {
		const product = new Product(cloneTemplate(productTemplateCatalog), events);
		return product.render(item);
	});
	page.render({ catalog: catalog });
});

events.on('product:select', (product: { id: string }) => {
	const productItem = productData.getProduct().find((item) => item.id === product.id);
	const productModal = new Product(cloneTemplate(productPreviewTemplate), events);
	modal.render({ content: productModal.render(productItem) });
});

events.on('product:submit', (product: { id: string }) => {
	productData.getProduct().find((item) => item.id === product.id).inBasket = true;
	const productModal = new Product(cloneTemplate(productPreviewTemplate), events);
	page.counter = productData.getProduct().filter((item) => item.inBasket === true).length;
	modal.render({ content: productModal.render(productData.getProduct().find((item) => item.id === product.id)) });
});

events.on('basket:open', () => {
	const productItem = productData.getProduct().filter((item) => item.inBasket === true);
	const products = productItem.map((item) => {
		const productModal = new Product(cloneTemplate(productBasketTemplate), events);
		productModal.index = productItem.findIndex((items) => items.id === item.id);
		return productModal.render(item);
	});
	basket.setTotal(productData.getTotal(productItem));
	basket.setBasket(products);
	modal.render({ content: basket.render() });
});

events.on('basket:delete', (product: { id: string }) => {
	productData.getProduct().find((item) => item.id === product.id).inBasket = false;
	const productItem = productData.getProduct().filter((item) => item.inBasket === true);
	const products = productItem.map((item) => {
		const productModal = new Product(cloneTemplate(productBasketTemplate), events);
		productModal.index = productItem.findIndex((items) => items.id === item.id);
		return productModal.render(item);
	});
	basket.setTotal(productData.getTotal(productItem));
	basket.setBasket(products);
	page.counter = productData.getProduct().filter((item) => item.inBasket === true).length;
	modal.render({ content: basket.render() });
});

events.on('basket:submit', () => {
	const productId = productData
		.getProduct()
		.filter((item) => item.inBasket === true)
		.map((item) => {
			return item.id;
		});
	orderData.items = productId;
	orderData.total = productData.getTotal(productData.getProduct().filter((item) => item.inBasket === true));

	modal.render({ content: orderForm.render() });
	console.log(orderData);
});

events.on('payment:change', (data: { item: string }) => {
	orderData.payment = data.item;
	orderForm.togglePaymant(orderData.payment);
});

events.on('order:input', (data) => {
	Object.assign(orderData, data);
	console.log(orderData);

	if (orderData.address && orderData.payment) {
		orderForm.isValid();
	}
});

events.on('order:submit', () => {
	modal.render({ content: contactForm.render() });
});

events.on('contacts:input', (data) => {
	Object.assign(orderData, data);

	if (orderData.email && orderData.phone) {
		contactForm.isValid();
	}
});

events.on('contacts:submit', () => {
	api
		.setOrder(orderData.getOrder())
		.then((res) => {
			productData.getProduct().forEach((item) => (item.inBasket = false));
			page.counter = productData.getProduct().filter((item) => item.inBasket === true).length;
			orderForm.reset();
			contactForm.reset();
			orderData.reset();
			modal.close();
			events.emit('order:success', res);
		})
		.catch((err) => console.error(err));
});

events.on('order:success', (res: { id: string; total: number }) => {
	success.total = res.total;
	modal.render({ content: success.render() });
});

// Блокируем прокрутку страницы если открыта модалка
events.on('modal:open', () => {
	page.locked = true;
});

// ... и разблокируем
events.on('modal:close', () => {
	page.locked = false;
});
