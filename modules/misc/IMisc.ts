declare global {
    interface Function {
        equals: (fn: Function) => boolean;
    }
}

export type Constructor<T extends {} = {}> = new (...args: any[]) => T;

export type DeepReadonly<T> = {
    readonly [P in keyof T]: DeepReadonly<T[P]>;
};

export type Dictionary<T> = {
    [index: string]: T;
}

export type Observer = (newValue?: any, oldValue?: any, propPath?: string) => void;