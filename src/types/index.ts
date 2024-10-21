export interface IProductItem{
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
  inBasket?: boolean;
}

export interface IOrder{
 payment: string;
 email: string;
 phone: string;
 address: string;
 total: number;
 items: string[];
}

export interface IProductData{
  total: number;
	catalog: IProductItem[];
	priseTotal: number;
}

