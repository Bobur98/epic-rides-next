import React, { useState } from 'react';
import { Stack, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import TopProductCard from './TopProductCard';
import { ProductsInquiry } from '../../types/product/product.input';
import { Product } from '../../types/product/product';
import { GET_PRODUCTS } from '../../../apollo/user/query';
import { useMutation, useQuery } from '@apollo/client';
import { T } from '../../types/common';
import { Message } from '../../enums/common.enum';
import { sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../sweetAlert';
import { LIKE_TARGET_PRODUCT } from '../../../apollo/user/mutation';
import { useRouter } from 'next/router'

interface TopProductsProps {
	initialInput: ProductsInquiry
}

const TopProducts = (props: TopProductsProps) => {
	const { initialInput } = props
	const device = useDeviceDetect()
	const [topProducts, setTopProducts] = useState<Product[]>([])
	const router = useRouter()
	/** APOLLO REQUESTS **/
	const [likeTargetProduct, { error: createError }] = useMutation(LIKE_TARGET_PRODUCT, {
		onError: (error) => {
			router.push('/_error')
		},
	}) // POST METHOD like postman

	const {
		loading: getProductsLoading,
		data: getProductsData,
		error: getProductsError,
		refetch: getProductsRefetch,
	} = useQuery(GET_PRODUCTS, {
		fetchPolicy: 'cache-and-network',
		variables: { input: initialInput },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setTopProducts(data?.getProducts?.list)
		},
	})
	if (getProductsError) {
		router.push('/_error')
	}
	/** HANDLERS **/
	const likeProductHandler = async (user: T, id: string) => {
		try {
			if (!id) return
			if (!user._id) throw new Error(Message.SOMETHING_WENT_WRONG)

			// execute likeTargetProduct Mutation
			await likeTargetProduct({
				variables: { input: id },
			})
			await getProductsRefetch({ input: initialInput })
			await sweetTopSmallSuccessAlert('success', 800)
		} catch (err: any) {
			console.log('ERROR, likeProductHandler:', err.message)
			sweetMixinErrorAlert(err.message).then()
		}
	}

	if (device === 'mobile') {
		return (
			<Stack className={'top-products'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<span>Top products</span>
					</Stack>
					<Stack className={'card-box'}>
						<Swiper
							className={'top-product-swiper'}
							slidesPerView={'auto'}
							centeredSlides={true}
							spaceBetween={15}
							modules={[Autoplay]}
						>
							{topProducts.map((product: Product) => {
								return (
									<SwiperSlide className={'top-product-slide'} key={product?._id}>
										<TopProductCard product={product} likeProductHandler={likeProductHandler} />
									</SwiperSlide>
								)
							})}
						</Swiper>
					</Stack>
				</Stack>
			</Stack>
		)
	} else {
		return (
			<Stack className={'top-products'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<Box component={'div'} className={'left'}>
							<span>Top products</span>
							<p>Check out our Top Products</p>
						</Box>
						<Box component={'div'} className={'right'}>
							<div className={'pagination-box'}>
								<WestIcon className={'swiper-top-prev'} />
								<div className={'swiper-top-pagination'}></div>
								<EastIcon className={'swiper-top-next'} />
							</div>
						</Box>
					</Stack>
					<Stack className={'card-box'}>
						<Swiper
							className={'top-product-swiper'}
							slidesPerView={'auto'}
							spaceBetween={15}
							modules={[Autoplay, Navigation, Pagination]}
							navigation={{
								nextEl: '.swiper-top-next',
								prevEl: '.swiper-top-prev',
							}}
							pagination={{
								el: '.swiper-top-pagination',
							}}
						>
							{topProducts.map((product: Product) => {
								return (
									<SwiperSlide className={'top-product-slide'} key={product?._id}>
										<TopProductCard product={product} likeProductHandler={likeProductHandler} />
									</SwiperSlide>
								)
							})}
						</Swiper>
					</Stack>
				</Stack>
			</Stack>
		)
	}
}

TopProducts.defaultProps = {
	initialInput: {
		page: 1,
		limit: 8,
		sort: 'productRank',
		direction: 'DESC',
		search: {},
	},
};

export default TopProducts;
