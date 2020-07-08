import { State, Indexable } from 'modules/proxy/IMisc';

export class Mutations<S extends State> {

    protected state: S;
    private target: Indexable<Object>;
    private rootPropName: string;

    public constructor(target: Indexable<object>, rootPropName: string) {
        this.target = target;
        this.rootPropName = rootPropName;
        this.state = this.target[this.rootPropName];
    }

    public STATE(value: S): void {
        this.state = value;
        this.target['_state'] = this.state;
    }

}