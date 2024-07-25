import { ProductCondition, ProductLocation, ProductStatus, ProductType } from '../../enums/product.enum';

export interface ProductUpdate {
	_id: string;
	productType?: ProductType;
	productStatus?: ProductStatus;
	productLocation?: ProductLocation;
	productAddress?: string;
	productBrand: string;
	productModel: number;
	productYear: number;
	productEngine: string;
	productEngineCc: number;
	productPower: number;
	productDesc?: string;
	productTorque: number;
	productWeight: number;
	productPrice?: number;
	productCondition: ProductCondition;
	productImages?: string[];
	productBarter?: boolean;
	productRent?: boolean;
	soldAt?: Date;
	deletedAt?: Date;
	constructedAt?: Date;
}
