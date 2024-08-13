import React, { ChangeEvent, useEffect, useState } from 'react';
import { NextPage } from 'next';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import ProductBigCard from '../../libs/components/common/ProductBigCard';
import ReviewCard from '../../libs/components/agent/ReviewCard';
import { Box, Button, Pagination, Stack, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client'
import { useRouter } from 'next/router'
import { Product } from '../../libs/types/product/product'
import { Member } from '../../libs/types/member/member'
import { sweetErrorHandling, sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../libs/sweetAlert'
import { userVar } from '../../apollo/store'
import { ProductsInquiry } from '../../libs/types/product/product.input'
import { CommentInput, CommentsInquiry } from '../../libs/types/comment/comment.input'
import { Comment } from '../../libs/types/comment/comment'
import { CommentGroup } from '../../libs/enums/comment.enum'
import { Messages, REACT_APP_API_URL } from '../../libs/config'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { CREATE_COMMENT, LIKE_TARGET_PRODUCT } from '../../apollo/user/mutation'
import { GET_COMMENTS, GET_MEMBER, GET_PRODUCTS } from '../../apollo/user/query'
import { T } from '../../libs/types/common'
import { Message } from '../../libs/enums/common.enum'
import ProductCard from '../../libs/components/product/ProductCard'

export const getStaticProps = async ({ locale }: any) => ({
	props: {
		...(await serverSideTranslations(locale, ['common'])),
	},
})

const AgentDetail: NextPage = ({ initialInput, initialComment, ...props }: any) => {
	const device = useDeviceDetect()
	const router = useRouter()
	const user = useReactiveVar(userVar)
	const [mbId, setMbId] = useState<string | null>(null)
	const [agent, setAgent] = useState<Member | null>(null)
	const [searchFilter, setSearchFilter] = useState<ProductsInquiry>(initialInput)
	const [agentProducts, setAgentProducts] = useState<Product[]>([])
	const [productTotal, setProductTotal] = useState<number>(0)
	const [commentInquiry, setCommentInquiry] = useState<CommentsInquiry>(initialComment)
	const [agentComments, setAgentComments] = useState<Comment[]>([])
	const [commentTotal, setCommentTotal] = useState<number>(0)
	const [insertCommentData, setInsertCommentData] = useState<CommentInput>({
		commentGroup: CommentGroup.MEMBER,
		commentContent: '',
		commentRefId: '',
	})

	/** APOLLO REQUESTS **/
	const [createComment, { error: createError }] = useMutation(CREATE_COMMENT, {
		onError: (error) => {
			router.push('/_error')
		},
	})

	const [likeTargetProduct, { error: createLikeError }] = useMutation(LIKE_TARGET_PRODUCT, {
		onError: (error) => {
			router.push('/_error')
		},
	})

	const {
		loading: getMemberLoading,
		data: getMemberData,
		error: getMemberError,
		refetch: getMemberRefetch,
	} = useQuery(GET_MEMBER, {
		fetchPolicy: 'network-only', // by default cache-first
		variables: { input: mbId },
		skip: !mbId,
		onCompleted: (data: T) => {
			setAgent(data?.getMember)
			setSearchFilter({
				...searchFilter,
				search: {
					memberId: data?.getMember?._id,
				},
			})
			setCommentInquiry({
				...commentInquiry,
				search: {
					commentRefId: data?.getMember?._id,
				},
			})
			setInsertCommentData({
				...insertCommentData,
				commentRefId: data?.getMember?._id,
			})
		},
	})

	const {
		loading: getProductsLoading,
		data: getProductsData,
		error: getProductsError,
		refetch: getProductsRefetch,
	} = useQuery(GET_PRODUCTS, {
		fetchPolicy: 'network-only', // by default cache-first
		variables: { input: searchFilter },
		skip: !searchFilter?.search?.memberId,
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setAgentProducts(data?.getProducts?.list)
			setProductTotal(data?.getProducts?.metaCounter[0]?.total ?? 0)
		},
	})

	const {
		loading: getCommentLoading,
		data: getCommentData,
		error: getCommentError,
		refetch: getCommentRefetch,
	} = useQuery(GET_COMMENTS, {
		fetchPolicy: 'network-only', // by default cache-first
		variables: { input: commentInquiry },
		skip: !commentInquiry.search.commentRefId,
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setAgentComments(data?.getComments?.list)
			setCommentTotal(data?.getComments?.metaCounter[0]?.total ?? 0)
		},
	})

	if (getMemberError) {
		router.push('/_error')
	}
	if (getProductsError) {
		router.push('/_error')
	}
	if (getCommentError) {
		router.push('/_error')
	}
	/** LIFECYCLES **/
	useEffect(() => {
		if (router.query.agentId) setMbId(router.query.agentId as string)
	}, [router])

	useEffect(() => {}, [searchFilter])
	useEffect(() => {}, [commentInquiry])

	/** HANDLERS **/
	const redirectToMemberPageHandler = async (memberId: string) => {
		try {
			if (memberId === user?._id) await router.push(`/mypage?memberId=${memberId}`)
			else await router.push(`/member?memberId=${memberId}`)
		} catch (error) {
			await sweetErrorHandling(error)
		}
	}

	const productPaginationChangeHandler = async (event: ChangeEvent<unknown>, value: number) => {
		searchFilter.page = value
		setSearchFilter({ ...searchFilter })
	}

	const commentPaginationChangeHandler = async (event: ChangeEvent<unknown>, value: number) => {
		commentInquiry.page = value
		setCommentInquiry({ ...commentInquiry })
	}

	const createCommentHandler = async () => {
		try {
			if (!user._id) throw new Error(Messages.error2)
			if (user._id === mbId) throw new Error('Cannot write a review for yourself')

			await createComment({
				variables: {
					input: insertCommentData,
				},
			})

			setInsertCommentData({ ...insertCommentData, commentContent: '' })
			await getCommentRefetch({ input: commentInquiry })
		} catch (err: any) {
			sweetErrorHandling(err).then()
		}
	}
	const likeProductHandler = async (user: T, id: string) => {
		try {
			if (!id) return
			if (!user._id) throw new Error(Message.NOT_AUTHENTICATED)

			// execute likeTargetProduct Mutation
			await likeTargetProduct({
				variables: { input: id },
			})
			await getProductsRefetch({ input: initialInput })
			await sweetTopSmallSuccessAlert('success', 800)
		} catch (err: any) {
			sweetMixinErrorAlert(err.message).then()
		}
	}
	if (device === 'mobile') {
		return <div>AGENT DETAIL PAGE MOBILE</div>
	} else {
		return (
			<Stack className={'agent-detail-page'}>
				<Stack className={'container'}>
					<Stack className={'agent-info'}>
						<img
							src={agent?.memberImage ? `${REACT_APP_API_URL}/${agent?.memberImage}` : '/img/profile/defaultUser.svg'}
							alt=""
						/>
						<Box component={'div'} className={'info'} onClick={() => redirectToMemberPageHandler(agent?._id as string)}>
							<strong>{agent?.memberFullName ?? agent?.memberNick}</strong>
							<div>
								<img src="/img/icons/call.svg" alt="" />
								<span>{agent?.memberPhone}</span>
							</div>
						</Box>
					</Stack>
					<Stack className={'agent-home-list'}>
						<Stack className={'card-wrap'}>
							{agentProducts.map((product: Product) => {
								return (
									<div className={'wrap-main'} key={product?._id}>
										<ProductCard product={product} key={product?._id} likeProductHandler={likeProductHandler} />
									</div>
								)
							})}
						</Stack>
						<Stack className={'pagination'}>
							{productTotal ? (
								<>
									<Stack className="pagination-box">
										<Pagination
											page={searchFilter.page}
											count={Math.ceil(productTotal / searchFilter.limit) || 1}
											onChange={productPaginationChangeHandler}
											shape="circular"
											color="primary"
										/>
									</Stack>
									<span>
										Total {productTotal} product{productTotal > 1 ? 'ies' : 'y'} available
									</span>
								</>
							) : (
								<div className={'no-data'}>
									<img src="/img/icons/icoAlert.svg" alt="" />
									<p>No products found!</p>
								</div>
							)}
						</Stack>
					</Stack>
					<Stack className={'review-box'}>
						<Stack className={'main-intro'}>
							<span>Reviews</span>
							<p>we are glad to see you again</p>
						</Stack>
						{commentTotal !== 0 && (
							<Stack className={'review-wrap'}>
								<Box component={'div'} className={'title-box'}>
									<StarIcon />
									<span>
										{commentTotal} review{commentTotal > 1 ? 's' : ''}
									</span>
								</Box>
								{agentComments?.map((comment: Comment) => {
									return <ReviewCard comment={comment} key={comment?._id} />
								})}
								<Box component={'div'} className={'pagination-box'}>
									<Pagination
										page={commentInquiry.page}
										count={Math.ceil(commentTotal / commentInquiry.limit) || 1}
										onChange={commentPaginationChangeHandler}
										shape="circular"
										color="primary"
									/>
								</Box>
							</Stack>
						)}

						<Stack className={'leave-review-config'}>
							<Typography className={'main-title'}>Leave A Review</Typography>
							<Typography className={'review-title'}>Review</Typography>
							<textarea
								onChange={({ target: { value } }: any) => {
									setInsertCommentData({ ...insertCommentData, commentContent: value })
								}}
								value={insertCommentData.commentContent}
							></textarea>
							<Box className={'submit-btn'} component={'div'}>
								<Button
									className={'submit-review'}
									disabled={insertCommentData.commentContent === '' || user?._id === ''}
									onClick={createCommentHandler}
								>
									<Typography className={'title'}>Submit Review</Typography>
									<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
										<g clipPath="url(#clip0_6975_3642)">
											<path
												d="M16.1571 0.5H6.37936C6.1337 0.5 5.93491 0.698792 5.93491 0.944458C5.93491 1.19012 6.1337 1.38892 6.37936 1.38892H15.0842L0.731781 15.7413C0.558156 15.915 0.558156 16.1962 0.731781 16.3698C0.818573 16.4566 0.932323 16.5 1.04603 16.5C1.15974 16.5 1.27345 16.4566 1.36028 16.3698L15.7127 2.01737V10.7222C15.7127 10.9679 15.9115 11.1667 16.1572 11.1667C16.4028 11.1667 16.6016 10.9679 16.6016 10.7222V0.944458C16.6016 0.698792 16.4028 0.5 16.1571 0.5Z"
												fill="#181A20"
											/>
										</g>
										<defs>
											<clipPath id="clip0_6975_3642">
												<rect width="16" height="16" fill="white" transform="translate(0.601562 0.5)" />
											</clipPath>
										</defs>
									</svg>
								</Button>
							</Box>
						</Stack>
					</Stack>
				</Stack>
			</Stack>
		)
	}
}

AgentDetail.defaultProps = {
	initialInput: {
		page: 1,
		limit: 9,
		search: {
			memberId: '',
		},
	},
	initialComment: {
		page: 1,
		limit: 5,
		sort: 'createdAt',
		direction: 'ASC',
		search: {
			commentRefId: '',
		},
	},
};

export default withLayoutBasic(AgentDetail);
