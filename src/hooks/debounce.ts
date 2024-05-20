import { useRef } from "react";

export function useDebounce(callback: Function, delay: number) {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const debouncedFunction = (...args: any) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            callback(...args);
        }, delay);
    };

    return debouncedFunction;
}