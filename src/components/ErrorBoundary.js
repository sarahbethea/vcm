import React from "react";

class ErrorBoundary extends React.Component {
    state = { hasError: false}

    static getDerivedStateFromError(error) {
        return { hasError: true }

    }

    componentDidCatch(error, info) {
        console.log(error, info)

    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback
        }
        return this.props.children
    }
}

export default ErrorBoundary

// this is a class component because ErrorBoundaries must be class components because
// you must take advantged of static getDerivedStateFromError(error) which is built into class components