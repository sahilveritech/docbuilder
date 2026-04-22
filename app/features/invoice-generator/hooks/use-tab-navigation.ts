import { useCallback } from "react";
import { useSearchParams } from "react-router";

export function useTabNavigation(
  paramKey: string,
  defaultValue: string,
): [string, (value: string) => void] {
  const [params, setParams] = useSearchParams();
  const current = params.get(paramKey) ?? defaultValue;

  const setValue = useCallback(
    (value: string) => {
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (value === defaultValue) next.delete(paramKey);
          else next.set(paramKey, value);
          return next;
        },
        { replace: true, preventScrollReset: true },
      );
    },
    [paramKey, defaultValue, setParams],
  );

  return [current, setValue];
}
