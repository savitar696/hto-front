import { useRef, useEffect, useMemo } from "react"
import debounce from "lodash.debounce"

export function useDebouncedCallback<T extends (...args: any[]) => any>(
  func: T,
  delay = 500,
) {
  const funcRef = useRef(func)

  useEffect(() => {
    funcRef.current = func
  }, [func])

  const debounced = useMemo(() => {
    const debouncedFn = debounce(
      (...args: Parameters<T>) => funcRef.current(...args),
      delay,
    )
    return debouncedFn
  }, [delay])

  useEffect(() => {
    return () => {
      debounced.cancel()
    }
  }, [debounced])

  return debounced
}
