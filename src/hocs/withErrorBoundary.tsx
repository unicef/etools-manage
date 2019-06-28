import React from 'react';
import ErrorBoundary from 'react-error-boundary';

interface FallbackProps {
    error?: Error;
    message?: string;
}

function CustomFallbackComponent({ error, message }: FallbackProps) {
    return (
        <div>
            {`An error was thrown: "${error}". ${message}`}
        </div>
    );
}

export default function withErrorBoundary({ children }) {
    return (
        <ErrorBoundary FallbackComponent={CustomFallbackComponent}>
            {children}
        </ErrorBoundary>
    );
}
