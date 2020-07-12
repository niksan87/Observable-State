export const deepCopy = function<T extends Object = {}>(obj: T): T {

    const output = {} as T;

    for (const key in obj) {
        output[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
    }

    return output;
};