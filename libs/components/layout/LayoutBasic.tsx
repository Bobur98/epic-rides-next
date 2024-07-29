import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import Head from 'next/head';
import Top from '../Top';
import Footer from '../Footer';
import { Stack } from '@mui/material';
import { getJwtToken, updateUserInfo } from '../../auth';
import Chat from '../Chat';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import { useTranslation } from 'next-i18next';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Height } from '@mui/icons-material'

const withLayoutBasic = (Component: any) => {
	return (props: any) => {
		const router = useRouter()
		const { t, i18n } = useTranslation('common')
		const device = useDeviceDetect()
		const [authHeader, setAuthHeader] = useState<boolean>(false)
		const user = useReactiveVar(userVar)

		const memoizedValues = useMemo(() => {
			let title = '',
				desc = '',
				bgImage = ''

			switch (router.pathname) {
				case '/product':
					title = 'Product Search'
					desc = 'We are glad to see you again!'
					bgImage = '/img/banner/bgProduct.jpg'
					break
				case '/agent':
					title = 'Agents'
					desc = 'Home / For Rent'
					bgImage = '/img/banner/agentsBg2.jpg'
					break
				case '/agent/detail':
					title = 'Agent Page'
					desc = 'Home / For Rent'
					bgImage = '/img/banner/bgProduct2.jpg'
					break
				case '/mypage':
					title = 'my page'
					desc = 'Home / For Rent'
					bgImage = '/img/banner/bgProduct3.jpg'
					break
				case '/community':
					title = 'Community'
					desc = 'Home / For Rent'
					bgImage = '/img/banner/communityBg2.jpg'
					break
				case '/community/detail':
					title = 'Community Detail'
					desc = 'Home / For Rent'
					bgImage = '/img/banner/communityBg.jpg'
					break
				case '/cs':
					title = 'CS'
					desc = 'We are glad to see you again!'
					bgImage = '/img/banner/bgProduct3.jpg'
					break
				case '/account/join':
					title = 'Login/Signup'
					desc = 'Authentication Process'
					bgImage = '/img/banner/bgProduct3.jpg'
					setAuthHeader(true)
					break
				case '/member':
					title = 'Member Page'
					desc = 'Home / For Rent'
					bgImage = '/img/banner/bgProduct3.jpg'
					break
				default:
					break
			}

			return { title, desc, bgImage }
		}, [router.pathname])

		/** LIFECYCLES **/
		useEffect(() => {
			const jwt = getJwtToken()
			if (jwt) updateUserInfo(jwt)
		}, [])

		/** HANDLERS **/

		if (device == 'mobile') {
			return (
				<>
					<Head>
						<title>Epic Rides</title>
						<meta name={'title'} content={`Epic Rides`} />
					</Head>
					<Stack id="mobile-wrap">
						<Stack id={'top'}>
							<Top />
						</Stack>

						<Stack id={'main'}>
							<Component {...props} />
						</Stack>

						<Stack id={'footer'}>
							<Footer />
						</Stack>
					</Stack>
				</>
			)
		} else {
			return (
				<>
					<Head>
						<title>Epic Rides</title>
						<meta name={'title'} content={`Epic Rides`} />
					</Head>
					<Stack id="pc-wrap">
						<Stack id={'top'}>
							<Top />
						</Stack>

						<Stack
							className={`header-basic ${authHeader && 'auth'}`}
							style={{
								height: '650px',
								backgroundImage: `url(${memoizedValues.bgImage})`,
								backgroundSize: 'cover',
								boxShadow: 'inset 10px 40px 150px 40px rgb(24 22 36)',
							}}
						>
							<Stack className={'container'}>
								<strong>{t(memoizedValues.title)}</strong>
								<span>{t(memoizedValues.desc)}</span>
							</Stack>
						</Stack>

						<Stack id={'main'}>
							<Component {...props} />
						</Stack>

						{user?._id && <Chat />}

						<Stack id={'footer'}>
							<Footer />
						</Stack>
					</Stack>
				</>
			)
		}
	}
}

export default withLayoutBasic;
