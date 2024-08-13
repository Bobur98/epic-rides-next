import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { Stack } from '@mui/material';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import MyProducts from '../../libs/components/mypage/MyProducts';
import MyFavorites from '../../libs/components/mypage/MyFavorites';
import RecentlyVisited from '../../libs/components/mypage/RecentlyVisited';
import AddProduct from '../../libs/components/mypage/AddNewProduct';
import MyProfile from '../../libs/components/mypage/MyProfile';
import MyArticles from '../../libs/components/mypage/MyArticles';
import { useMutation, useReactiveVar } from '@apollo/client'
import { userVar } from '../../apollo/store'
import MyMenu from '../../libs/components/mypage/MyMenu'
import WriteArticle from '../../libs/components/mypage/WriteArticle'
import MemberFollowers from '../../libs/components/member/MemberFollowers'
import { sweetErrorHandling, sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../libs/sweetAlert'
import MemberFollowings from '../../libs/components/member/MemberFollowings'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { SUBSCRIBE, UNSUBSCRIBE, LIKE_TARGET_MEMBER } from '../../apollo/user/mutation'
import { Messages } from '../../libs/config'
import { Message } from '../../libs/enums/common.enum'

export const getStaticProps = async ({ locale }: any) => ({
	props: {
		...(await serverSideTranslations(locale, ['common'])),
	},
})

const MyPage: NextPage = () => {
	const device = useDeviceDetect()
	const user = useReactiveVar(userVar)
	const router = useRouter()
	const category: any = router.query?.category ?? 'myProfile'

	/** APOLLO REQUESTS **/
	const [subscribe, { error: createSubscribeError }] = useMutation(SUBSCRIBE, {
		onError: (error) => {
			router.push('/_error')
		},
	})
	const [unsubscribe, { error: createUnsubscribeError }] = useMutation(UNSUBSCRIBE, {
		onError: (error) => {
			router.push('/_error')
		},
	})
	const [likeTargetMember, { error: createLikeError }] = useMutation(LIKE_TARGET_MEMBER, {
		onError: (error) => {
			router.push('/_error')
		},
	})


	/** LIFECYCLES **/
	useEffect(() => {
		if (!user._id) router.push('/').then()
	}, [user])

	/** HANDLERS **/
	const subscribeHandler = async (id: string, refetch: any, query: any) => {
		try {
			if (!id) throw new Error(Messages.error1)
			if (!user._id) throw new Error(Messages.error2)

			await subscribe({
				variables: {
					input: id,
				},
			})
			await sweetTopSmallSuccessAlert('Subscribed!', 800)
			await refetch({ input: query })
		} catch (err: any) {
			sweetErrorHandling(err).then()
		}
	}

	const unsubscribeHandler = async (id: string, refetch: any, query: any) => {
		try {
			if (!id) throw new Error(Messages.error1)
			if (!user._id) throw new Error(Messages.error2)

			await unsubscribe({
				variables: {
					input: id,
				},
			})

			await sweetTopSmallSuccessAlert('Unsubscribed!', 800)
			await refetch({ input: query })
		} catch (err: any) {
			sweetErrorHandling(err).then()
		}
	}

	const likeMemberHandler = async (id: string, refetch: any, query: any) => {
		try {
			if (!id) throw new Error(Messages.error1)
			if (!user._id) throw new Error(Message.NOT_AUTHENTICATED)

			// execute likeTargetProduct Mutation
			await likeTargetMember({
				variables: { input: id },
			})
			await sweetTopSmallSuccessAlert('Success!', 800)
			await refetch({ input: query })
		} catch (err: any) {
			sweetMixinErrorAlert(err.message).then()
		}
	}

	const redirectToMemberPageHandler = async (memberId: string) => {
		try {
			if (memberId === user?._id) await router.push(`/mypage?memberId=${memberId}`)
			else await router.push(`/member?memberId=${memberId}`)
		} catch (error) {
			await sweetErrorHandling(error)
		}
	}

	if (device === 'mobile') {
		return <div>MY PAGE</div>
	} else {
		return (
			<div id="my-page" style={{ position: 'relative' }}>
				<div className="container">
					<Stack className={'my-page'}>
						<Stack className={'back-frame'}>
							<Stack className={'left-config'}>
								<MyMenu />
							</Stack>
							<Stack className="main-config" mb={'76px'}>
								<Stack className={'list-config'}>
									{category === 'addProduct' && <AddProduct />}
									{category === 'myProducts' && <MyProducts />}
									{category === 'myFavorites' && <MyFavorites />}
									{category === 'recentlyVisited' && <RecentlyVisited />}
									{category === 'myArticles' && <MyArticles />}
									{category === 'writeArticle' && <WriteArticle />}
									{category === 'myProfile' && <MyProfile />}
									{category === 'followers' && (
										<MemberFollowers
											subscribeHandler={subscribeHandler}
											unsubscribeHandler={unsubscribeHandler}
											redirectToMemberPageHandler={redirectToMemberPageHandler}
											likeMemberHandler={likeMemberHandler}
										/>
									)}
									{category === 'followings' && (
										<MemberFollowings
											subscribeHandler={subscribeHandler}
											unsubscribeHandler={unsubscribeHandler}
											redirectToMemberPageHandler={redirectToMemberPageHandler}
											likeMemberHandler={likeMemberHandler}
										/>
									)}
								</Stack>
							</Stack>
						</Stack>
					</Stack>
				</div>
			</div>
		)
	}
}

export default withLayoutBasic(MyPage);
