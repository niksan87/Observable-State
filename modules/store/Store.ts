import { Mutations } from 'modules/store/Mutations';
import { InitSettings, BindSettings } from 'modules/store/IStore';
import { DeepReadonly, Dictionary, Observer } from 'modules/misc/IMisc';
import { State } from 'modules/store/State';

const ROOT_PROP = '_state';

export class Store<S extends State, M extends Mutations<S>> {

    private _state: S;
    private mutations: M;

    
    private observers: Dictionary<Observer[]>;
    private _initiated: boolean;
    private _reactive: boolean;
    private reactiveProps: string[];
    
    public get state(): DeepReadonly<S> {
        return this._state;
    }

    public get mutate(): M {
        return this.mutations;
    }

    public get initiated(): boolean {
        return this._initiated;
    }

    public get reactive(): boolean {
        return this._reactive;
    }

    public init(settings: InitSettings<S, M>): void {
        if(this._initiated) {
            throw new Error(`You can't reinitiate '${this.constructor.name}'.`);
        }
        this.mutations = new settings.mutations(this.initState.bind(this));
        this.mutate.STATE(settings.state);
        this._reactive = Array.isArray(settings.reactive) || settings.reactive;
        this.reactiveProps = Array.isArray(settings.reactive) ? settings.reactive : undefined;
        this._initiated = true;
    }

    public bind(settings: BindSettings): void {

        if(!this.reactive) {
            throw new Error(`Cannot use bind because '${this.constructor.name}' it's not reactive. You can change that in the settings passed to 'Store.init()'.`);
        }

        if(this.reactiveProps && !this.reactiveProps.includes(settings.prop)) {
            throw new Error(`Can't bind property '${settings.prop}' because it's not reactive. You can change that in the settings passed to 'Store.init()'.`);
        }

        if(!this.observers){
            this.observers = {};
        }
        
        let target = this;
        let propName = ROOT_PROP;

        settings?.prop?.split('.').filter(value => value).forEach(currPropName => {
            target = target[propName];
            propName = currPropName;
        });

        if(!settings.prop) {
            settings.prop = ROOT_PROP;
        }

        if(typeof settings.observer === 'function') {
            settings.observer = [ settings.observer ];
        }
        
        if(settings.recursive) {
            this.initRecursively(target[propName], settings.prop, settings.observer);
        }

        this.initProp(target, propName, settings.prop, settings.observer);

    }

    public unbind(settings: BindSettings = {}): void {

        if(!this.reactive) {
            throw new Error(`Cannot use unbind because '${this.constructor.name}' it's not reactive. You can change that in the settings passed to 'Store.init()'.`);
        }

        if(!settings.prop) {
            settings.prop = ROOT_PROP;
        }

        if(typeof settings.observer === 'function') {
            settings.observer = [ settings.observer ];
        }

        if(!settings.observer) {
            settings.observer = [];
        }

        if(settings.recursive) {
            for (const key in this.observers) {
                if(key.includes(settings.prop)) {
                    this.observers[key] = settings.observer.length === 0 ? [] : this.filterOutNonOccuring(this.observers[key], settings.observer);
                }
            }
        } else if(this.observers[settings.prop]) {
            this.observers[settings.prop] = settings.observer.length === 0 ? [] : this.filterOutNonOccuring(this.observers[settings.prop], settings.observer);
        }

    }

    private initProp(target: Object, propName: string, id: string, observers: Observer[]): void {

        if (!this.observers[id]) {
            this.observers[id] = [];
        }

        observers = this.filterOutNonOccuring(observers, this.observers[id]);
        this.observers[id].push(...observers);

        let propValue = target[propName];

        Object.defineProperty(target, propName, {
            get: () => propValue,
            set: (newValue) => {
                if (newValue === propValue) {
                    return;
                }
                const oldValue = propValue;
                propValue = newValue;
                this.observers[id].forEach((observe) => observe(propValue, oldValue, id));
            },
        });
    }

    private initRecursively(target: object, id: string, observers: Observer[]): void {
        for (const propName in target) {
            if(typeof target[propName] === 'object') {
                this.initRecursively(target[propName], `${id}.${propName}`, observers);
            }
            this.initProp(target, propName, `${id}.${propName}`, observers);
        }
    }

    private filterOutNonOccuring(a: Observer[], b: Observer[]): Observer[] {
        return !b || b.length === 0 ? a : a.filter(i => !a.filter(k => b.some(j => k.equals(j))).includes(i));
    }


    private initState(value: S): S {
        this._state = value;
        return this._state;
    }

}