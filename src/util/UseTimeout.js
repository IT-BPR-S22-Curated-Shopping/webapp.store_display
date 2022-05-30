import { useRef, useEffect } from 'react'

export const useTimeout = (callback, timer) => {
    const timeoutIdRef = useRef()

    useEffect(() => {
        timeoutIdRef.current = callback
    }, [callback])

    useEffect(() => {
        const fn = () => {
            timeoutIdRef.current()
        }
        if (timer !== null) {
            let timeoutId = setTimeout(fn, timer)
            return () => clearTimeout(timeoutId)
        }
    }, [timer])
}