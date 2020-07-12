import { State, Address } from 'modules/misc/IMisc';
import { Store } from 'modules/core/Store';

export class Mutations {

    private initState: (value: State) => State;
    private state: State;

    public constructor(initState: (value: State) => State) {
        this.initState = initState;
    }

    public STATE(value: State): void {
        this.state = this.initState(value);
    }

    public NAME(value: string): void {
        this.state.name = value;
    }

    public AGE(value: number): void {
        this.state.age = value;
    }

    public ADDRESS(value: Address): void {
        this.state.address = value;
    }

    public CODE(value: number): void {
        this.state.address.code = value;
    }

}