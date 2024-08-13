import React, { useState } from 'react';
import { NextPage } from 'next';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Pagination, Stack, Typography } from '@mui/material';
import ProductCard from '../product/ProductCard';
import { Product } from '../../types/product/product';
import { T } from '../../types/common';
import { LIKE_TARGET_PRODUCT } from '../../../apollo/user/mutation'
import { useMutation, useQuery } from '@apollo/client'
import { GET_FAVORITES } from '../../../apollo/user/query'
import { Message } from '../../enums/common.enum'
import { sweetMixinErrorAlert } from '../../sweetAlert'
import { useRouter } from 'next/router'

const MyFavorites: NextPage = () => {
	const device = useDeviceDetect()
	const [myFavorites, setMyFavorites] = useState<Product[]>([])
	const [total, setTotal] = useState<number>(0)
	const [searchFavorites, setSearchFavorites] = useState<T>({ page: 1, limit: 6 })
	const router = useRouter()

	/** APOLLO REQUESTS **/
	const [likeTargetProduct, { error: createError }] = useMutation(LIKE_TARGET_PRODUCT, {
		onError: (error) => {
			router.push('/_error')
		},
	})

	const {
		loading: getFavoritesLoading,
		data: getFavoritesData,
		error: getFavoritesError,
		refetch: getFavoritesRefetch,
	} = useQuery(GET_FAVORITES, {
		fetchPolicy: 'network-only', // by default cache-first
		variables: { input: searchFavorites },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setMyFavorites(data?.getFavorites?.list)
			setTotal(data?.getFavorites?.metaCounter[0]?.total ?? 0)
		},
	})

	if (getFavoritesError) {
		router.push('/_error')
	}
	/** HANDLERS **/
	const paginationHandler = (e: T, value: number) => {
		setSearchFavorites({ ...searchFavorites, page: value })
	}

	const likeProductHandler = async (user: T, id: any) => {
		try {
			if (!id) return
			if (!user._id) throw new Error(Message.NOT_AUTHENTICATED)

			// execute likeTargetProduct Mutation
			await likeTargetProduct({
				variables: { input: id },
			})
			await getFavoritesRefetch({ input: searchFavorites })
		} catch (err: any) {
			sweetMixinErrorAlert(err.message).then()
		}
	}
	if (device === 'mobile') {
		return <div>Epic Rides MY FAVORITES MOBILE</div>
	} else {
		return (
			<div id="my-favorites-page">
				<Stack className="main-title-box">
					<Stack className="right-box">
						<Typography className="main-title">My Favorites</Typography>
						<Typography className="sub-title">We are glad to see you again!</Typography>
					</Stack>
				</Stack>
				<Stack className="favorites-list-box">
					{myFavorites?.length ? (
						myFavorites?.map((product: Product) => {
							return <ProductCard product={product} myFavorites={true} likeProductHandler={likeProductHandler} />
						})
					) : (
						<div className={'no-data'}>
							<img src="/img/icons/icoAlert.svg" alt="" />
							<p>No Favorites found!</p>
						</div>
					)}
				</Stack>
				{myFavorites?.length ? (
					<Stack className="pagination-config">
						<Stack className="pagination-box">
							<Pagination
								count={Math.ceil(total / searchFavorites.limit)}
								page={searchFavorites.page}
								shape="circular"
								color="primary"
								onChange={paginationHandler}
							/>
						</Stack>
						<Stack className="total-result">
							<Typography>
								Total {total} favorite product{total > 1 ? 'ies' : 'y'}
							</Typography>
						</Stack>
					</Stack>
				) : null}
			</div>
		)
	}
}

export default MyFavorites;
