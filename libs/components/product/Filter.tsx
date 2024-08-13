import React, { useCallback, useEffect, useState } from 'react';
import {
	Stack,
	Typography,
	Checkbox,
	Button,
	OutlinedInput,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Tooltip,
	IconButton,
} from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { ProductBrand, ProductLocation, ProductType } from '../../enums/product.enum'
import { ProductsInquiry } from '../../types/product/product.input'
import { useRouter } from 'next/router'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded'
import RefreshIcon from '@mui/icons-material/Refresh'
import { productYears, thisYear } from '../../config'
import { sweetMixinErrorAlert } from '../../sweetAlert'

const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: '200px',
		},
	},
}

interface FilterType {
	searchFilter: ProductsInquiry
	setSearchFilter: any
	initialInput: ProductsInquiry
}

const Filter = (props: FilterType) => {
	const { searchFilter, setSearchFilter, initialInput } = props
	const device = useDeviceDetect()
	const router = useRouter()
	const [productLocation, setProductLocation] = useState<ProductLocation[]>(Object.values(ProductLocation))
	const [productType, setProductType] = useState<ProductType[]>(Object.values(ProductType))
	const [searchText, setSearchText] = useState<string>('')
	const [showMore, setShowMore] = useState<boolean>(false)
	const [showMoreType, setShowMoreType] = useState<boolean>(false)

	/** LIFECYCLES **/
	useEffect(() => {
		const queryParams = JSON.stringify({
			...searchFilter,
			search: {
				...searchFilter.search,
			},
		})

		if (searchFilter?.search?.locationList?.length == 0) {
			delete searchFilter.search.locationList
			setShowMore(false)
			router.push(`/product?input=${queryParams}`, `/product?input=${queryParams}`, { scroll: false }).then()
		}
		if (searchFilter?.search?.typeList?.length == 0) {
			delete searchFilter.search.typeList
			setShowMoreType(false)
			router.push(`/product?input=${queryParams}`, `/product?input=${queryParams}`, { scroll: false }).then()
		}

		// if (searchFilter?.search?.brandList?.length == 0) {
		// 	delete searchFilter.search.brandList;
		// 	router.push(`/product?input=${queryParams}`, `/product?input=${queryParams}`, { scroll: false }).then();
		// }

		if (searchFilter?.search?.options?.length == 0) {
			delete searchFilter.search.options
			router.push(`/product?input=${queryParams}`, `/product?input=${queryParams}`, { scroll: false }).then()
		}

		if (searchFilter?.search?.locationList) setShowMore(true)
	}, [searchFilter])

	/** HANDLERS **/
	const productLocationSelectHandler = useCallback(
		async (e: any) => {
			try {
				const isChecked = e.target.checked
				const value = e.target.value
				if (isChecked) {
					await router.push(
						`/product?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, locationList: [...(searchFilter?.search?.locationList || []), value] },
						})}`,
						`/product?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, locationList: [...(searchFilter?.search?.locationList || []), value] },
						})}`,
						{ scroll: false },
					)
				} else if (searchFilter?.search?.locationList?.includes(value)) {
					await router.push(
						`/product?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								locationList: searchFilter?.search?.locationList?.filter((item: string) => item !== value),
							},
						})}`,
						`/product?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								locationList: searchFilter?.search?.locationList?.filter((item: string) => item !== value),
							},
						})}`,
						{ scroll: false },
					)
				}

				if (searchFilter?.search?.typeList?.length == 0) {
					alert('error')
				}
			} catch (err: any) {
				sweetMixinErrorAlert(err.message).then()
			}
		},
		[searchFilter],
	)

	const productTypeSelectHandler = useCallback(
		async (e: any) => {
			try {
				const isChecked = e.target.checked
				const value = e.target.value
				if (isChecked) {
					await router.push(
						`/product?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, typeList: [...(searchFilter?.search?.typeList || []), value] },
						})}`,
						`/product?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, typeList: [...(searchFilter?.search?.typeList || []), value] },
						})}`,
						{ scroll: false },
					)
				} else if (searchFilter?.search?.typeList?.includes(value)) {
					await router.push(
						`/product?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								typeList: searchFilter?.search?.typeList?.filter((item: string) => item !== value),
							},
						})}`,
						`/product?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								typeList: searchFilter?.search?.typeList?.filter((item: string) => item !== value),
							},
						})}`,
						{ scroll: false },
					)
				}

				if (searchFilter?.search?.typeList?.length == 0) {
					alert('error')
				}
			} catch (err: any) {
				sweetMixinErrorAlert(err.message).then()
			}
		},
		[searchFilter],
	)

	const productOptionSelectHandler = useCallback(
		async (e: any) => {
			try {
				const isChecked = e.target.checked
				const value = e.target.value
				if (isChecked) {
					await router.push(
						`/product?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, options: [...(searchFilter?.search?.options || []), value] },
						})}`,
						`/product?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, options: [...(searchFilter?.search?.options || []), value] },
						})}`,
						{ scroll: false },
					)
				} else if (searchFilter?.search?.options?.includes(value)) {
					await router.push(
						`/product?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								options: searchFilter?.search?.options?.filter((item: string) => item !== value),
							},
						})}`,
						`/product?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								options: searchFilter?.search?.options?.filter((item: string) => item !== value),
							},
						})}`,
						{ scroll: false },
					)
				}
			} catch (err: any) {
				sweetMixinErrorAlert(err.message).then()
			}
		},
		[searchFilter],
	)
	const productPriceHandler = useCallback(
		async (value: number, type: string) => {
			if (type == 'start') {
				await router.push(
					`/product?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							pricesRange: { ...searchFilter?.search?.pricesRange, start: value * 1 },
						},
					})}`,
					`/product?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							pricesRange: { ...searchFilter?.search?.pricesRange, start: value * 1 },
						},
					})}`,
					{ scroll: false },
				)
			} else {
				await router.push(
					`/product?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							pricesRange: { ...searchFilter?.search?.pricesRange, end: value * 1 },
						},
					})}`,
					`/product?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							pricesRange: { ...searchFilter?.search?.pricesRange, end: value * 1 },
						},
					})}`,
					{ scroll: false },
				)
			}
		},
		[searchFilter],
	)
	const productEngineCcHandler = useCallback(
		async (value: number, type: string) => {
			if (type == 'start') {
				await router.push(
					`/product?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							engineRangeCc: { ...searchFilter?.search?.engineRangeCc, start: value * 1 },
						},
					})}`,
					`/product?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							engineRangeCc: { ...searchFilter?.search?.engineRangeCc, start: value * 1 },
						},
					})}`,
					{ scroll: false },
				)
			} else {
				await router.push(
					`/product?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							engineRangeCc: { ...searchFilter?.search?.engineRangeCc, end: value * 1 },
						},
					})}`,
					`/product?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							engineRangeCc: { ...searchFilter?.search?.engineRangeCc, end: value * 1 },
						},
					})}`,
					{ scroll: false },
				)
			}
		},
		[searchFilter],
	)

	const productPowerHandler = useCallback(
		async (value: number, type: string) => {
			if (type == 'start') {
				await router.push(
					`/product?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							powerRange: { ...searchFilter?.search?.powerRange, start: value * 1 },
						},
					})}`,
					`/product?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							powerRange: { ...searchFilter?.search?.powerRange, start: value * 1 },
						},
					})}`,
					{ scroll: false },
				)
			} else {
				await router.push(
					`/product?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							powerRange: { ...searchFilter?.search?.powerRange, end: value * 1 },
						},
					})}`,
					`/product?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							powerRange: { ...searchFilter?.search?.powerRange, end: value * 1 },
						},
					})}`,
					{ scroll: false },
				)
			}
		},
		[searchFilter],
	)
	const productTorqueHandler = useCallback(
		async (value: number, type: string) => {
			if (type == 'start') {
				await router.push(
					`/product?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							torqueRange: { ...searchFilter?.search?.torqueRange, start: value * 1 },
						},
					})}`,
					`/product?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							torqueRange: { ...searchFilter?.search?.torqueRange, start: value * 1 },
						},
					})}`,
					{ scroll: false },
				)
			} else {
				await router.push(
					`/product?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							torqueRange: { ...searchFilter?.search?.torqueRange, end: value * 1 },
						},
					})}`,
					`/product?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							torqueRange: { ...searchFilter?.search?.torqueRange, end: value * 1 },
						},
					})}`,
					{ scroll: false },
				)
			}
		},
		[searchFilter],
	)
	const productWeightHandler = useCallback(
		async (value: number, type: string) => {
			if (type == 'start') {
				await router.push(
					`/product?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							weightRange: { ...searchFilter?.search?.weightRange, start: value * 1 },
						},
					})}`,
					`/product?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							weightRange: { ...searchFilter?.search?.weightRange, start: value * 1 },
						},
					})}`,
					{ scroll: false },
				)
			} else {
				await router.push(
					`/product?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							weightRange: { ...searchFilter?.search?.weightRange, end: value * 1 },
						},
					})}`,
					`/product?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							weightRange: { ...searchFilter?.search?.weightRange, end: value * 1 },
						},
					})}`,
					{ scroll: false },
				)
			}
		},
		[searchFilter],
	)
	const productBrandHandler = useCallback(async (value: number, type: string) => {}, [searchFilter])

	const productYearsHandler = useCallback(
		async (value: number, type: string) => {
			if (type == 'start') {
				await router.push(
					`/product?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							yearsRange: { ...searchFilter?.search?.yearsRange, start: value * 1 },
						},
					})}`,
					`/product?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							yearsRange: { ...searchFilter?.search?.yearsRange, start: value * 1 },
						},
					})}`,
					{ scroll: false },
				)
			} else {
				await router.push(
					`/product?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							yearsRange: { ...searchFilter?.search?.yearsRange, end: value * 1 },
						},
					})}`,
					`/product?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							yearsRange: { ...searchFilter?.search?.yearsRange, end: value * 1 },
						},
					})}`,
					{ scroll: false },
				)
			}
		},
		[searchFilter],
	)

	const handleBrandSelection = useCallback((brand: ProductBrand) => {
		try {
			setSearchFilter((prev: any) => ({
				...prev,
				search: {
					...prev.search,
					brandList: prev.search.brandList.includes(brand)
						? prev.search.brandList.filter((b: ProductBrand) => b !== brand)
						: [...prev.search.brandList, brand],
				},
			}))
		} catch (err: any) {
			sweetMixinErrorAlert(err.message).then()
		}
	}, [])
	const refreshHandler = async () => {
		try {
			setSearchText('')
			await router.push(
				`/product?input=${JSON.stringify(initialInput)}`,
				`/product?input=${JSON.stringify(initialInput)}`,
				{ scroll: false },
			)
		} catch (err: any) {
			sweetMixinErrorAlert(err.message).then()
		}
	}

	if (device === 'mobile') {
		return <div>PRODUCTS FILTER</div>
	} else {
		return (
			<Stack className={'filter-main'}>
				<Stack className={'find-your-home'} mb={'40px'}>
					<Typography className={'title-main'}>Find Your Bike</Typography>
					<Stack className={'input-box'}>
						<OutlinedInput
							value={searchText}
							type={'text'}
							className={'search-input'}
							placeholder={'What are you looking for?'}
							onChange={(e: any) => setSearchText(e.target.value)}
							onKeyDown={(event: any) => {
								if (event.key == 'Enter') {
									setSearchFilter({
										...searchFilter,
										search: { ...searchFilter.search, text: searchText },
									})
								}
							}}
							endAdornment={
								<>
									<CancelRoundedIcon
										onClick={() => {
											setSearchText('')
											setSearchFilter({
												...searchFilter,
												search: { ...searchFilter.search, text: '' },
											})
										}}
									/>
								</>
							}
						/>
						<img src={'/img/icons/search_icon.png'} alt={''} />
						<Tooltip title="Reset">
							<IconButton onClick={refreshHandler}>
								<RefreshIcon />
							</IconButton>
						</Tooltip>
					</Stack>
				</Stack>
				<Stack className={'find-your-home'} mb={'30px'}>
					<p className={'title'} style={{ textShadow: '0px 3px 4px #b9b9b9' }}>
						Location
					</p>
					<Stack
						className={`product-location`}
						style={{ height: showMore ? '253px' : '115px' }}
						onMouseEnter={() => setShowMore(true)}
						onMouseLeave={() => {
							if (!searchFilter?.search?.locationList) {
								setShowMore(false)
							}
						}}
					>
						{productLocation.map((location: string) => {
							return (
								<Stack className={'input-box'} key={location}>
									<Checkbox
										id={location}
										className="product-checkbox"
										color="default"
										size="small"
										value={location}
										checked={(searchFilter?.search?.locationList || []).includes(location as ProductLocation)}
										onChange={productLocationSelectHandler}
									/>
									<label htmlFor={location} style={{ cursor: 'pointer' }}>
										<Typography className="product-type">{location}</Typography>
									</label>
								</Stack>
							)
						})}
					</Stack>
				</Stack>
				<Stack className={'find-your-home'} mb={'30px'}>
					<p className={'title'} style={{ textShadow: '0px 3px 4px #b9b9b9' }}>
						Type
					</p>
					<Stack
						className={`product-location`}
						style={{ height: showMoreType ? '253px' : '115px' }}
						onMouseEnter={() => setShowMoreType(true)}
						onMouseLeave={() => {
							if (!searchFilter?.search?.typeList) {
								setShowMoreType(false)
							}
						}}
					>
						{productType.map((type: string) => {
							return (
								<Stack className={'input-box'} key={type}>
									<Checkbox
										id={type}
										className="product-checkbox"
										color="default"
										size="small"
										value={type}
										checked={(searchFilter?.search?.typeList || []).includes(type as ProductType)}
										onChange={productTypeSelectHandler}
									/>
									<label htmlFor={type} style={{ cursor: 'pointer' }}>
										<Typography className="product-type">{type}</Typography>
									</label>
								</Stack>
							)
						})}
					</Stack>
				</Stack>
				<div className="filter">
					<label>
						Engine (cc): {searchFilter?.search?.engineRangeCc?.start} - {searchFilter?.search?.engineRangeCc?.end}
					</label>
					<div className="range-slider">
						<input
							type="range"
							min="50"
							max="2500"
							value={searchFilter?.search?.engineRangeCc?.start}
							onChange={(e: any) => {
								if (e.target.value >= 0) {
									productEngineCcHandler(e.target.value, 'start')
								}
							}}
						/>
						<input
							type="range"
							min={searchFilter?.search?.engineRangeCc?.start}
							max="2500"
							value={searchFilter?.search?.engineRangeCc?.end}
							onChange={(e: any) => {
								if (e.target.value >= 0) {
									productEngineCcHandler(e.target.value, 'end')
								}
							}}
						/>
					</div>
				</div>
				<div className="filter">
					<label>
						Torque (Nm): {searchFilter?.search?.torqueRange?.start} - {searchFilter?.search?.torqueRange?.end}
					</label>
					<div className="range-slider">
						<input
							type="range"
							min="10"
							max="200"
							value={searchFilter?.search?.torqueRange?.start ?? 0}
							onChange={(e: any) => {
								if (e.target.value >= 0) {
									productTorqueHandler(e.target.value, 'start')
								}
							}}
						/>
						<input
							type="range"
							min={searchFilter?.search?.torqueRange?.start}
							max="200"
							value={searchFilter?.search?.torqueRange?.end}
							onChange={(e: any) => {
								if (e.target.value >= 0) {
									productTorqueHandler(e.target.value, 'end')
								}
							}}
						/>
					</div>
				</div>
				<Stack className={'find-your-home'} mb={'30px'}>
					<Typography className={'title'}>Options</Typography>
					<Stack className={'input-box'}>
						<Checkbox
							id={'Barter'}
							className="product-checkbox"
							color="default"
							size="small"
							value={'productBarter'}
							checked={(searchFilter?.search?.options || []).includes('productBarter')}
							onChange={productOptionSelectHandler}
						/>
						<label htmlFor={'Barter'} style={{ cursor: 'pointer' }}>
							<Typography className="product-type">Barter</Typography>
						</label>
					</Stack>
					<Stack className={'input-box'}>
						<Checkbox
							id={'Rent'}
							className="product-checkbox"
							color="default"
							size="small"
							value={'productRent'}
							checked={(searchFilter?.search?.options || []).includes('productRent')}
							onChange={productOptionSelectHandler}
						/>
						<label htmlFor={'Rent'} style={{ cursor: 'pointer' }}>
							<Typography className="product-type">Rent</Typography>
						</label>
					</Stack>
				</Stack>
				<Stack className={'find-your-home'}>
					<Typography className={'title'}>Price Range</Typography>
					<Stack className="square-year-input">
						<input
							type="number"
							placeholder="$ min"
							min={0}
							value={searchFilter?.search?.pricesRange?.start ?? 0}
							onChange={(e: any) => {
								if (e.target.value >= 0) {
									productPriceHandler(e.target.value, 'start')
								}
							}}
						/>
						<div className="central-divider"></div>
						<input
							type="number"
							placeholder="$ max"
							value={searchFilter?.search?.pricesRange?.end ?? 0}
							onChange={(e: any) => {
								if (e.target.value >= 0) {
									productPriceHandler(e.target.value, 'end')
								}
							}}
						/>
					</Stack>
				</Stack>
				<div className="filter">
					<label style={{ fontWeight: 500 }}>Year:</label>
					<div className="year-selector">
						<select
							// @ts-ignore
							value={searchFilter?.search?.yearsRange?.start ?? 2000}
							onChange={(e: any) => productYearsHandler(e.target.value, 'start')}
						>
							{Array.from({ length: new Date().getFullYear() - 1999 }, (_, i) => 2000 + i).map((year) => (
								<option key={year} value={year}>
									{year}
								</option>
							))}
						</select>
						<span>-</span>
						<select
							// @ts-ignore
							value={searchFilter?.search?.yearsRange?.end}
							onChange={(e: any) => productYearsHandler(e.target.value, 'end')}
						>
							{Array.from({ length: new Date().getFullYear() - 1999 }, (_, i) => 2000 + i).map((year) => (
								<option key={year} value={year}>
									{year}
								</option>
							))}
						</select>
					</div>
				</div>
				<div className="filter">
					<label>Brands:</label>
					<div className="brand-selection">
						{Object.values(ProductBrand).map((brand) => (
							<button
								key={brand}
								className={`brand-button ${searchFilter?.search?.brandList?.includes(brand) ? 'selected' : ''}`}
								onClick={() => {
									handleBrandSelection(brand)
								}}
							>
								{brand}
							</button>
						))}
					</div>
				</div>
			</Stack>
		)
	}
}

export default Filter;
