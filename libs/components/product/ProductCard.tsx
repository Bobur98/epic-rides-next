import React from 'react';
import { Stack, Typography, Box, Divider } from '@mui/material'
import useDeviceDetect from '../../hooks/useDeviceDetect'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { Product } from '../../types/product/product'
import Link from 'next/link'
import { formatterStr } from '../../utils'
import { REACT_APP_API_URL, topProductRank } from '../../config'
import { useReactiveVar } from '@apollo/client'
import { userVar } from '../../../apollo/store'
import IconButton from '@mui/material/IconButton'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'

interface ProductCardType {
	product: Product
	likeProductHandler?: any
	myFavorites?: boolean
	recentlyVisited?: boolean
}

const ProductCard = (props: ProductCardType) => {
	const { product, likeProductHandler, myFavorites, recentlyVisited } = props
	const device = useDeviceDetect()
	const user = useReactiveVar(userVar)
	const imagePath: string = product?.productImages[0]
		? `${REACT_APP_API_URL}/${product?.productImages[0]}`
		: '/img/banner/header1.svg'

	if (device === 'mobile') {
		return <div>PRODUCT CARD</div>
	} else {
		return (
			<Stack className="top-card-box">
				<Stack className="top">
					<Link
						href={{
							pathname: '/product/detail',
							query: { id: product?._id },
						}}
					>
						<div className="status">
							<span>{product.productCondition}</span>
						</div>

						<Box
							component={'div'}
							className={'card-img'}
							style={{ backgroundImage: `url(${REACT_APP_API_URL}/${product?.productImages[0]})` }}
						>
							<div>${product?.productPrice}</div>
						</Box>
					</Link>
				</Stack>
				<Stack className="info">
					<strong className={'title'}>
						{product?.productBrand} {product?.productModel}
					</strong>
					<p className={'desc'}>
						{product?.productEngineCc}
						{'cc,'} {product?.productEngine}
					</p>
					<Stack className="options">
						<div>
							<img src="/img/icons/hammer.svg" alt="" />
							<span>{product?.productPower} hp</span>
						</div>
						<div>
							<img src="/img/icons/gear.svg" alt="" />
							<span>{product?.productTorque} Nm</span>
						</div>
						<div>
							<img src="/img/icons/calendar.svg" alt="" />
							<span>{product?.productYear} year</span>
						</div>
					</Stack>
					<Divider sx={{ mt: '15px', mb: '17px' }} />
					<Stack className="bott">
						<Stack className="type">
							<Typography
								sx={{ fontWeight: 500, fontSize: '13px' }}
								className={product.productRent ? '' : 'disabled-type'}
							>
								Rent
							</Typography>
							<Typography
								sx={{ fontWeight: 500, fontSize: '13px' }}
								className={product.productBarter ? '' : 'disabled-type'}
							>
								Barter
							</Typography>
						</Stack>
						{!recentlyVisited && (
							<div className="view-like-box">
								<IconButton color={'default'}>
									<RemoveRedEyeIcon />
								</IconButton>
								<Typography className="view-cnt">{product?.productViews}</Typography>
								<IconButton color={'default'} onClick={() => likeProductHandler(user, product?._id)}>
									{myFavorites ? (
										<FavoriteIcon color="primary" />
									) : product?.meLiked && product?.meLiked[0]?.myFavorite ? (
										<FavoriteIcon color="primary" />
									) : (
										<FavoriteBorderIcon />
									)}
								</IconButton>
								<Typography className="view-cnt">{product?.productLikes}</Typography>
							</div>
						)}
					</Stack>
				</Stack>
			</Stack>
		)
	}
}

export default ProductCard;
