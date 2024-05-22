export const getRangeBetweenNumbers = ( start, end ) => {
    const result = [];
    if(start > end) {
        return result;
    }
    for(let i = start; i <= end; i++ ) {
        result.push(i);
    }
    return result;
}

export default {
    getRangeBetweenNumbers
}