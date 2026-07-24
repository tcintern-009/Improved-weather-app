/**
 * Creates a debounced version of a function that delays invocation
 * until after `delay` milliseconds have elapsed since the last call.
 */
export function debounce(fn, delay = 400) {
    let timer = null;
    return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
            timer = null;
        }, delay);
    };
}