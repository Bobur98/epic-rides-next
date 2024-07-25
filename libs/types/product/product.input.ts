import { ProductBrand, ProductCondition, ProductLocation, ProductStatus, ProductType } from '../../enums/product.enum'
import { Direction } from '../../enums/common.enum'

export interface ProductInput {
	productType: ProductType
	productLocation: ProductLocation
	productAddress: string
	productBrand: ProductBrand
	productModel: string
	productYear: number
	productEngine: string
	productEngineCc: number
	productPower: number
	productDesc?: string
	productTorque: number
	productWeight: number
	productPrice: number
	productCondition: ProductCondition
	productBarter?: boolean
	productRent?: boolean
	productImages: string[]

	memberId?: string
}

interface PISearch {
	memberId?: string
	locationList?: ProductLocation[]
	typeList?: ProductType[]
	modelList?: string[]
	engineRange?: string
	engineRangeCc?: Range
	powerRange?: Range
	torqueRange?: Range
	options?: string[]
	pricesRange?: Range
	yearsRange?: YearsRange
	weightRange?: Range
	conditionList?: ProductCondition[]
	brandList?: ProductBrand[]
	text?: string
}

export interface ProductsInquiry {
	page: number
	limit: number
	sort?: string
	direction?: Direction
	search?: PISearch
}

interface APISearch {
	productStatus?: ProductStatus
}

export interface AgentProductsInquiry {
	page: number
	limit: number
	sort?: string
	direction?: Direction
	search: APISearch
}

interface ALPISearch {
	productStatus?: ProductStatus
	productLocationList?: ProductLocation[]
}

export interface AllProductsInquiry {
	page: number
	limit: number
	sort?: string
	direction?: Direction
	search: ALPISearch
}

interface Range {
	start: number
	end: number
}

interface YearsRange {
	start: Date | number
	end: Date | number
}
