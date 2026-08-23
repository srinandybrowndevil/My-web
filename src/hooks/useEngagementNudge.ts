import { useState, useEffect, useRef } from 'react';
import { PageId } from '../types';

interface UseEngagementNudgeOptions {
  targetPages?: readonly PageId[];
  durationMs?: number;
  isOpen?: boolean;
}

const DEFAULT_TARGET_PAGES: readonly PageId[] = ['pricing', 'contact'];

/**
 * Custom React hook that monitors time spent on high-intent conversion pages
 * (e.g., 'pricing' or 'contact'). If the user spends more than the specified duration
 * (default: 45 seconds) without opening the chat, it activates a subtle engagement nudge.
 */
export function useEngagementNudge(
  currentPage: PageId,
  options: UseEngagementNudgeOptions = {}
) {
  const {
    targetPages = DEFAULT_TARGET_PAGES,
    durationMs = 45000, // 45 seconds threshold
    isOpen = false
  } = options;

  const [shouldNudge, setShouldNudge] = useState<boolean>(false);
  const [nudgeCount, setNudgeCount] = useState<number>(0);
  const hasInteractedRef = useRef<boolean>(false);

  // If the user actively opens the popover or clicks to chat, silence further automatic nudges
  useEffect(() => {
    if (isOpen) {
      hasInteractedRef.current = true;
      setShouldNudge(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const isTargetPage = targetPages.includes(currentPage);

    // If leaving a target page, reset nudge state
    if (!isTargetPage) {
      setShouldNudge(false);
      hasInteractedRef.current = false;
      return;
    }

    // If the user already interacted during this page visit, do not re-trigger
    if (hasInteractedRef.current) {
      return;
    }

    // Set 45-second engagement timer for the active target page
    const timerId = setTimeout(() => {
      if (!hasInteractedRef.current) {
        setShouldNudge(true);
        setNudgeCount((prev) => prev + 1);
      }
    }, durationMs);

    return () => {
      clearTimeout(timerId);
    };
  }, [currentPage, durationMs, targetPages]);

  const dismissNudge = () => {
    setShouldNudge(false);
    hasInteractedRef.current = true;
  };

  return {
    shouldNudge,
    nudgeCount,
    dismissNudge
  };
}
