import { Primitive } from 'modules/proxy/IMisc';

export const primitiveIntoObject = function(value: Primitive): Object {
        
    let output = {};

    switch (true) {
               
    case typeof value === 'string':
        output = new String(value);
        break;

    case typeof value === 'number':
        output = new Number(value);
        break;

    case typeof value === 'boolean':
        output = new Boolean(value);
        break;
                    
    default:
        break;
    }

    return output;
    
};