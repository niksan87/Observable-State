import { State, DeepReadonly, Constructor, Dictionary, Observer, Primitive } from 'modules/proxy/IMisc';
import { Mutations } from 'modules/core/Observable/Mutations';
import { primitiveIntoObject } from 'modules/proxy/Utils';

export abstract class Observable<S extends State, M extends Mutations<S>> {

    protected _state: S;
    protected mutations: M;
    private observers: Dictionary<Observer[]>;
    private _activated: boolean;

    public constructor() {
        this.onCreate();
    }

    public init(state: S, mutations: Constructor<M>): void {
        this._state = state;
        this.initObserving(this, '_state');
        this.mutations = new mutations(this, this._state._id);
        this.onInit();
    }

    private initObserving(target: State, propName: string, id = propName): void {

        this.observe(target, propName, id);
        target = target[propName];

        for(const propName in target) {
            if(propName === '_id') continue;
            
            if(typeof target[propName] === 'object') {
                this.initObserving(target, propName, `${id}.${propName}`);
            } else {
                target[propName] = primitiveIntoObject(target[propName]);
                this.observe(target, propName, `${id}.${propName}`);
            }
        }

    }

    private observe(target: State, propName: string, id: string): void {

        let propValue = target[propName];
        propValue._id = id;

        if(!this.observers) {
            this.observers = {};
        }

        if(!this.observers[id]) {
            this.observers[id] = [];
        }

        Object.defineProperty(target, propName, {
            get: () => propValue,
            set: (newValue) => {
                if(newValue === propValue.valueOf()) return;
                propValue = primitiveIntoObject(newValue);
                propValue._id = id;
                this.observers[id].forEach(observe => observe(propValue));
            },
        });

    }

    public bind<T>(observer: Observer | Observer[]): void;
    public bind<T>(prop: Object | Primitive, observer: Observer | Observer[]): void;
    public bind<T>(paramOne: Observer | Observer[] | Object | Primitive, paramTwo?: Object | Observer | Observer[]): void {

        const isOverflowOne = typeof paramOne === 'function' || Array.isArray(paramOne);
        let observers: Observer[];
        let propId: string;

        if(isOverflowOne) {
            observers = typeof paramOne === 'function' ? [ paramOne as Observer ] : paramOne as Observer[];
            propId = this._state._id;
        } else {
            observers = typeof paramTwo === 'function' ? [ paramTwo as Observer ] : paramTwo as Observer[];
            propId = paramOne._id;
        }

        this.observers[propId]?.push(...observers);

    }


    public unbind(observer?: Observer | Observer[] | undefined): void;
    public unbind(propId: Object | Primitive, observer?: Observer | Observer[]): void;
    public unbind(paramOne?: Observer | Observer[] | Object | Primitive, paramTwo ?: Observer): void {

        const isOverflowOne = typeof paramOne === 'function' || typeof paramOne === 'undefined' || Array.isArray(paramOne);
        let observers: Function[];
        let propId: string;

        if(isOverflowOne) {
            observers = typeof paramOne === 'function' ? [ paramOne as Observer ] : paramOne as Observer[];
            propId = this._state._id;
        } else {
            observers = typeof paramTwo === 'function' ? [ paramTwo as Observer ] : paramTwo as Observer[];
            propId = paramOne._id;
        }

        if(!observers || observers.length === 0){
            this.observers[propId] = [];
        } else {
            this.observers[propId] = this.observers[propId]
                .filter(el => !this.observers[propId].filter(observer => observers.some(currentObserver => observer.equals(currentObserver))).includes(el));
        }

    }

    public activate(): void {

        if(!this._state || !this.mutations){
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

        return this.mutations;
    }

    public get isActive(): boolean {
        return this._activated;
    }

    protected onCreate(): void { }

    protected onInit(): void { }

    protected onActivate(): void { }

    protected onDeactivate(): void { }

}