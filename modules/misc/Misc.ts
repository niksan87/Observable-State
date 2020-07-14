//export const deepCopy = function<T extends Object = {}>(obj: T): T {

// const output = {} as T;

// for (const key in obj) {
//     output[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
// }

// return output;

//};

// export const deepCopy = function(obj, hash = new WeakMap()) {
//     // Do not try to clone primitives or functions
//     if (Object(obj) !== obj || obj instanceof Function) return obj;
//     if (hash.has(obj)) return hash.get(obj); // Cyclic reference
//     try { // Try to run constructor (without arguments, as we don't know them)
//         var result = new obj.constructor();
//     } catch(e) { // Constructor failed, create object without running the constructor
//         result = Object.create(Object.getPrototypeOf(obj));
//     }
//     // Optional: support for some standard constructors (extend as desired)
//     if (obj instanceof Map)
//         Array.from(obj, ([key, val]) => result.set(deepCopy(key, hash), 
//             deepCopy(val, hash)) );
//     else if (obj instanceof Set)
//         Array.from(obj, (key) => result.add(deepCopy(key, hash)) );
//     // Register in hash    
//     hash.set(obj, result);
//     // Clone and assign enumerable own properties recursively
//     return Object.assign(result, ...Object.keys(obj).map (
//         key => ({ [key]: deepCopy(obj[key], hash) }) ));
// };

export const deepCopy = function<T extends Object = {}>(obj: T): T {
    return obj;
};