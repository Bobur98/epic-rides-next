import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { NextPage } from 'next';
import { Box, Button, Menu, MenuItem, Pagination, Stack, Typography } from '@mui/material';
import ProductCard from '../../libs/components/product/ProductCard';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import Filter from '../../libs/components/product/Filter';
import { useRouter } from 'next/router';
import { ProductsInquiry } from '../../libs/types/product/product.input';
import { Product } from '../../libs/types/product/product';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { Direction, Message } from '../../libs/enums/common.enum'
import { GET_PRODUCTS } from '../../apollo/user/query'
import { useMutation, useQuery } from '@apollo/client'
import { T } from '../../libs/types/common'
import { ProductBrand } from '../../libs/enums/product.enum'
import TopProductCard from '../../libs/components/homepage/TopProductCard'
import { sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../libs/sweetAlert'
import { LIKE_TARGET_PRODUCT } from '../../apollo/user/mutation'

export const getStaticProps = async ({ locale }: any) => ({
	props: {
		...(await serverSideTranslations(locale, ['common'])),
	},
});

const ProductList: NextPage = ({ initialInput, ...props }: any) => {
	const device = useDeviceDetect()
	const router = useRouter()
	const [searchFilter, setSearchFilter] = useState<ProductsInquiry>(
		router?.query?.input ? JSON.parse(router?.query?.input as string) : initialInput,
	)
	const [products, setProducts] = useState<Product[]>([])
	const [total, setTotal] = useState<number>(0)
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const [sortingOpen, setSortingOpen] = useState(false)
	const [filterSortName, setFilterSortName] = useState('New')

	/** APOLLO REQUESTS **/
	const [likeTargetProduct, { error: createLikeError }] = useMutation(LIKE_TARGET_PRODUCT, {
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
		fetchPolicy: 'network-only', // by default cache-first
		variables: { input: searchFilter },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setProducts(data?.getProducts?.list)
			setTotal(data?.getProducts?.metaCounter[0]?.total)
		},
	})

	if (getProductsError) {
		router.push('/_error')
	}
	/** LIFECYCLES **/
	useEffect(() => {
		if (router.query.input) {
			const inputObj = JSON.parse(router?.query?.input as string)
			setSearchFilter(inputObj)
		}

		setCurrentPage(searchFilter.page === undefined ? 1 : searchFilter.page)
	}, [router])

	useEffect(() => {}, [searchFilter])

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

	const handlePaginationChange = async (event: ChangeEvent<unknown>, value: number) => {
		searchFilter.page = value
		await router.push(
			`/product?input=${JSON.stringify(searchFilter)}`,
			`/product?input=${JSON.stringify(searchFilter)}`,
			{
				scroll: false,
			},
		)
		setCurrentPage(value)
	}

	const sortingClickHandler = (e: MouseEvent<HTMLElement>) => {
		setAnchorEl(e.currentTarget)
		setSortingOpen(true)
	}

	const sortingCloseHandler = () => {
		setSortingOpen(false)
		setAnchorEl(null)
	}

	const sortingHandler = (e: React.MouseEvent<HTMLLIElement>) => {
		switch (e.currentTarget.id) {
			case 'new':
				setSearchFilter({ ...searchFilter, sort: 'createdAt', direction: Direction.ASC })
				setFilterSortName('New')
				break
			case 'lowest':
				setSearchFilter({ ...searchFilter, sort: 'productPrice', direction: Direction.ASC })
				setFilterSortName('Lowest Price')
				break
			case 'highest':
				setSearchFilter({ ...searchFilter, sort: 'productPrice', direction: Direction.DESC })
				setFilterSortName('Highest Price')
		}
		setSortingOpen(false)
		setAnchorEl(null)
	}
	console.log(products, 'PRODUCTS')

	if (device === 'mobile') {
		return <h1>PRODUCTS MOBILE</h1>
	} else {
		return (
			<div id="product-list-page" style={{ position: 'relative' }}>
				<div className="container">
					<Box component={'div'} className={'right'}>
						<span>Sort by</span>
						<div>
							<Button onClick={sortingClickHandler} endIcon={<KeyboardArrowDownRoundedIcon />}>
								{filterSortName}
							</Button>
							<Menu anchorEl={anchorEl} open={sortingOpen} onClose={sortingCloseHandler} sx={{ paddingTop: '5px' }}>
								<MenuItem
									onClick={sortingHandler}
									id={'new'}
									disableRipple
									sx={{ boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}
								>
									New
								</MenuItem>
								<MenuItem
									onClick={sortingHandler}
									id={'lowest'}
									disableRipple
									sx={{ boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}
								>
									Lowest Price
								</MenuItem>
								<MenuItem
									onClick={sortingHandler}
									id={'highest'}
									disableRipple
									sx={{ boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}
								>
									Highest Price
								</MenuItem>
							</Menu>
						</div>
					</Box>
					<Stack className={'product-page'}>
						<Stack className={'filter-config'}>
							{/* @ts-ignore */}
							<Filter searchFilter={searchFilter} setSearchFilter={setSearchFilter} initialInput={initialInput} />
						</Stack>
						<Stack className="main-config" mb={'76px'}>
							<Stack className={'list-config'}>
								{products?.length === 0 ? (
									<div className={'no-data'}>
										<img src="/img/icons/icoAlert.svg" alt="" />
										<p>No Products found!</p>
									</div>
								) : (
									products.map((product: Product) => {
										return <ProductCard product={product} key={product._id} likeProductHandler={likeProductHandler} />
									})
								)}
							</Stack>
							<Stack className="pagination-config">
								{products.length !== 0 && (
									<Stack className="pagination-box">
										<Pagination
											page={currentPage}
											count={Math.ceil(total / searchFilter.limit)}
											onChange={handlePaginationChange}
											shape="circular"
											color="primary"
										/>
									</Stack>
								)}

								{products.length !== 0 && (
									<Stack className="total-result">
										<Typography>
											Total {total} product{total > 1 ? 's' : ''} available
										</Typography>
									</Stack>
								)}
							</Stack>
						</Stack>
					</Stack>
				</div>
			</div>
		)
	}
};

ProductList.defaultProps = {
	initialInput: {
		page: 1,
		limit: 9,
		sort: 'createdAt',
		direction: 'DESC',
		search: {
			text: '',
			engineRangeCc: { start: 50, end: 2500 },
			powerRange: { start: 5, end: 500 },
			torqueRange: { start: 10, end: 500 },
			weightRange: { start: 50, end: 500 },
			yearsRange: { start: 2000, end: new Date().getFullYear() },
			pricesRange: { start: 0, end: 3000000 },
			brandList: [] as ProductBrand[],
		},
	},
}

export default withLayoutBasic(ProductList);
