import { State } from 'modules/proxy/IMisc';
import { ModelMutations } from 'modules/core/Model/ModelMutations';

export type ModelState = {
    name: string;
    age: number;
    address: Address;
} & State;

export type Address = {
    street: Street;
    code: number;
}

export type Street = {
    name: string;
    number: number;
}