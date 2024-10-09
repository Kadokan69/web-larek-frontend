export interface IProductItem{
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number;
}

export interface IOrder{
  payment: string;
  email: string;
  phone: string;
  address: string;
  total: number;
  items: TProductItemId[];
}

export interface IProductData{
  total: number;
  products: IProductItem[];
  preview: string | null;
  getProduct(productId: string): IProductItem;
}

export interface IOrderData{
  setOrder(dataOrder: IOrder): void;
  getOrder(): IOrder;
  checkValidation(data: Record<keyof TOrderForm, string>): boolean;
}


export type TCatalogItems = Pick<IProductItem, "category"|"title"|"image"|"price">

export type TBasketItems = Pick<IProductItem, "title"|"price">

export type TProductItemId = Pick<IProductItem, "id">

export type TOrderForm = Pick<IOrder, "payment"|"address"|"email"|"phone">

export type TOrderSucsess = Pick<IOrder, "total">
