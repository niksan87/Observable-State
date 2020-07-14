import { Mutations } from 'modules/store/Mutations';
import { Observer, Constructor } from 'modules/misc/IMisc';
import { State } from 'modules/store/State';

export type InitSettings<S extends State = State, M extends Mutations<S> = Mutations<S>> = {
    state: S;
    mutations: Constructor<M>;
    reactive: boolean | string[];
}

export type BindSettings = {
    prop?: string;
    observer?: Observer | Observer[];
    recursive?: boolean;
}