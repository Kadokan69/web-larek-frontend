# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
## Данные и типы данных, используемые в приложении

Карточка товара

```
interface IProductItem{
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
  inBasket?: boolean;
}
```

Данные при оформлении заказа

```
interface IOrder{
  payment: string;
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
}
```

Интерфейс для модели данных карточек товара

```
interface IProductData{
  total: number;
	catalog: IProductItem[];
	priseTotal: number;
  setProduct(items: IProductItem[])
  getProduct()
  getTotal(items: IProductItem[])
}
```


## Архитектура приложения

Код приложения разделен на слои согласно парадигме MVP: 
- слой представления, отвечает за отображение данных на странице, 
- слой данных, отвечает за хранение и изменение данных
- презентер, отвечает за связь представления и данных.

### Базовый код

#### Класс Api
Содержит в себе базовую логику отправки запросов. В конструктор передается адрес с контентом и базовый адрес сервера.
Методы: 
- `get` - выполняет GET запрос на переданный в параметрах ендпоинт и возвращает промис с объектом, которым ответил сервер
- `post` - принимает объект с данными, которые будут переданы в JSON в теле запроса, и отправляет эти данные на ендпоинт переданный как параметр при вызове метода. По умолчанию выполняется `POST` запрос, но метод запроса может быть переопределен заданием третьего параметра при вызове.

#### Класс EventEmitter
Брокер событий позволяет отправлять события и подписываться на события, происходящие в системе. Класс используется в презентере для обработки событий и в слоях приложения для генерации событий.  
Основные методы, реализуемые классом описаны интерфейсом `IEvents`:
- `on` - подписка на событие
- `emit` - инициализация события
- `onAll` - слушать все события

### Слой данных

#### Класс ProductData
Класс отвечающий за хранение данных с сервера и логику работы с ними\
Конструктор класса принимает инстант брокера событий\
В полях класса хранятся следующие данные:
- total: number - Количество карточек товара
- catalog: IProductItem[] - массив объектов карточек товара

Так же класс предоставляет набор методов для взаимодействия с этими данными\
- setProduct(items: IProductItem[]): void - добавляет массив товаров в каталог
- getProduct(): IProductItem[] - получить товары из каталога
- getTotal(items: IProductItem[]): number - получить общую стоисомть запрошеных товаров

#### Класс OrderData
Класс отвечающий за хранение данных с форм и логику работы с ними\
Конструктор класса принимает инстант брокера событий\
В полях класса хранятся следующие данные:
- payment: string - Способ олпаты
- email: string - Почта покупателя
- phone: string - Телефон покупателя
- address: string - Адрес покупателя
- total: number - Общая сумма заказа
- items: string[]; - id товаров

Так же класс предоставляет набор методов для взаимодействия с этими данными\
- setItems(item: string[]): void - сохраняет список переданых id товаров 
- setTotal(value: number): void - сохраняет общую сумму заказа
- getPayment(): string - возвращает метот оплаты
- checkValidOrder(): void - проверка заполнености пойлей в Форме заказа
- checkValidContact(): void - проверка заполнености пойлей в Форме котактов
- getOrder(): void - возвращает поля класса
- reset(): void - сбрасывает все поля класса

### Классы представления
Все классы представления отвечают за отображение внутри контейнера (DOM-элемент) передаваемых в них данных.

#### Базовый Класс Component
Класс является дженериком и родителем всех компонентов слоя представления. В дженерик принимает тип объекта, в котором данные будут передаваться в метод render для отображения данных в компоненте. В конструктор принимает элемент разметки, являющийся основным родительским контейнером компонента. Содержит метод render, отвечающий за сохранение полученных в параметре данных в полях компонентов через их сеттеры, возвращает обновленный контейнер компонента.

