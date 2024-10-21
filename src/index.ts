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

events.onAll((event: { eventName: string; data: string }) => {
	console.log(event.eventName, event.data);
});

//Получаем массив товаров с сервера
api.getProduct().then((res) => {
	productData.setProduct(res);
	orderData.reset();
	events.emit('initialData: loaded');
});

//Добавление товаров на страницу
events.on('initialData: loaded', () => {
	const catalogi = productData.getProduct().map((item) => {
		const product = new Product(cloneTemplate(productTemplateCatalog), events);
		return product.render(item);
	});
	page.render({ _catalog: catalogi });
});

//Модальное окно с товаром
events.on('product:select', (product: { id: string }) => {
	const productItem = productData.getProduct().find((item) => item.id === product.id);
	const productModal = new Product(cloneTemplate(productPreviewTemplate), events);
	modal.render({ content: productModal.render(productItem) });
});

//Добавление товара в корзину
events.on('product:submit', (product: { id: string }) => {
	productData.getProduct().find((item) => item.id === product.id).inBasket = true;
	const productModal = new Product(cloneTemplate(productPreviewTemplate), events);
	page._counter = productData.getProduct().filter((item) => item.inBasket === true).length;
	modal.render({ content: productModal.render(productData.getProduct().find((item) => item.id === product.id)) });
});

//Открытие модального окна с корзиной
events.on('basket:open', () => {
	const productItem = productData.getProduct().filter((item) => item.inBasket === true);
	const products = productItem.map((item) => {
		const productModal = new Product(cloneTemplate(productBasketTemplate), events);
		productModal._index = productItem.findIndex((items) => items.id === item.id);
		return productModal.render(item);
	});
	basket.setTotal(productData.getTotal(productItem));
	basket.setBasket(products);
	basket.toggleButton(productItem);
	modal.render({ content: basket.render() });
});

//Удаление товара из корзины
events.on('basket:delete', (product: { id: string }) => {
	productData.getProduct().find((item) => item.id === product.id).inBasket = false;
	const productItem = productData.getProduct().filter((item) => item.inBasket === true);
	const products = productItem.map((item) => {
		const productModal = new Product(cloneTemplate(productBasketTemplate), events);
		productModal._index = productItem.findIndex((items) => items.id === item.id);
		return productModal.render(item);
	});
	basket.setTotal(productData.getTotal(productItem));
	basket.setBasket(products);
	basket.toggleButton(productItem);
	page._counter = productData.getProduct().filter((item) => item.inBasket === true).length;
	modal.render({ content: basket.render() });
});

//Переход к оформлению заказ
events.on('basket:submit', () => {
	const product = productData.getProduct().filter((item) => item.inBasket === true);
	orderData.setItems(product.map((item) =>  {return item.id}))
	orderData.setTotal(productData.getTotal(product));
	orderData.checkValidOrder();
	orderForm.togglePaymant(orderData.getPayment());
	modal.render({ content: orderForm.render() });
});

//Проверка валидации в форме заказ
events.on('order:input', (data) => {
	Object.assign(orderData, data);
	orderData.checkValidOrder();
	orderForm.togglePaymant(orderData.getPayment());
});

//Переход к форме контактов
events.on('order:submit', () => {
	orderData.checkValidContact();
	modal.render({ content: contactForm.render() });
});

//Проверка валидации формы контакты
events.on('contacts:input', (data) => {
	Object.assign(orderData, data);
	orderData.checkValidContact();
});

//Включение кнопки оформелния заказа
events.on('form:valid', () => {
	orderForm.isValid();
	contactForm.isValid();
});

//Отключение кнопки оформления заказа
events.on('form:novalid', () => {
	orderForm.noValid();
	contactForm.noValid();
});

//Отправка заказ на сервер
events.on('contacts:submit', () => {
	api
		.setOrder(orderData.getOrder())
		.then((res) => {
			productData.getProduct().forEach((item) => (item.inBasket = false));
			page._counter = productData.getProduct().filter((item) => item.inBasket === true).length;
			orderForm.reset();
			contactForm.reset();
			orderData.reset();
			modal.close();
			events.emit('order:success', res);
		})
		.catch((err) => console.error(err));
});

//Открытие модального окна с подтверждением заказа
events.on('order:success', (res: { id: string; total: number }) => {
	success._total = res.total;
	modal.render({ content: success.render() });
});

//Закрытие модального окна с подтверждением заказа
events.on('success:submit', () => modal.close());

// Блокируем прокрутку страницы если открыта модалка
events.on('modal:open', () => {
	page.locked = true;
});

// ... и разблокируем
events.on('modal:close', () => {
	page.locked = false;
});
