import {RefObject} from "react";

interface UseScrollByOptions {
    scrollAmount?: number,
    scrollBehaviour?: string
}

const defaultOptions: UseScrollByOptions = {
    scrollAmount: -1,
    scrollBehaviour: 'smooth'
}
export const useScrollBy = (
    scrollObject: RefObject<any>,
    options: UseScrollByOptions = {}
) => {

    let {scrollAmount, scrollBehaviour: behavior} = {
        ...defaultOptions, ...options
    }

    if (scrollObject.current && scrollAmount === -1) {
        scrollAmount = scrollObject.current.offsetWidth;
    }

    const handleScrollRight = () => {
        if (scrollObject && scrollObject.current) {
            scrollObject.current.scrollBy({
                left: scrollAmount,
                behavior
            });
        }
    };

    const handleScrollLeft = () => {
        if (scrollObject && scrollObject.current) {
            scrollObject.current.scrollBy({
                left: -scrollAmount!!,
                behavior
            });
        }
    };


    return {
        handleScrollRight,
        handleScrollLeft
    }
}