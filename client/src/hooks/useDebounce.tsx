import { useMemo } from 'react'
import debounce from 'debounce'

//TODO: if got trouble with states, u now what to do
export function useDebounce<T>(cb: (...args: T[]) => unknown, ms: number) {
	return useMemo(() => debounce(cb, ms), [ms])
}
