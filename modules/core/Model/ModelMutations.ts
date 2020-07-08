import { Mutations } from 'modules/core/Observable/Mutations';
import { ModelState, Street, Address } from 'modules/core/Model/IModel';

export class ModelMutations<S extends ModelState = ModelState> extends Mutations<S> {

    public NAME(value: string): void {
        this.state.name = value;
    }

    public ADDRESS(value: Address): void {
        this.state.address = value;
    }

    public STREET(value: Street): void {
        this.state.address.street = value;
    }

    public STREET_NAME(value: string): void {
        this.state.address.street.name = value;
    }

    public STREET_NUMBER(value: number): void {
        this.state.address.street.number = value;
    }

}