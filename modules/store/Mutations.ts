import { State } from 'modules/store/State';

export class Mutations<S extends State = State> {

    protected state: S;
    private initState: (value: S) => S;

    public constructor(initState: (value: S) => S) {
        this.initState = initState;
    }

    public STATE(value: S): void {
        this.state = this.initState(value);
    }

}