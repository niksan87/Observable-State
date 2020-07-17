import { ModelState } from 'modules/model/IModel';

export const DEFAULT_MODEL_STATE: ModelState = {
    name: 'John',
    age: 11,
    address: {
        street: {
            name: ['John', 'street'],
            number: 111
        },
        code: 1111
    }
};

export const MODIFIED_MODEL_STATE: ModelState = {
    name: 'Jane',
    age: 22,
    address: {
        street: {
            name: ['Jane', 'street'],
            number: 222
        },
        code: 2222
    }
};