import {RefObject, useEffect, useState} from "react";

export const useEdgeScrolling = (scrollObject: RefObject<any>, scrollAmount: number = 5) => {
    const [isScrolling, setIsScrolling] = useState(false);
    const [direction, setDirection] = useState<'left' | 'right'>('left');

    useEffect(() => {
        const container = scrollObject.current;
        const interval = setInterval(() => {
            if(isScrolling && container){
                container.scrollBy({
                    left: scrollAmount * (direction === 'left' ? -1 : 1),
                });
            }
        }, 10);
        return () => {
            clearInterval(interval);
        }
    }, [scrollObject, isScrolling, direction, scrollAmount]);

    const startScrolling = (direction: 'left' | 'right') => {
        setDirection(direction);
        setIsScrolling(true);
    };

    const stopScrolling = () => {
        setIsScrolling(false);
    };

    return {
        startScrolling,
        stopScrolling
    }
}