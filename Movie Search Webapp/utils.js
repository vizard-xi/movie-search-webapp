//delay search till input is completely done by user
const debounce = (func, delay = 1000) => {
    let timeoutId;
    //...args - de-structuring whatever user enters
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout( () => {
            func.apply(null, args);
        }, delay)
    };
};