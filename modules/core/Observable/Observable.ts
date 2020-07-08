import { State, DeepReadonly, Constructor, Observer } from 'modules/proxy/IMisc';
import { Mutations } from 'modules/core/Observable/Mutations';
import { type } from 'os';

export abstract class Observable<S extends State, M extends Mutations<S>> {

    protected _state: S;
    protected _mutations: M;
    private statePropName = '_state';
    private _activated: boolean;
    private _observers: { [index: string]: Function[]; };

    public constructor() {
        this.onCreate();
    }

    public init(state: S, mutations: Constructor<M>): void {
        this._state = state;
        this._observers = {};
        this._mutations = new mutations(this, this.statePropName);
        this.initObserving(this._state);
        this.onInit();
    }

    private initObserving(target: Object, propId: string = this.statePropName): void {

        target._propId = propId;
        this.initProp(this, '_state');

        for (const propName in target) {
            if(propName === '_propId') {
                continue;
            }
            const propValue = target[propName];
            const propIsPrimitive = typeof propValue !== 'object';
            propId = `${target._propId}.${propName}`;

            if(!propIsPrimitive) {
                this.initObserving(propValue, propId);
            } else if(propIsPrimitive && propName !== '_propId') {
                target[propName] = this.convertPrimitiveIntoObject(target, propName);
                target[propName]._propId = propId;
            }

            this.initProp(target, propName);

        }
        
    }

    private convertPrimitiveIntoObject(target: Object, propName: string): Object {
        let output = {};
        const value = `${target[propName]}`;
        switch (true) {
                   
        case typeof target[propName] === 'string':
            output = new String(value);
            break;
    
        case typeof target[propName] === 'number':
            output = new Number(value);
            break;
    
        case typeof target[propName] === 'boolean':
            output = new Boolean(value);
            break;
                        
        default:
            break;
        }

        return output;
        
    }

    private initProp(target: Object, propName: string): void {
        
        let propValue = target[propName];

        if(!this._observers[propValue._propId]) {
            this._observers[propValue._propId] = [];
        }

        Object.defineProperty(target, propName, {
            get: () => propValue,
            set: (newValue) => {
                const propId = propValue._propId;
                if(propValue === `${newValue}` || `${propValue}` === newValue) {
                    return;
                }
                propValue = newValue;
                const newProp = this.convertPrimitiveIntoObject(target, propName);
                newProp._propId = propId;
                propValue = newProp;
                this._observers[propId].forEach(observe => observe(propValue));
            },
        });
    }

    public bind<T>(observer: Function | Function[]): void;
    public bind<T>(prop: Object | String | Number | Boolean, observer: Function | Function[]): void;
    public bind<T>(paramOne: Function | Function[] | Object | String | Number | Boolean, paramTwo?: Object | Function | Function[]): void {

        const isOverflowOne = typeof paramOne === 'function' || Array.isArray(paramOne);
        let observers: Function[];
        let propId: string;

        if(isOverflowOne) {
            observers = typeof paramOne === 'function' ? [ paramOne as Function ] : paramOne as Function[];
            propId = this.statePropName;
        } else {
            observers = typeof paramTwo === 'function' ? [ paramTwo as Function ] : paramTwo as Function[];
            propId = paramOne._propId;
        }

        this._observers[propId]?.push(...observers);
    }


    public unbind(observer?: Function | Function[] | undefined): void;
    public unbind(propId: Object | String | Number | Boolean, observer?: Function | Function[]): void;
    public unbind(paramOne?: Function | Function[] | Object | String | Number | Boolean, paramTwo ?: Function): void {
        const isOverflowOne = typeof paramOne === 'function' || typeof paramOne === 'undefined' || Array.isArray(paramOne);
        let observers: Function[];
        let propId: string;

        if(isOverflowOne) {
            observers = typeof paramOne === 'function' ? [ paramOne as Function ] : paramOne as Function[];
            propId = this.statePropName;
        } else {
            observers = typeof paramTwo === 'function' ? [ paramTwo as Function ] : paramTwo as Function[];
            propId = paramOne._propId;
        }

        if(!observers || observers.length === 0){
            this._observers[propId] = [];
        } else {
            this._observers[propId].forEach((activeObserver, index) => {
                observers.forEach(parameterObserver => {
                    if(activeObserver.name.replace('bound ', '') === parameterObserver.name || activeObserver.name === parameterObserver.name){
                        this._observers[propId][index] = null;
                    }
                });
            });

            this._observers[propId] = this._observers[propId].filter(el => el !== null);
        }
    }

    public activate(): void {
        if(!this._state || !this._mutations){
            throw new Error(`Can't activate ${this.constructor.name} because it's state and mutations are not initialised.`);
        }
        this._activated = true;
        this.onActivate();
    }

    public deactivate(): void {
        this._activated = false;
        this.onDeactivate();
    }

    public get state(): DeepReadonly<S> {
        if(!this._activated) {
            throw new Error(`Can't get state of ${this.constructor.name} because it's not activated.`);
        }
        return this._state;
    }

    public get mutate(): M {
        if(!this._activated) {
            throw new Error(`Can't mutate the state of ${this.constructor.name} because it's not activated.`);
        }
        return this._mutations;
    }

    public get isActive(): boolean {
        return this._activated;
    }

    protected onCreate(): void { }

    protected onInit(): void { }

    protected onActivate(): void { }

    protected onDeactivate(): void { }

}