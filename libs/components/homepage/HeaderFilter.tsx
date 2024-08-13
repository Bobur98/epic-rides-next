import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Stack, Box, Modal, Divider, Button } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { ProductLocation, ProductType, ProductBrand } from '../../enums/product.enum'
import { Direction } from '../../enums/common.enum'
import { sweetMixinErrorAlert } from '../../sweetAlert'

const thisYear = new Date().getFullYear()

interface HeaderFilterProps {
	initialInput: any
}

const HeaderFilter = (props: HeaderFilterProps) => {
	const { initialInput } = props
	const device = useDeviceDetect()
	const { t, i18n } = useTranslation('common')
	const [searchFilter, setSearchFilter] = useState<any>(initialInput)
	const locationRef: any = useRef()
	const typeRef: any = useRef()
	const brandsRef: any = useRef()
	const router = useRouter()
	const [openAdvancedFilter, setOpenAdvancedFilter] = useState(false)
	const [openLocation, setOpenLocation] = useState(false)
	const [openType, setOpenType] = useState(false)
	const [openBrands, setOpenBrands] = useState(false)
	const [productLocation, setProductLocation] = useState<ProductLocation[]>(Object.values(ProductLocation))
	const [productType, setProductType] = useState<ProductType[]>(Object.values(ProductType))
	const [productBrand, setProductBrand] = useState<ProductBrand[]>(Object.values(ProductBrand))

	// Handle range value changes ensuring end is not less than start
	const handleRangeChange = useCallback((type: string, field: string, value: number) => {
		try {
			setSearchFilter((prev: any) => {
				const range = prev.search[type]
				// const start = range.start;
				const end = field === 'start' ? Math.min(value, range.end) : Math.max(value, range.start)
				return {
					...prev,
					search: {
						...prev.search,
						[type]: {
							...range,
							[field]: end,
						},
					},
				}
			})
		} catch (err: any) {
			sweetMixinErrorAlert(err.message).then()
		}
	}, [])

	// Handle brand selection
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

	// Handle search action
	const handleSearch = async () => {
		try {
			if (searchFilter?.search?.locationList?.length == 0) {
				delete searchFilter.search.locationList
			}

			if (searchFilter?.search?.typeList?.length == 0) {
				delete searchFilter.search.typeList
			}
			if (searchFilter?.search?.brandList?.length == 0) {
				delete searchFilter.search.brandList
			}

			await router.push(
				`/product?input=${JSON.stringify(searchFilter)}`,
				`/product?input=${JSON.stringify(searchFilter)}`,
			)
		} catch (err: any) {
			sweetMixinErrorAlert(err.message).then()
		}
	}

	// Handle reset action
	const handleReset = () => {
		setSearchFilter({
			search: {
				text: '',
				engineRangeCc: { start: 50, end: 2500 },
				powerRange: { start: 5, end: 200 },
				torqueRange: { start: 10, end: 200 },
				weightRange: { start: 50, end: 500 },
				yearsRange: { start: 2000, end: new Date().getFullYear() },
				pricesRange: { start: 0, end: 3000000 },
				brandList: [] as ProductBrand[],
			},
		})
	}
	/** LIFECYCLES **/
	useEffect(() => {
		const clickHandler = (event: MouseEvent) => {
			if (!locationRef?.current?.contains(event.target)) {
				setOpenLocation(false)
			}

			if (!typeRef?.current?.contains(event.target)) {
				setOpenType(false)
			}

			if (!brandsRef?.current?.contains(event.target)) {
				setOpenBrands(false)
			}
		}

		document.addEventListener('mousedown', clickHandler)

		return () => {
			document.removeEventListener('mousedown', clickHandler)
		}
	}, [])

	/** HANDLERS **/
	const advancedFilterHandler = (status: boolean) => {
		setOpenLocation(false)
		setOpenBrands(false)
		setOpenType(false)
		setOpenAdvancedFilter(status)
	}

	const locationStateChangeHandler = () => {
		setOpenLocation((prev) => !prev)
		setOpenBrands(false)
		setOpenType(false)
	}

	const typeStateChangeHandler = () => {
		setOpenType((prev) => !prev)
		setOpenLocation(false)
		setOpenBrands(false)
	}

	const brandStateChangeHandler = () => {
		setOpenBrands((prev) => !prev)
		setOpenType(false)
		setOpenLocation(false)
	}

	const disableAllStateHandler = () => {
		setOpenBrands(false)
		setOpenType(false)
		setOpenLocation(false)
	}

	const productLocationSelectHandler = useCallback(
		async (value: any) => {
			try {
				setSearchFilter({
					...searchFilter,
					search: {
						...searchFilter.search,
						locationList: [value],
					},
				})
				typeStateChangeHandler()
			} catch (err: any) {
				sweetMixinErrorAlert(err.message).then()
			}
		},
		[searchFilter],
	)

	const productTypeSelectHandler = useCallback(
		async (value: any) => {
			try {
				setSearchFilter({
					...searchFilter,
					search: {
						...searchFilter.search,
						typeList: [value],
					},
				})
				brandStateChangeHandler()
			} catch (err: any) {
				sweetMixinErrorAlert(err.message).then()
			}
		},
		[searchFilter],
	)

	const productBrandSelectHandler = useCallback(
		async (value: any) => {
			try {
				setSearchFilter({
					...searchFilter,
					search: {
						...searchFilter.search,
						brandList: [value],
					},
				})
				disableAllStateHandler()
			} catch (err: any) {
				sweetMixinErrorAlert(err.message).then()
			}
		},
		[searchFilter],
	)

	if (device === 'mobile') {
		return <div>HEADER FILTER MOBILE</div>
	} else {
		return (
			<>
				<Stack className={'search-box'}>
					<Stack className={'select-box'}>
						<Box component={'div'} className={`box ${openLocation ? 'on' : ''}`} onClick={locationStateChangeHandler}>
							<span>{searchFilter?.search?.locationList ? searchFilter?.search?.locationList[0] : t('Location')} </span>
							<ExpandMoreIcon />
						</Box>
						<Box className={`box ${openType ? 'on' : ''}`} onClick={typeStateChangeHandler}>
							<span> {searchFilter?.search?.typeList ? searchFilter.search.typeList[0] : t('Product type')} </span>
							<ExpandMoreIcon />
						</Box>
						<Box className={`box ${openBrands ? 'on' : ''}`} onClick={brandStateChangeHandler}>
							<span>
								{searchFilter.search.brandList.length !== 0
									? `${searchFilter?.search?.brandList[0]}`
									: t('Product brand')}
							</span>
							<ExpandMoreIcon />
						</Box>
					</Stack>
					<Stack className={'search-box-other'}>
						<Box className={'advanced-filter'} onClick={() => advancedFilterHandler(true)}>
							<img src="/img/icons/tune.svg" alt="" />
							<span>{t('Advanced')}</span>
						</Box>
						<Box className={'search-btn'} onClick={handleSearch}>
							<img src="/img/icons/search_white.svg" alt="" />
						</Box>
					</Stack>

					{/*MENU */}
					<div className={`filter-location ${openLocation ? 'on' : ''}`} ref={locationRef}>
						{productLocation.map((location: string) => {
							return (
								<div onClick={() => productLocationSelectHandler(location)} key={location}>
									<img src={`img/banner/cities/${location}.webp`} alt="" />
									<span>{location}</span>
								</div>
							)
						})}
					</div>

					<div className={`filter-type ${openType ? 'on' : ''}`} ref={typeRef}>
						{productType.map((type: string) => {
							return (
								<div onClick={() => productTypeSelectHandler(type)} className="item-type" key={type}>
									<span>{type}</span>
								</div>
							)
						})}
					</div>

					<div className={`filter-brands ${openBrands ? 'on' : ''}`} ref={brandsRef}>
						{productBrand.map((brand: string) => {
							return (
								<div onClick={() => productBrandSelectHandler(brand)} key={brand}>
									<span>{brand}</span>
								</div>
							)
						})}
					</div>
				</Stack>
				{/* ADVANCED FILTER MODAL */};
				<Modal
					open={openAdvancedFilter}
					onClose={() => advancedFilterHandler(false)}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<div className="advanced-search-modal">
						<div className={'close-button'} onClick={() => advancedFilterHandler(false)}>
							<CloseIcon />
						</div>
						<h2>Search your next bike</h2>
						<div className="filter">
							<input
								type="text"
								placeholder="Search..."
								value={searchFilter?.search?.text ?? ''}
								onChange={(e: any) => {
									setSearchFilter({
										...searchFilter,
										search: { ...searchFilter.search, text: e.target.value },
									})
								}}
								className="search-input"
							/>
						</div>
						<div className="filter">
							<label>
								Engine (cc): {searchFilter.search.engineRangeCc.start} - {searchFilter.search.engineRangeCc.end}
							</label>
							<div className="range-slider">
								<input
									type="range"
									min="50"
									max="2500"
									value={searchFilter.search.engineRangeCc.start}
									onChange={(e) => {
										handleRangeChange('engineRangeCc', 'start', Number(e.target.value))
									}}
								/>
								<input
									type="range"
									min={searchFilter.search.engineRangeCc.start}
									max="2500"
									value={searchFilter.search.engineRangeCc.end}
									onChange={(e) => handleRangeChange('engineRangeCc', 'end', Number(e.target.value))}
								/>
							</div>
						</div>
						<div className="filter">
							<label>
								Power (hp): {searchFilter.search.powerRange.start} - {searchFilter.search.powerRange.end}
							</label>
							<div className="range-slider">
								<input
									type="range"
									min="5"
									max="200"
									value={searchFilter.search.powerRange.start}
									onChange={(e) => handleRangeChange('powerRange', 'start', Number(e.target.value))}
								/>
								<input
									type="range"
									min={searchFilter.search.powerRange.start}
									max="200"
									value={searchFilter.search.powerRange.end}
									onChange={(e) => handleRangeChange('powerRange', 'end', Number(e.target.value))}
								/>
							</div>
						</div>
						<div className="filter">
							<label>
								Torque (Nm): {searchFilter.search.torqueRange.start} - {searchFilter.search.torqueRange.end}
							</label>
							<div className="range-slider">
								<input
									type="range"
									min="10"
									max="200"
									value={searchFilter.search.torqueRange.start}
									onChange={(e) => handleRangeChange('torqueRange', 'start', Number(e.target.value))}
								/>
								<input
									type="range"
									min={searchFilter.search.torqueRange.start}
									max="200"
									value={searchFilter.search.torqueRange.end}
									onChange={(e) => handleRangeChange('torqueRange', 'end', Number(e.target.value))}
								/>
							</div>
						</div>
						<div className="filter">
							<label>
								Price ($): {searchFilter.search.pricesRange.start} - {searchFilter.search.pricesRange.end}
							</label>
							<div className="range-wrapper">
								<input
									type="number"
									min="0"
									value={searchFilter.search.pricesRange.start}
									onChange={(e) =>
										setSearchFilter({
											...searchFilter,
											pricesRange: {
												...searchFilter.search.pricesRange,
												start: Math.min(Number(e.target.value), searchFilter.search.pricesRange.end),
											},
										})
									}
								/>
								<span>-</span>
								<input
									type="number"
									min={searchFilter?.search.pricesRange?.start}
									value={searchFilter?.search.pricesRange?.end}
									onChange={(e) =>
										setSearchFilter({
											...searchFilter,
											pricesRange: {
												...searchFilter?.search?.pricesRange,
												end: Math.max(Number(e.target.value), searchFilter?.search?.pricesRange?.start),
											},
										})
									}
								/>
							</div>
						</div>
						<div className="filter">
							<label>
								Year: {searchFilter?.search?.yearsRange?.start}-{searchFilter?.search?.yearsRange?.end}
							</label>
							<div className="year-selector">
								<select
									value={searchFilter?.search?.yearsRange?.start}
									onChange={(e) =>
										setSearchFilter({
											...searchFilter,
											yearsRange: { ...searchFilter?.search?.yearsRange, start: Number(e.target.value) },
										})
									}
								>
									{Array.from({ length: new Date().getFullYear() - 1999 }, (_, i) => 2000 + i).map((year) => (
										<option key={year} value={year}>
											{year}
										</option>
									))}
								</select>
								<span>-</span>
								<select
									value={searchFilter?.search?.yearsRange?.end}
									onChange={(e) =>
										setSearchFilter({
											...searchFilter,
											yearsRange: { ...searchFilter?.search?.yearsRange, end: Number(e.target.value) },
										})
									}
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
										onClick={() => handleBrandSelection(brand)}
									>
										{brand}
									</button>
								))}
							</div>
						</div>

						<div className="btn-wrapper">
							<button className="reset-button" onClick={handleReset}>
								Reset
							</button>
							<button className="search-button" onClick={handleSearch}>
								Search
							</button>
						</div>
					</div>
				</Modal>
			</>
		)
	}
}

HeaderFilter.defaultProps = {
	initialInput: {
		page: 1,
		limit: 9,
		sort: 'createdAt',
		direction: Direction.ASC,
		search: {
			text: '',
			engineRangeCc: { start: 50, end: 2500 },
			powerRange: { start: 5, end: 200 },
			torqueRange: { start: 10, end: 200 },
			weightRange: { start: 50, end: 500 },
			yearsRange: { start: 2000, end: new Date().getFullYear() },
			pricesRange: { start: 0, end: 3000000 },
			brandList: [] as ProductBrand[],
		},
	},
}

export default HeaderFilter;
