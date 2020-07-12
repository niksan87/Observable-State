import { Mutations } from 'modules/core/Mutations';
import { Constructor, State, DeepReadonly, Observer, Dictionary, IBindOptions } from 'modules/misc/IMisc';
import { deepCopy } from 'modules/misc/Misc';

const REACTIVE_PROP_NAME = '_state';

export class Store {

    private _state: State;
    private mutations: Mutations;
    private observers: Dictionary<Observer[]>;

    public get state(): DeepReadonly<State> {
        return this._state;
    }

    public get mutate(): Mutations {
        return this.mutations;
    }

    public init(state: State, mutations: Constructor<Mutations>): void {
        this.mutations = new mutations(this.initState.bind(this));
        this.mutate.STATE(deepCopy(state));
        this.initReactivity(this, REACTIVE_PROP_NAME);
    }

    private initState(value: State): State {
        this._state = value;
        return this.state;
    }

    private initReactivity(target: Object, propName: string, id = propName): void {

        this.initProp(target, propName, id);
        target = target[propName];

        for (const propName in target) {
            if(typeof target[propName] === 'object') {
                this.initReactivity(target, propName, `${id}.${propName}`);
            } else {
                this.initProp(target, propName, `${id}.${propName}`);
            }
        }

    }

    private initProp(target: Object, propName: string, id: string): void {
        let propValue = target[propName];

        if(!this.observers) {
            this.observers = {};
        }

        if(!this.observers[id]) {
            this.observers[id] = [];
        }

        Object.defineProperty(target, propName, {
            get: () => propValue,
            set: (newValue) => {
                if(newValue === propValue){
                    return;
                }
                const oldValue = propValue;
                if(typeof propValue === 'object') {
                    propValue = deepCopy(newValue);
                    this.initReactivity(target, propName, id);
                } else {
                    propValue = newValue;
                }
                this.observers[id].forEach(observe => observe(propValue, oldValue, id));
            },
        });
    }

    public bind(options: IBindOptions): void {

        const propPath = `${REACTIVE_PROP_NAME}${options.propPath ? `.${options.propPath}` : ''}`;
        const observers = typeof options.observer === 'function' ? [ options.observer ] : options.observer;
        const recursive = options.recursive || false;

        if(!this.observers[propPath]){
            throw new Error(`Observer for '${propPath}' doesn't exist.`);
        }

        if(recursive) {
            for (const id in this.observers) {
                if(!id.includes(propPath)) continue;
                this.observers[id].push(...observers);
            }
        } else {
            this.observers[propPath].push(...observers);
        }

    }

    public unbind(options: IBindOptions = {}): void {

        const propPath = `${REACTIVE_PROP_NAME}${options.propPath ? `.${options.propPath}` : ''}`;
        const observers = typeof options.observer === 'function' ? [ options.observer ] : options.observer;
        const recursive = options.recursive || false;
        const filterObservers = (id: string) => {
            return !observers || observers.length === 0 ? [] : this.observers[id]
                .filter(el => !this.observers[id].filter(observer => observers.some(currentObserver => observer.equals(currentObserver))).includes(el));
        };
        
        if(recursive) {
            for (const id in this.observers) {
                if(!id.includes(propPath)) continue;

                this.observers[id] = filterObservers(id);
            }
        } else {
            this.observers[propPath] = filterObservers(propPath);
        }

    }
    
}