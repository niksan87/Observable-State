declare global {
    interface Function {
        equals: (fn: Function) => boolean;
    }
}

export type State = {
    name: string;
    age: number;
    address: Address;
}

export type Address = {
    code: number;
    streetName: string;
}

export type Constructor<T extends {} = {}> = new (...args: any[]) => T;

export type DeepReadonly<T> = {
    readonly [P in keyof T]: DeepReadonly<T[P]>;
};

export type Dictionary<T> = {
    [index: string]: T;
}

export type Observer<T extends State = State> = (newValue?: T, oldValue?: T, propPath?: string) => void;

export type IBindOptions = {
    propPath?: string;
    observer: Observer | Observer[];
    recursive?: boolean;

}