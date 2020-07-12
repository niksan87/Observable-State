import { Store } from 'modules/core/Store';
import { State } from 'modules/misc/IMisc';
import { Mutations } from 'modules/core/Mutations';
import './modules/misc/Prototype';

window.onload = () => {

    const test = new Test();
    test.test01();

};

const data: State = {
    name: 'Pesho',
    age: 11,
    address: {
        code: 1000,
        streetName: 'Pesho str'
    }
};

const modifiedData: State = {
    name: 'Gosho',
    age: 22,
    address: {
        code: 2000,
        streetName: 'Gosho str'
    }
};

class Test {

    private store: Store;

    public constructor() {
        this.store = new Store();
        this.store.init(data, Mutations);
        
        this.store.mutate.STATE(modifiedData);
        console.log(this.store.state === modifiedData);

    }

    public test01(): void {

        this.store.bind({
            propPath: 'address',
            observer: [ this.onChange.bind(this), this.onChange2.bind(this) ],
            recursive: true
        });

        this.store.unbind({
            propPath: 'address',
            observer: this.onChange2,
            recursive: false
        });
        this.store.mutate.STATE(modifiedData);
        this.store.mutate.ADDRESS({
            code: 111,
            streetName: 'yolo'
        });
        //this.store.mutate.CODE(1111);
        
    }

    private onChange(newValue: State, oldValue: State, propPath: string): void {
        console.log(1);
        console.log(newValue.age);
        console.log(oldValue.age);
        console.log('---');
        debugger;
    }

    private onChange2(newValue: State, oldValue: State, propPath: string): void {
        console.log(2);
        console.log(newValue.age);
        console.log(oldValue.age);
        console.log('---');
        debugger;
    }

}