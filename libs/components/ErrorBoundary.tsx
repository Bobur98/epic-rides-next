// components/ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react'
import Router from 'next/router'

interface Props {
	children: ReactNode
}

interface State {
	hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
	state: State = { hasError: false }

	static getDerivedStateFromError(): State {
		return { hasError: true }
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		console.error('Uncaught error:', error, errorInfo)
		// Redirect to error page on error
		Router.push('/_error')
	}

	render() {
		if (this.state.hasError) {
			return null // Alternatively, you can render a fallback UI here
		}

		return this.props.children
	}
}

export default ErrorBoundary