#### Класс Modal
Отвечает за отображение модального окна. Класс используется для отображения различных модальных окон на сайте. В конструктор класса передается DOM элемент темплейта, что позволяет при необходимости формировать содержимое модального окна разных вариантов верстки. В классе устанавливаются слушатели на все интерактивные элементы, в результате взаимодействия с которыми пользователя генерируются соответствующие события.\

Поля класса содержат элементы разметки модальных окон. Конструктор, кроме темплейта принимает экземпляр `EventEmitter` для инициации событий.\
Поля класса:
- _buttonClose: HTMLButtonElement; - Кнопка закрытия модального окна
- _content: HTMLElement - Контент модального окна

Предоставляет методы `open` и `close` для управления отображением модального окна. Устанавливает слушатели для закрытия модального окна по клику в оверлей и кнопку-крестик для закрытия попапа.\
Расширяет метот `render` родительского класса Component/
- сеттер content для добавления контента в модальку 


 #### Класс ModalBasket
Предназначен для реализации списка товаров в корзине в модальном окне и начао оформления заказа. При сабмите инициирует событее перехода к следующиму шагу оформления заказа.

Поля класса:
 - _catalog: HTMLElement - Элемент списка с карточками товара товара 
 - _basketButton: HTMLButtonElement - Элемент кнопки оформления заказа
 - _basketPrice: HTMLElement - Элемент общей суммы заказа

- constructor(protected container: HTMLElement, protected events: IEvents) Конструктор принимает разметкук корзины и экземпляр класса `EventEmitter` для возможности инициации событий.
Методы класса:
- setBasket(productData: HTMLElement[]) - метод принимает массив карточке и добовляет их в список
- setTotal(value: number) - устанавливает общую сумму всех товаров в корзине
- toggleButton(data: IProductItem[]) - активирует и деактивирует кнопку корзины.

 #### Класс Form
 Абстрактный класс, наследующий класс Component. Содержит общие поля и методы для дочерних классов OrderForm и ContactForm:/
 Поля класса:
- _inputs: NodeListOf<HTMLInputElement> - импуты формы
- _formName: string - имя формы
- _modalActions: HTMLElement - обертка кнопки формы
- _submitButton: HTMLButtonElement - кнопка формы

Методы класса:
- isValid(): void - меняет активность кнопки на активную
- noValid(): void - меняет активность кнопки на неактивную
- reset(): void - сбрасывает инпуты
- getInputValues(): Record<string, string> - возвращает объект с данными из полей формы, где ключ - name инпута, значение - данные введенные пользователем

 #### Класс OrderForm
 Предназначен для реализации модального окна с формой содержащей поле ввода и выбора способа оплаты. При изменении данных в полях ввода инициирует событие изменения данных. Предоставляет методы для отображения ошибок и управления активностью кнопки.\

- constructor(container: HTMLElement, events: IEvents) Конструктор принимает разметкук корзины и экземпляр класса `EventEmitter` для возможности инициации событий.

Поля класса:
- _payment: NodeListOf<HTMLButtonElement> - коллекция кнопок способа оплаты

Методы класса:
- togglePaymant(data: string): void - меняет отобрадение кнопок способа оплаты

 #### Класс ContactForm
Предназначен для реализации модального окна с формой контакты содержащие поля ввода. При изменении данных в полях ввода инициирует событие изменения данных. Предоставляет методы для отображения ошибок и управления активностью кнопки.\

- constructor(container: HTMLElement, events: IEvents) Конструктор принимает разметкук корзины и экземпляр класса `EventEmitter` для возможности инициации событий.


#### Класс Success
Предназначен для отобжражения об успешном оформлении заказа. 

Поля класса:
 - _total: HTMLElement - общая сумма заказа
 - _button: HTMLButtonElement - кнопка закрытия формы

 - constructor(container: HTMLElement, events: IEvents) Конструктор принимает разметкук успешного оформления заказа и экземпляр класса `EventEmitter` для возможности инициации событий.
 - set total -  для передачи общей суммы заказа

