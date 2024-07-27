import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import withAdminLayout from '../../../libs/components/layout/LayoutAdmin'
import { Box, Button, InputAdornment, Stack } from '@mui/material'
import { List, ListItem } from '@mui/material'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { TabContext } from '@mui/lab'
import OutlinedInput from '@mui/material/OutlinedInput'
import TablePagination from '@mui/material/TablePagination'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded'
import { FaqArticlesPanelList } from '../../../libs/components/admin/cs/FaqList'
import { useMutation, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { T } from '../../../libs/types/common'
import { Faq, Faqs } from '../../../libs/types/faq/faq'
import { FaqsInquiry } from '../../../libs/types/faq/faq.input'
import { sweetConfirmAlert, sweetErrorHandling } from '../../../libs/sweetAlert'
import { DELETE_FAQ_BY_ADMIN, UPDATE_FAQ_BY_ADMIN } from '../../../apollo/admin/mutation'
import { FaqUpdate } from '../../../libs/types/faq/faq.update'
import { GET_FAQS } from '../../../apollo/user/query'

interface FaqArticlesProps {
	initialInquiry?: {
		page?: number
		limit?: number
		faqType?: string
	}
}

const FaqArticles: NextPage = ({ initialInquiry, ...props }: any) => {
	const [anchorEl, setAnchorEl] = useState<[] | HTMLElement[]>([])
	const router = useRouter()
	const [faqsInquiry, setFaqsInquiry] = useState<FaqsInquiry>(initialInquiry)
	const [type, setType] = useState<string>('MOTORCYCLE')

	const [faqsTotal, setFaqsTotal] = useState<number>(0)
	const [value, setValue] = useState('ALL')
	const [searchType, setSearchType] = useState('ALL')

	const [faqs, setFaqs] = useState<Faqs[]>([])
	const [total, setTotal] = useState<number>(0)
	const dense = false

	/** APOLLO REQUESTS **/
	const [updateFaqByAdmin] = useMutation(UPDATE_FAQ_BY_ADMIN)
	const [deleteFaqByAdmin] = useMutation(DELETE_FAQ_BY_ADMIN)
	const {
		loading: getFaqsLoading,
		data: getFaqsData,
		refetch: getFaqsRefetch,
	} = useQuery(GET_FAQS, {
		fetchPolicy: 'network-only', // by default cache-first
		variables: { input: { ...initialInquiry, faqType: type.toUpperCase() } },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setFaqs(data?.getFaqs?.list || [])
			setTotal(data?.getFaqs?.metaCounter[0]?.total || 0)
		},
	})

	/** LIFECYCLES **/
	useEffect(() => {
		getFaqsRefetch({ input: initialInquiry }).then()
	}, [initialInquiry])

	/** HANDLERS **/

	const menuIconClickHandler = (e: any, index: number) => {
		const tempAnchor = anchorEl.slice()
		tempAnchor[index] = e.currentTarget
		setAnchorEl(tempAnchor)
	}

	const menuIconCloseHandler = () => {
		setAnchorEl([])
	}

	const tabChangeHandler = async (event: any, newValue: string) => {
		setValue(newValue)

		setFaqsInquiry({ ...faqsInquiry, page: 1, sort: 'createdAt' })

		switch (newValue) {
			case 'ACTIVE':
				setFaqsInquiry({ ...faqsInquiry })
				break
			case 'HOLD':
				setFaqsInquiry({ ...faqsInquiry })
				break
			case 'DELETE':
				setFaqsInquiry({ ...faqsInquiry })
				break
			default:
				setFaqsInquiry({ ...faqsInquiry })
				break
		}
	}

	const removeFaqHandler = async (id: string) => {
		try {
			if (await sweetConfirmAlert('Are you sure to remove?')) {
				await deleteFaqByAdmin({
					variables: {
						input: id,
					},
				})

				await getFaqsRefetch({ input: faqsInquiry })
			}
			menuIconCloseHandler()
		} catch (err: any) {
			sweetErrorHandling(err).then()
		}
	}
	// const searchTypeHandler = async (newValue: string) => {
	// 	try {
	// 		setSearchType(newValue)

	// 		if (newValue !== 'ALL') {
	// 			setFaqsInquiry({
	// 				...faqsInquiry,
	// 				page: 1,
	// 				sort: 'createdAt',
	// 				search: {
	// 					...faqsInquiry,
	// 					faqLocationList: [newValue as FaqLocation],
	// 				},
	// 			})
	// 		} else {
	// 			delete faqsInquiry?.search?.faqLocationList
	// 			setFaqsInquiry({ ...faqsInquiry })
	// 		}
	// 	} catch (err: any) {
	// 		console.log('searchTypeHandler: ', err.message)
	// 	}
	// }

	const updateFaqHandler = async (updateData: FaqUpdate) => {
		try {
			console.log('+updateData: ', updateData)
			await updateFaqByAdmin({
				variables: {
					input: updateData,
				},
			})
			menuIconCloseHandler()
			await getFaqsData({ input: faqsInquiry })
		} catch (err: any) {
			menuIconCloseHandler()
			sweetErrorHandling(err).then()
		}
	}
	return (
		<>
			<Box component={'div'} className={'content'}>
				<Box component={'div'} className={'title flex_space'}>
					<Typography variant={'h2'}>FAQ Management</Typography>
					<Button
						className="btn_add"
						variant={'contained'}
						size={'medium'}
						onClick={() => router.push(`/_admin/cs/faq_create`)}
					>
						<AddRoundedIcon sx={{ mr: '8px' }} />
						ADD
					</Button>
				</Box>
				<Box component={'div'} className={'table-wrap'}>
					<Box component={'div'} sx={{ width: '100%', typography: 'body1' }}>
						<TabContext value={'value'}>
							<Box component={'div'}>
								<List className={'tab-menu'}>
									<ListItem
										// onClick={(e) => handleTabChange(e, 'all')}
										value="all"
										className={'all' === 'all' ? 'li on' : 'li'}
									>
										All (0)
									</ListItem>
									<ListItem
										// onClick={(e) => handleTabChange(e, 'active')}
										value="active"
										className={'all' === 'all' ? 'li on' : 'li'}
									>
										Active (0)
									</ListItem>
									<ListItem
										// onClick={(e) => handleTabChange(e, 'blocked')}
										value="blocked"
										className={'all' === 'all' ? 'li on' : 'li'}
									>
										Blocked (0)
									</ListItem>
									<ListItem
										// onClick={(e) => handleTabChange(e, 'deleted')}
										value="deleted"
										className={'all' === 'all' ? 'li on' : 'li'}
									>
										Deleted (0)
									</ListItem>
								</List>
								<Divider />
								<Stack className={'search-area'} sx={{ m: '24px' }}>
									<Select sx={{ width: '160px', mr: '20px' }} value={'searchCategory'}>
										<MenuItem value={'mb_nick'}>mb_nick</MenuItem>
										<MenuItem value={'mb_id'}>mb_id</MenuItem>
									</Select>

									<OutlinedInput
										value={'searchInput'}
										// onChange={(e) => handleInput(e.target.value)}
										sx={{ width: '100%' }}
										className={'search'}
										placeholder="Search user name"
										onKeyDown={(event) => {
											// if (event.key == 'Enter') searchTargetHandler().then();
										}}
										endAdornment={
											<>
												{true && <CancelRoundedIcon onClick={() => {}} />}
												<InputAdornment position="end" onClick={() => {}}>
													<img src="/img/icons/search_icon.png" alt={'searchIcon'} />
												</InputAdornment>
											</>
										}
									/>
								</Stack>
								<Divider />
							</Box>
							<FaqArticlesPanelList
								faqs={faqs}
								anchorEl={anchorEl}
								menuIconClickHandler={menuIconClickHandler}
								menuIconCloseHandler={menuIconCloseHandler}
								updateFaqHandler={updateFaqHandler}
								removeFaqHandler={removeFaqHandler}
							/>

							<TablePagination
								rowsPerPageOptions={[20, 40, 60]}
								component="div"
								count={4}
								rowsPerPage={10}
								page={1}
								onPageChange={() => {}}
								onRowsPerPageChange={() => {}}
							/>
						</TabContext>
					</Box>
				</Box>
			</Box>
		</>
	)
}

FaqArticles.defaultProps = {
	initialInquiry: {
		page: 1,
		limit: 9,
		// faqType: 'MOTORCYCLE',
	},
}

export default withAdminLayout(FaqArticles)
