export interface IProductItem{
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
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


export type TCatalogItems = Pick<IProductItem, "category"|"title"|"image"|"price">

export type TBasketItems = Pick<IProductItem, "id"|"title"|"price">

export type TProductItemId = Pick<IProductItem, "id">

export type TOrderForm = Pick<IOrder, "payment"|"address"|"email"|"phone">
