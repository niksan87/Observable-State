import { State, Street, Address } from 'modules/core/state/IState';

export class Mutations<S extends State = State> {

    protected state: S;
    public initState: (value: S) => S;

    public constructor(initState: (value: S) => S) {
        this.initState = initState;
    }

    public STATE(value: S): void {
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

    public ADDRESS_STREET(value: Street): void {
        this.state.address.street = value;
    }

    public ADDRESS_STREET_NAME(value: string): void {
        this.state.address.street.name = value;
    }

    public ADDRESS_STREET_NUMBER(value: number): void {
        this.state.address.street.number = value;
    }

    public ADDRESS_CODE(value: number): void {
        this.state.address.code = value;
    }

}