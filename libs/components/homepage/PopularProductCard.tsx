import React from 'react';
import { Stack, Box, Divider, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Product } from '../../types/product/product';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { REACT_APP_API_URL, topProductRank } from '../../config'
import { useRouter } from 'next/router'
import { useReactiveVar } from '@apollo/client'
import { userVar } from '../../../apollo/store'
import FavoriteIcon from '@mui/icons-material/Favorite'
import Link from 'next/link'

interface PopularProductCardProps {
	product: Product
	likeProductHandler: any
}

const PopularProductCard = (props: PopularProductCardProps) => {
	const { product, likeProductHandler } = props
	const device = useDeviceDetect()
	const router = useRouter()
	const user = useReactiveVar(userVar)

	/** HANDLERS **/

	if (device === 'mobile') {
		return (
			<Stack className="product" key={product._id}>
				<span className="product-price">${product.productPrice}</span>
				<Link
					href={{
						pathname: '/product/detail',
						query: { id: product?._id },
					}}
				>
					<img className="product-image" src={`${process.env.REACT_APP_API_URL}/${product?.productImages[0]}`} />
				</Link>
				{product && product?.productRank >= topProductRank ? (
					<div className={'status'}>
						<img src="/img/icons/electricity.svg" alt="" />
						<span>top</span>
					</div>
				) : (
					''
				)}
				<h1 className="product-title">
					{product.productBrand} {product.productModel}
				</h1>
				<hr />
				<p className="product-desc">{product.productDesc ?? 'No Description'}</p>

				<Stack className="view-like-box">
					<Box className="view-wrapper">
						<IconButton color={'default'}>
							<RemoveRedEyeIcon />
						</IconButton>
						<Typography className="view-cnt">{product?.productViews}</Typography>
					</Box>

					<IconButton color={'default'} onClick={() => likeProductHandler(user, product?._id)}>
						{product?.meLiked && product?.meLiked[0]?.myFavorite ? (
							<FavoriteIcon style={{ color: 'red' }} />
						) : (
							<FavoriteIcon />
						)}
					</IconButton>
					<Typography className="view-cnt">{product?.productLikes}</Typography>
				</Stack>
				<Link href="#" className="product__btn btn">
					Buy Now
				</Link>
			</Stack>
		)
	} else {
		return (
			<Stack className="product" key={product._id}>
				<span className="product-price">${product.productPrice}</span>
				<img className="product-image" src={`${process.env.REACT_APP_API_URL}/${product?.productImages[0]}`} />
				{product && product?.productRank >= topProductRank ? (
					<div className={'status'}>
						<img src="/img/icons/electricity.svg" alt="" />
						<span>top</span>
					</div>
				) : (
					''
				)}
				<h1 className="product-title">
					{product.productBrand} {product.productModel}
				</h1>
				<hr />
				<p className="product-desc">{product.productDesc ?? 'No Description'}</p>

				<Stack className="view-like-box">
					<Box className="view-wrapper">
						<IconButton color={'default'}>
							<RemoveRedEyeIcon />
						</IconButton>
						<Typography className="view-cnt">{product?.productViews}</Typography>
					</Box>

					<IconButton color={'default'} onClick={() => likeProductHandler(user, product?._id)}>
						{product?.meLiked && product?.meLiked[0]?.myFavorite ? (
							<FavoriteIcon style={{ color: 'red' }} />
						) : (
							<FavoriteIcon />
						)}
					</IconButton>
					<Typography className="view-cnt">{product?.productLikes}</Typography>
				</Stack>
				<Link href="#" className="product__btn btn">
					Buy Now
				</Link>
			</Stack>
		)
	}
}

export default PopularProductCard;
