// ErrorBoundary.js
import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Log the error to an error reporting service
        console.error('Error in component:', error);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI here
            return <h2>Something went wrong.</h2>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
