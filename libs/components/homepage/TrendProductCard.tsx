import React from 'react';
import { Stack, Box, Divider, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Product } from '../../types/product/product';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { REACT_APP_API_URL } from '../../config';
import { useRouter } from 'next/router';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import Link from 'next/link'

interface TrendProductCardProps {
	product: Product
	likeProductHandler: any
}

const TrendProductCard = (props: TrendProductCardProps) => {
	const { product, likeProductHandler } = props
	const device = useDeviceDetect()
	const router = useRouter()
	const user = useReactiveVar(userVar)

	/** HANDLERS **/

	if (device === 'mobile') {
		return (
			<Stack className="product" key={product._id}>
				<span className="product-price">${product.productPrice}</span>
				<Link href={'/product'}>
					<img className="product-image" src={`${process.env.REACT_APP_API_URL}/${product?.productImages[0]}`} />
					<h1 className="product-title">
						{product.productBrand} {product.productModel}
					</h1>
				</Link>
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
				<Link
					href={{
						pathname: '/product/detail',
						query: { id: product?._id },
					}}
				>
					<img className="product-image" src={`${process.env.REACT_APP_API_URL}/${product?.productImages[0]}`} />
				</Link>
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

//https://codepen.io/haniotis/pen/aNvMyW

export default TrendProductCard;
