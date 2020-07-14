import { Mutations } from 'modules/store/Mutations';
import { Address, Street, ModelState } from 'modules/model/IModel';

export class ModelMutations<S extends ModelState = ModelState> extends Mutations<S> {

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