import { ModelState } from 'modules/core/Model/IModel';

export const DEFAULT_MODEL_DATA: ModelState = {
    name: 'John',
    age: 11,
    address: {
        street: {
            name: 'Street John',
            number: 1
        },
        code: 1000
    }
};

export const MODIFIED_MODEL_DATA: ModelState = {
    name: 'Jane',
    age: 22,
    address: {
        street: {
            name: 'Street Jane',
            number: 11
        },
        code: 2000
    }
};