#### Класс Product
Отвечает за отображение карточки товара, задавая данные названия, изображения, стоимость, описания, категории. Класс используется для отображения карточек на странице сайта, в модальном окне и корзине. В конструктор класса передается DOM элемент темплейта, что позволяет при необходимости формировать карточки разных вариантов верстки. В классе устанавливаются слушатели на все интерактивные элементы, в результате взаимодействия с которыми пользователя генерируются соответствующие события.\
Поля класса содержат элементы разметки элементов карточки. Конструктор, кроме темплейта принимает экземпляр `EventEmitter` для инициации событий.\
Полях класса:
- description?: HTMLElement - Элемент с описание товара
- image?: HTMLImageElement - Элемент с изображением товара
- title: HTMLElement - Элемент с названием товара
- category?: HTMLElement - Элемент с категорией товара 
- price: HTMLElement - Элемент с ценой товара
- button?: HTMLButtonElement - Элемент с кнопкой добавления в корзину
- _index?: HTMLElement - Номер карточки товара в корзине
- _delete?: HTMLElement - Кнопка удаления товара из корзины
- _inBasket?: boolean - Признак карточки товара находящейся в корзине

Методы:
Расширяет метот `render` родительского класса Component/
- сеттер price - проверяет и устанавливает ценну товара
- сеттер index - устанавливае номер товара в списке товаров в корзине
- сеттер title - устанавливает название товара
- сеттер id - устанавливает id товара для передачи в событиях

#### Класс Page
Отвечает за отображение блока с карточками товара на главной странице и кнопкой корзины с информацией о количестве товара в ней.
Принимает в конструктор контейнер - элемент разметки блока и экземпляр `EventEmitter` для инициации событий при нажатии пользователем на кнопку корзины. Предоставляет сеттер `counter` для установки количества товаров в корзине, сеттер `catalog` для добавления карточек товара на страницу, сеттер `locked` для блокировки окна модального окна
Поля класса:
- _catalog: HTMLElement; - Элемент разметки каталога карточек товара
- _basket: HTMLButtonElement - Кнопка корзины
- _counter: HTMLElement - Счетчик товаров в корзине


### Слой коммуникации

#### Класс AppApi
Принимает в конструктор экземпляр класса Api и предоставляет методы реализующие взаимодействие с бэкендом сервиса.

## Взаимодействие компонентов
Код, описывающий взаимодействие представления и данных между собой находится в файле `index.ts`, выполняющем роль презентера.\
Взаимодействие осуществляется за счет событий генерируемых с помощью брокера событий и обработчиков этих событий, описанных в `index.ts`\
В `index.ts` сначала создаются экземпляры всех необходимых классов, а затем настраивается обработка событий.

*Список всех событий, которые могут генерироваться в системе:*\
*События изменения данных (генерируются классами моделями данных)*
- `initialData: loaded` - Успешное получение карточек товара с сервера
- `formOrder:valid` - Валидная форма заказа
- `formOrder:novalid` - Невалидная форма заказа
- `formContact:valid` - Валидная форма с контактами 
- `formContact:novalid` - Невалидная форма с контактами
- `order:success` - Успешная отправка заказа на сервер

*События, возникающие при взаимодействии пользователя с интерфейсом (генерируются классами, отвечающими за представление)*

- `product:select` - Выбор товара
- `product:submit` - Добавление товара в корзину
- `basket:open` - Открытие корзины
- `basket:delete` - Удаление товара из корзины
- `basket:submit` - Начало оформление заказа
- `order:input` - Заполнение инпутов адреса
- `order:submit` - Успешное завершение формы с выбором оплаты и заполнение адреса
- `contacts:input` - Заполнение инпутов контактов
- `contacts:submit` - Успешное заполнение формы контакты
- `success:submit` - Кнопка закрытия окна подтверждения заказа
- `modal:open` - Открытие модального окна
- `modal:close` - Закрытие модального окна

### Ссылка на страницу проекта
<https://kadokan69.github.io/web-larek-frontend/>
