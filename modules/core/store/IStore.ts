import { Observer, Constructor } from 'modules/misc/IMisc';
import { State } from 'modules/core/state/IState';
import { Mutations } from 'modules/core/mutations/Mutations';

export type InitSettings<S extends State, M extends Mutations<S>> = {
    state: S;
    mutations: Constructor<M>;
    reactive: boolean | string[];
}

export type BindSettings = {
    prop?: string;
    observer?: Observer | Observer[];
    recursive?: boolean;
}

// export type IStoreSettings = {
//     isReactive?: boolean;
//     reactiveProps?: string[]
// }