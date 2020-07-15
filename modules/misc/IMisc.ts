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

export interface IPIXIProxy {
    x: number,
    y: number
}

export type Cursors = 'auto' | 'default' | 'none' | 'context-menu' | 'help' | 'pointer' | 'progress' | 'wait' | 'cell' | 'crosshair' | 'text' | 'vertical-text' | 'alias' | 'copy' | 'move' | 'no-drop' | 'not-allowed' | 'e-resize' | 'n-resize' | 'ne-resize' | 'nw-resize' | 's-resize' | 'se-resize' | 'sw-resize' | 'w-resize' | 'ew-resize' | 'ns-resize' | 'nesw-resize' | 'nwse-resize' | 'col-resize' | 'row-resize' | 'all-scroll' | 'zoom-in' | 'zoom-out' | 'grab' | 'grabbing';

export const enum BlendModes  {
    NORMAL = 0,
    ADD = 1,
    MULTIPLY = 2,
    SCREEN = 3,
    OVERLAY = 4,
    DARKEN = 5,
    LIGHTEN = 6,
    COLOR_DODGE = 7,
    COLOR_BURN = 8,
    HARD_LIGHT = 9,
    SOFT_LIGHT = 10,
    DIFFERENCE = 11,
    EXCLUSION = 12,
    HUE = 13,
    SATURATION = 14,
    COLOR = 15,
    LUMINOSITY = 16,
    NORMAL_NPM = 17,
    ADD_NPM = 18,
    SCREEN_NPM = 19,
    NONE = 20,
    SRC_IN = 21,
    SRC_OUT = 22,
    SRC_ATOP = 23,
    DST_OVER = 24,
    DST_IN = 25,
    DST_OUT = 26,
    DST_ATOP = 27,
    SUBTRACT = 28,
    SRC_OVER = 29,
    ERASE = 30,
    XOR = 31,
}