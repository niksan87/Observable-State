declare global {

    interface Object {
        _id: string;
    }

    interface Function {
        equals: (fn: Function) => boolean;
    }
}

export type Indexable<T extends any> = {
    [index: string]: any;
};

export type DeepReadonly<T> = {
    readonly [P in keyof T]: DeepReadonly<T[P]>;
};

export type Dictionary<T> = {
    [index: string]: T;
}

export type Primitive = String | Number | Boolean;

export type Constructor<T extends {} = {}> = new (...args: any[]) => T;

export type Observer<T extends State = State> = (value?: T) => void;

export type State = Object;
