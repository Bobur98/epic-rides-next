// pages/_error.tsx
import { NextPageContext } from 'next'
import { Button, Typography, Container, Stack } from '@mui/material'
import { useRouter } from 'next/router'

interface ErrorProps {
	statusCode: number
}

const ErrorPage = ({ statusCode }: ErrorProps) => {
	const router = useRouter()
	const handleGoBack = () => {
		router.back()
	}
	return (
		<Container
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				height: '100vh',
				textAlign: 'center',
			}}
		>
			<Stack
				spacing={2}
				sx={{
					alignItems: 'center',
					textAlign: 'center',
				}}
			>
				<Typography variant="h2" component="h1" gutterBottom>
					{statusCode ? `An error ${statusCode} occurred on server` : 'An error occurred on client'}
				</Typography>
				<Typography variant="h5" component="h2" gutterBottom>
					We couldn't find the page you were looking for.
				</Typography>
				<Button onClick={handleGoBack} variant="contained" color="primary">
					Go Back
				</Button>
			</Stack>
		</Container>
	)
}

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
	const statusCode = res ? res.statusCode : err ? err.statusCode : 404
	return { statusCode }
}

export default ErrorPage
