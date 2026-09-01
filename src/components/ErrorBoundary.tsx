import React, { Component, ReactNode, ErrorInfo } from 'react';
import { AlertTriangle, RefreshCw, Home, Copy, Mail } from 'lucide-react';

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  maxRetries?: number;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  retryCount: number;
  errorId: string;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  // Explicit declarations for React Component members
  declare props: Readonly<ErrorBoundaryProps>;
  declare setState: (state: Partial<ErrorBoundaryState> | ((prevState: ErrorBoundaryState) => Partial<ErrorBoundaryState>)) => void;

  state: ErrorBoundaryState = {
    hasError: false,
    error: null,
    retryCount: 0,
    errorId: ''
  };

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { 
      hasError: true, 
      error,
      errorId: `err-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Uncaught error caught by MUCO Labs ErrorBoundary:', error, errorInfo);
    
    // Log to external error tracking service if available
    this.logErrorToService(error, errorInfo);
    
    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  private logErrorToService(error: Error, errorInfo: ErrorInfo): void {
    // Enhanced error logging with context
    const errorContext = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      errorId: this.state.errorId
    };

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error Context:', errorContext);
    }

    // Here you would integrate with error tracking services like Sentry, LogRocket, etc.
    // Example: Sentry.captureException(error, { extra: errorContext });
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null, retryCount: 0 });
    window.location.reload();
  };

  handleRetry = (): void => {
    const { maxRetries = 3 } = this.props;
    
    if (this.state.retryCount < maxRetries) {
      this.setState(prevState => ({
        hasError: false,
        error: null,
        retryCount: prevState.retryCount + 1
      }));
    } else {
      console.warn('Max retry attempts reached');
      this.handleReset();
    }
  };

  handleGoHome = (): void => {
    this.setState({ hasError: false, error: null, retryCount: 0 });
    window.location.hash = '#home';
  };

  handleCopyError = (): void => {
    const errorDetails = `Error ID: ${this.state.errorId}\nMessage: ${this.state.error?.message}\nTime: ${new Date().toISOString()}\nURL: ${window.location.href}`;
    navigator.clipboard.writeText(errorDetails);
  };

  handleReportBug = (): void => {
    const subject = encodeURIComponent(`Bug Report: ${this.state.errorId}`);
    const body = encodeURIComponent(
      `Error ID: ${this.state.errorId}\n\n` +
      `Error Message: ${this.state.error?.message}\n\n` +
      `URL: ${window.location.href}\n\n` +
      `Time: ${new Date().toISOString()}\n\n` +
      `Please describe what you were doing when this error occurred:`
    );
    window.location.href = `mailto:contact@mucolabs.in?subject=${subject}&body=${body}`;
  };

  render(): ReactNode {
    const { hasError, error, retryCount, errorId } = this.state;
    const { fallback, maxRetries = 3 } = this.props;

    if (hasError) {
      // Use custom fallback if provided
      if (fallback) {
        return fallback;
      }

      // Default error UI
      return (
        <div className="min-h-[60vh] flex items-center justify-center p-6 my-12">
          <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 bg-red-50 dark:bg-red-950/50 rounded-2xl border border-red-200 dark:border-red-800/80 flex items-center justify-center mx-auto text-red-500 shadow-inner">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                Something Went Wrong
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                An unexpected error occurred while loading this section. Our engineering team has been notified.
              </p>
              {retryCount > 0 && (
                <p className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">
                  Retry attempt {retryCount} of {maxRetries}
                </p>
              )}
            </div>

            {error && (
              <div className="bg-slate-50 dark:bg-slate-950/80 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-left font-mono text-[10px] text-red-600 dark:text-red-400 overflow-x-auto max-h-24">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold">Error ID: {errorId}</span>
                  <button 
                    onClick={this.handleCopyError}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                    title="Copy error details"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                </div>
                {error.message || 'Unknown Error'}
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 pt-2">
              {retryCount < maxRetries ? (
                <button
                  onClick={this.handleRetry}
                  className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md shadow-orange-500/20"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Try Again</span>
                </button>
              ) : (
                <button
                  onClick={this.handleReset}
                  className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 font-bold text-xs py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reload Page</span>
                </button>
              )}

              <button
                onClick={this.handleGoHome}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-500/20"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Back Home</span>
              </button>
            </div>

            <button
              onClick={this.handleReportBug}
              className="w-full text-xs text-slate-500 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-400 font-medium flex items-center justify-center gap-1.5 transition-colors"
            >
              <Mail className="w-3 h-3" />
              <span>Report this issue</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
