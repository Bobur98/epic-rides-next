import React from 'react';
import { Stack, Box, Divider, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Product } from '../../types/product/product';
import { REACT_APP_API_URL } from '../../config';
import { formatterStr } from '../../utils';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import { useRouter } from 'next/router';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Link from 'next/link'

interface ProductBigCardProps {
	product: Product
	likeProductHandler: any
}

const ProductBigCard = (props: ProductBigCardProps) => {
	const { product, likeProductHandler } = props
	const device = useDeviceDetect()
	const user = useReactiveVar(userVar)
	const router = useRouter()

	/** HANDLERS **/
	const goProductDetatilPage = (productId: string) => {
		router.push(`/product/detail?id=${productId}`)
	}

	if (device === 'mobile') {
		return <div>APARTMEND BIG CARD</div>
	} else {
		return (
			<Stack className="product-big-card-box" onClick={() => goProductDetatilPage(product?._id)}>
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
					<Stack className="bottom">
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
						<div className="view-like-box">
							<IconButton color={'default'}>
								<RemoveRedEyeIcon />
							</IconButton>
							<Typography className="view-cnt">{product?.productViews}</Typography>
							<IconButton
								color={'default'}
								onClick={(e: { stopPropagation: () => void }) => {
									e.stopPropagation()
									likeProductHandler(user, product?._id)
								}}
							>
								{product?.meLiked && product?.meLiked[0]?.myFavorite ? (
									<FavoriteIcon style={{ color: 'red' }} />
								) : (
									<FavoriteIcon />
								)}
							</IconButton>
							<Typography className="view-cnt">{product?.productLikes}</Typography>
						</div>
					</Stack>
				</Stack>
			</Stack>
		)
	}
}

export default ProductBigCard;
