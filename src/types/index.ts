export interface IProductList{
  total: number;
  items: IProductItem[];
}

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

export type TCatalogItems = Pick<IProductItem, "category"|"title"|"image"|"price">

export type TBasketItems = Pick<IProductItem, "title"|"price">

export type TProductItemId = Pick<IProductItem, "id">

export type TOrderForm = Pick<IOrder, "payment"|"address">

export type TOrderContact = Pick<IOrder, "email"|"phone">

export type TOrderSucsess = Pick<IOrder, "total">
