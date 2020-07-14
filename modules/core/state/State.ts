import { State } from 'modules/core/state/IState';

export const DEFAULT_STATE: State = {
    name: 'John',
    age: 11,
    address: {
        street: {
            name: 'John street',
            number: 111
        },
        code: 1111
    }
};

export const MODIFIED_STATE: State = {
    name: 'Jane',
    age: 22,
    address: {
        street: {
            name: 'Jane street',
            number: 222
        },
        code: 2222
    }
};