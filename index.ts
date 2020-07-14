import './modules/misc/Prototype';
import { Store } from 'modules/core/store/Store';
import { DEFAULT_STATE, MODIFIED_STATE } from 'modules/core/state/State';
import { Mutations } from 'modules/core/mutations/Mutations';
import { State } from 'modules/core/state/IState';
import { Observer } from 'modules/misc/IMisc';

window.onload = () => {

    const test = new Test();
    test.init();    

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
            observer: this.onChange.bind(this),
            recursive: true
        });

        store.bind({
            observer: this.onChange.bind(this),
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