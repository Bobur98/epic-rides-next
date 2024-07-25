import { ProductCondition, ProductLocation, ProductStatus, ProductType } from '../../enums/product.enum';
import { Member } from '../member/member';

export interface MeLiked {
	memberId: string;
	likeRefId: string;
	myFavorite: boolean;
}

export interface TotalCounter {
	total: number;
}

export interface Product {
	_id: string;
	productType: ProductType;
	productStatus: ProductStatus;
	productLocation: ProductLocation;
	productAddress: string;
	productBrand: string;
	productModel: number;
	productYear: number;
	productEngine: string;
	productEngineCc: number;
	productPower: number;
	productDesc?: string;
	productTorque: number;
	productWeight: number;
	productPrice: number;
	productCondition: ProductCondition;
	productViews: number;
	productLikes: number;
	productComments: number;
	productRank: number;
	productImages: string[];
	productBarter: boolean;
	productRent: boolean;
	memberId: string;
	soldAt?: Date;
	deletedAt?: Date;
	createdAt: Date;
	updatedAt: Date;
	/** from aggregation **/
	meLiked?: MeLiked[];
	memberData?: Member;
}

export interface Products {
	list: Product[];
	metaCounter: TotalCounter[];
}
