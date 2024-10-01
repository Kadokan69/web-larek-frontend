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
  items: TCardId[];
}

export type TCatalogItems = Pick<IProductItem, "category"|"title"|"image"|"price">

export type TBasketItems = Pick<IProductItem, "title"|"price">

export type TCardId = Pick<IProductItem, "id">
