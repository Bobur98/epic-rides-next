import React, { useEffect } from 'react';
import { NextPage } from 'next';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import { Stack } from '@mui/material';
import MemberMenu from '../../libs/components/member/MemberMenu';
import MemberProducts from '../../libs/components/member/MemberProducts';
import { useRouter } from 'next/router';
import MemberFollowers from '../../libs/components/member/MemberFollowers';
import MemberArticles from '../../libs/components/member/MemberArticles';
import { useMutation, useReactiveVar } from '@apollo/client'
import { sweetErrorHandling, sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../libs/sweetAlert'
import MemberFollowings from '../../libs/components/member/MemberFollowings'
import { userVar } from '../../apollo/store'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { SUBSCRIBE, UNSUBSCRIBE, LIKE_TARGET_MEMBER } from '../../apollo/user/mutation'
import { Messages } from '../../libs/config'
import { Message } from '../../libs/enums/common.enum'

export const getStaticProps = async ({ locale }: any) => ({
	props: {
		...(await serverSideTranslations(locale, ['common'])),
	},
})

const MemberPage: NextPage = () => {
	const device = useDeviceDetect()
	const router = useRouter()
	const category: any = router.query?.category
	const user = useReactiveVar(userVar)

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
		if (!router.isReady) return
		if (!category) {
			router.replace(
				{
					pathname: router.pathname,
					query: { ...router.query, category: 'products' },
				},
				undefined,
				{ shallow: true },
			)
		}
	}, [category, router])

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

	const redirectToMemberPageHandler = async (memberId: string) => {
		try {
			if (memberId === user?._id) await router.push(`/mypage?memberId=${memberId}`)
			else await router.push(`/member?memberId=${memberId}`)
		} catch (error) {
			await sweetErrorHandling(error)
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
			console.log('ERROR, likeProductHandler:', err.message)
			sweetMixinErrorAlert(err.message).then()
		}
	}

	if (device === 'mobile') {
		return <>MEMBER PAGE MOBILE</>
	} else {
		return (
			<div id="member-page" style={{ position: 'relative' }}>
				<div className="container">
					<Stack className={'member-page'}>
						<Stack className={'back-frame'}>
							<Stack className={'left-config'}>
								<MemberMenu subscribeHandler={subscribeHandler} unsubscribeHandler={unsubscribeHandler} />
							</Stack>
							<Stack className="main-config" mb={'76px'}>
								<Stack className={'list-config'}>
									{category === 'products' && <MemberProducts />}
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
									{category === 'articles' && <MemberArticles />}
								</Stack>
							</Stack>
						</Stack>
					</Stack>
				</div>
			</div>
		)
	}
}

export default withLayoutBasic(MemberPage);
