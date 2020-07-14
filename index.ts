import './modules/misc/Prototype';
import { Store } from 'modules/core/store/Store';
import { DEFAULT_STATE, MODIFIED_STATE } from 'modules/core/state/State';
import { Mutations } from 'modules/core/mutations/Mutations';
import { State } from 'modules/core/state/IState';
import { Observer } from 'modules/misc/IMisc';

window.onload = () => {

    const test = new Test();
    test.init();
    //test.test();  

};

class Test {

    public init(): void {
        const store = new Store();
        store.init({
            state: DEFAULT_STATE,
            mutations: Mutations,
            reactive: true
        });

        store.bind({
            prop: 'address',
            observer: [this.onChange.bind(this), this.onChange2.bind(this), this.onChange3.bind(this)],
            recursive: true
        });

        store.unbind({
            prop: 'address.street',
            observer: [this.onChange, this.onChange3],
            recursive: true
        });

        //store.mutate.ADDRESS_STREET_NAME('gogo');

        store.mutate.STATE(MODIFIED_STATE);

        debugger;
    }

    private onChange(newValue: any, oldValue, prop: string): void {
        debugger;
    }

    private onChange2(newValue: any, oldValue, prop: string): void {
        debugger;
    }

    private onChange3(newValue: any, oldValue, prop: string): void {
        debugger;
    }

}