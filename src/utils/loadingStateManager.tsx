/**
 * Centralized Loading State Manager for MUCO Labs
 * Provides consistent loading states across the application
 */

import React, { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';

export interface LoadingState {
  isLoading: boolean;
  message?: string;
  subMessage?: string;
  progress?: number;
  variant?: 'default' | 'cyber' | 'minimal' | 'glass';
  canDismiss?: boolean;
}

export interface LoadingContextType {
  loadingState: LoadingState;
  showLoading: (state: Partial<LoadingState>) => void;
  hideLoading: () => void;
  updateProgress: (progress: number) => void;
  updateMessage: (message: string, subMessage?: string) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: false,
    message: 'Loading...',
    variant: 'default',
    canDismiss: false
  });

  const showLoading = useCallback((state: Partial<LoadingState>) => {
    setLoadingState(prev => ({
      ...prev,
      isLoading: true,
      ...state
    }));
  }, []);

  const hideLoading = useCallback(() => {
    setLoadingState(prev => ({
      ...prev,
      isLoading: false,
      progress: undefined
    }));
  }, []);

  const updateProgress = useCallback((progress: number) => {
    setLoadingState(prev => ({
      ...prev,
      progress: Math.min(100, Math.max(0, progress))
    }));
  }, []);

  const updateMessage = useCallback((message: string, subMessage?: string) => {
    setLoadingState(prev => ({
      ...prev,
      message,
      subMessage
    }));
  }, []);

  return (
    <LoadingContext.Provider value={{
      loadingState,
      showLoading,
      hideLoading,
      updateProgress,
      updateMessage
    }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoadingState(): LoadingContextType {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoadingState must be used within LoadingProvider');
  }
  return context;
}

/**
 * Predefined loading states for common operations
 */
export const LoadingStates = {
  INITIAL: {
    message: 'Initializing MUCO Architecture...',
    subMessage: 'Loading core systems',
    variant: 'cyber' as const
  },
  PAGE_LOAD: {
    message: 'Loading page...',
    subMessage: 'Please wait',
    variant: 'default' as const
  },
  DATA_FETCH: {
    message: 'Fetching data...',
    subMessage: 'Connecting to servers',
    variant: 'minimal' as const
  },
  SUBMITTING: {
    message: 'Submitting...',
    subMessage: 'Processing your request',
    variant: 'glass' as const
  },
  AUTHENTICATING: {
    message: 'Authenticating...',
    subMessage: 'Verifying credentials',
    variant: 'cyber' as const
  },
  SAVING: {
    message: 'Saving changes...',
    subMessage: 'Updating database',
    variant: 'default' as const
  }
};

/**
 * Hook for async operations with automatic loading state management
 */
export function useAsyncLoading<T extends (...args: unknown[]) => Promise<unknown>>(
  asyncFunction: T,
  options: {
    loadingMessage?: string;
    loadingSubMessage?: string;
    variant?: LoadingState['variant'];
    onSuccess?: (result: Awaited<ReturnType<T>>) => void;
    onError?: (error: Error) => void;
  } = {}
) {
  const { showLoading, hideLoading, updateProgress } = useLoadingState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<Awaited<ReturnType<T>> | null>(null);

  const execute = useCallback(async (...args: Parameters<T>) => {
    setIsLoading(true);
    setError(null);
    
    showLoading({
      message: options.loadingMessage || 'Processing...',
      subMessage: options.loadingSubMessage,
      variant: options.variant || 'default',
      canDismiss: false
    });

    try {
      updateProgress(10);
      const result = (await asyncFunction(...args)) as Awaited<ReturnType<T>>;
      updateProgress(90);
      
      setData(result);
      if (options.onSuccess) {
        options.onSuccess(result);
      }
      
      updateProgress(100);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      
      if (options.onError) {
        options.onError(error);
      }
      
      throw error;
    } finally {
      setIsLoading(false);
      setTimeout(hideLoading, 300); // Small delay for smooth transition
    }
  }, [asyncFunction, showLoading, hideLoading, updateProgress, options]);

  return {
    execute,
    isLoading,
    error,
    data,
    reset: () => {
      setError(null);
      setData(null);
    }
  };
}

/**
 * Higher-order component for loading states
 */
export function withLoadingState<P extends object>(
  Component: React.ComponentType<P>,
  defaultLoadingState: Partial<LoadingState> = {}
) {
  return function WithLoadingStateWrapper(props: P) {
    const { showLoading, hideLoading } = useLoadingState();

    React.useEffect(() => {
      showLoading(defaultLoadingState);
      return () => hideLoading();
    }, [showLoading, hideLoading]);

    return <Component {...props} />;
  };
}