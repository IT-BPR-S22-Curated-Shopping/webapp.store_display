import {useEffect, useRef} from 'react';

export function useInterval(callback, delay) {

    const savedCallback = useRef();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    let id = useRef(null);

    // Remember the latest function.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);
    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }

        if (delay !== null) {
            id.current = setInterval(tick, delay);
            return () => clearInterval(id.current);
        }
    }, [delay]);

    const pause = () => {
        clearInterval(id.current)
    }
    const resume = () => {
        function tick() {
            savedCallback.current();
        }
        id.current = setInterval(tick, delay)
    }

    return {pause, resume}
}