import { useEffect, useRef } from 'react';
import { PageId } from '../types';
import { logPageView } from '../services/analytics';

/**
 * Custom lightweight React hook that logs PageView events to the analytics service
 * whenever the user navigates between routes in the application.
 */
export function usePageViewLogger(currentPage: PageId) {
  const previousPageRef = useRef<PageId | null>(null);

  useEffect(() => {
    // Only log if the page has changed or on initial mount
    if (currentPage !== previousPageRef.current) {
      logPageView(currentPage, {
        previousPage: previousPageRef.current,
        timestampMs: Date.now(),
      });
      previousPageRef.current = currentPage;
    }
  }, [currentPage]);
}
