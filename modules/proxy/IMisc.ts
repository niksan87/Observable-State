declare global {

    interface Object {
        _propId: string;
    }
}

export type Indexable<T extends any> = {
    [index: string]: any;
};

export type DeepReadonly<T> = {
    readonly [P in keyof T]: DeepReadonly<T[P]>;
};

export type PathInside<T extends object> = keyof T;

export type Constructor<T extends {} = {}> = new (...args: any[]) => T;

export type State = Object;

export type Observer<T> = (value: T) => void;