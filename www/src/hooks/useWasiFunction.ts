import { useState, useEffect } from 'react';

type WasiFunctionVariadic<Args extends any[], R> = (...args: Args) => R;

interface UseWasiFunctionResult<Args extends any[], R> {
  execute: (...args: Args) => R | undefined;
  result: R | undefined;
  isLoading: boolean;
  error: Error | null;
}

/**
 * A hook for safely using WASI/WASM functions in React components
 * @param wasiFunction The WASI function to wrap
 * @param initialArgs Optional initial arguments to execute on load
 * @returns Object containing execution function, result, loading state, and error
 */
export function useWasiFunction<Args extends any[], R>(
  wasiFunction: WasiFunctionVariadic<Args, R>,
  ...initialArgs: Args
): UseWasiFunctionResult<Args, R> {
  const [result, setResult] = useState<R>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Function to execute the WASI function safely with multiple arguments
  const execute = (...args: Args): R | undefined => {
    try {
      const res = wasiFunction(...args);
      setResult(res);
      setError(null);
      return res;
    } catch (err) {
      console.error('Error executing WASI function:', err);
      setError(err instanceof Error ? err : new Error(String(err)));
      return undefined;
    } finally {
      setIsLoading(false);
    }
  };

  // Run once on mount if initialArgs are provided
  useEffect(() => {
    // Check if initialArgs has actual arguments
    if (initialArgs.length > 0) {
      execute(...initialArgs);
    } else {
      setIsLoading(false);
    }
  }, []);

  return { execute, result, isLoading, error };
} 