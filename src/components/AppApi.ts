import { IOrder, IProductItem} from '../types';
import { ApiListResponse, Api } from './base/api';

export interface IAuctionAPI {
	getProduct: () => Promise<IProductItem[]>;
	setOrder: (data: IOrder) => Promise<IOrder>;
}

export class AppApi extends Api implements IAuctionAPI {
	readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	getProduct(): Promise<IProductItem[]> {
		return this.get(`/product`).then((data: ApiListResponse<IProductItem>) =>
			data.items.map((item) => ({
				...item,
				image: this.cdn + item.image,
			}))
		);
	}

	setOrder(data: IOrder): Promise<IOrder> {
		return this.post(`/order`, data, 'POST').then((res: IOrder) => res);
	}
}
