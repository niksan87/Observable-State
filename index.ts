import './modules/misc/Prototype';
import { ModelState } from 'modules/model/IModel';
import { ModelMutations } from 'modules/model/ModelMutations';
import { MODIFIED_MODEL_STATE, DEFAULT_MODEL_STATE } from 'modules/model/ModelState';
import { Model } from 'modules/model/Model';
import { View } from 'modules/view/View';
import { TextMutations, ContainerMutations } from 'modules/view/ViewMutations';
import { ViewModel } from 'modules/viewModel/ViewModel';

window.PIXI = PIXI;

window.onload = () => {

    //ModelTest.Test();
    //ViewTest.Test();
    ViewModelTest.Test();

};

class ModelTest {

    private model: Model<ModelState, ModelMutations>;
    private static instance: ModelTest;

    public static Test(): void {
        ModelTest.instance = new ModelTest();
        ModelTest.instance.init();
        ModelTest.instance.case01();
        // ModelTest.instance.case02();
        // ModelTest.instance.case03();
        // ModelTest.instance.case04();
        // ModelTest.instance.case05();
        // ModelTest.instance.case06();
        // ModelTest.instance.case07();
        // ModelTest.instance.case08();
        // ModelTest.instance.case09();
        // ModelTest.instance.case10();
        // ModelTest.instance.case11();
        // ModelTest.instance.case12();
        // ModelTest.instance.case13();
        // ModelTest.instance.case14();
        // ModelTest.instance.case15();
        // ModelTest.instance.case16();
        // ModelTest.instance.case17();
        // ModelTest.instance.case18();
        // ModelTest.instance.case19();
        // ModelTest.instance.case20();
        // ModelTest.instance.case21();
    }

    private init(): void {
        this.model = new Model<ModelState, ModelMutations>();
        this.model.init({
            state: DEFAULT_MODEL_STATE,
            mutations: ModelMutations,
            reactive: true
        });
    }

    private onChange01(newValue: any, oldValue: any, prop: string): void {
        console.group('onChange01');
        console.log('prop: ', `'${prop}'`);
        console.log('hasScope: ', Boolean(this));
        console.log('newValue: ', newValue);
        console.log('oldValue: ', oldValue);
        console.groupEnd();
    }

    private onChange02(newValue: any, oldValue: any, prop: string): void {
        console.group('onChange02');
        console.log('prop: ', `'${prop}'`);
        console.log('hasScope: ', Boolean(this));
        console.log('newValue: ', newValue);
        console.log('oldValue: ', oldValue);
        console.groupEnd();
    }

    /**
     * CASES
     */

    public case01(): void {
        console.group('CASE01');
        this.init();
        this.model.bind({
            observer: this.onChange01.bind(this)
        });
        this.model.mutate.STATE(MODIFIED_MODEL_STATE);
        console.groupEnd();
    }

    public case02(): void {
        console.group('CASE02');
        this.init();
        this.model.bind({
            observer: this.onChange01
        });
        this.model.bind({
            observer: this.onChange02.bind(this)
        });
        this.model.mutate.STATE(MODIFIED_MODEL_STATE);
        console.groupEnd();
    }

    // Status: Fail
    public case03(): void {
        console.group('CASE03');
        this.init();
        this.model.bind({
            observer: this.onChange01
        });
        this.model.bind({
            observer: this.onChange01
        });
        this.model.mutate.STATE(MODIFIED_MODEL_STATE);
        console.groupEnd();
    }

    public case04(): void {
        console.group('CASE04');
        this.init();
        this.model.bind({
            observer: [ this.onChange01.bind(this), this.onChange02 ]
        });
        
        this.model.mutate.STATE(MODIFIED_MODEL_STATE);
        console.groupEnd();
    }

    // Status: Fail
    public case05(): void {
        console.group('CASE05');
        this.init();
        this.model.bind({
            observer: [ this.onChange01.bind(this), this.onChange02 ]
        });

        this.model.bind({
            observer: [ this.onChange01, this.onChange02.bind(this) ]
        });
        
        this.model.mutate.STATE(MODIFIED_MODEL_STATE);
        console.groupEnd();
    }

    public case06(): void {
        console.group('CASE06');
        this.init();
        this.model.bind({
            observer: [ this.onChange01, this.onChange02.bind(this) ]
        });

        this.model.unbind({
            observer: this.onChange01.bind(this)
        });
        this.model.mutate.STATE(MODIFIED_MODEL_STATE);
        console.groupEnd();
    }

    public case07(): void {
        console.group('CASE07');
        this.init();
        this.model.bind({
            observer: this.onChange01
        });

        this.model.unbind({
            observer: this.onChange01.bind(this)
        });

        this.model.bind({
            observer: this.onChange02.bind(this)
        });

        this.model.unbind({
            observer: this.onChange02
        });

        this.model.mutate.STATE(MODIFIED_MODEL_STATE);
        console.groupEnd();
    }

    public case08(): void {
        console.group('CASE08');
        this.init();
        this.model.bind({
            observer: [ this.onChange01.bind(this), this.onChange02 ]
        });

        this.model.unbind({
            observer: this.onChange01.bind(this)
        });
        
        this.model.mutate.STATE(MODIFIED_MODEL_STATE);
        console.groupEnd();
    }

    public case09(): void {
        console.group('CASE09');
        this.init();
        this.model.bind({
            observer: [ this.onChange01.bind(this), this.onChange02 ]
        });

        this.model.unbind({
            observer: this.onChange01
        });
        
        this.model.mutate.STATE(MODIFIED_MODEL_STATE);
        console.groupEnd();
    }

    public case10(): void {
        console.group('CASE10');
        this.init();
        this.model.bind({
            observer: [ this.onChange01.bind(this), this.onChange02 ]
        });

        this.model.unbind({
            observer: [this.onChange01]
        });
        
        this.model.mutate.STATE(MODIFIED_MODEL_STATE);
        console.groupEnd();
    }

    public case11(): void {
        console.group('CASE011');
        this.init();
        this.model.bind({
            prop: 'age',
            observer: this.onChange01.bind(this)
        });
        this.model.mutate.AGE(22);
        console.groupEnd();
    }

    public case12(): void {
        console.group('CASE012');
        this.init();
        this.model.bind({
            prop: 'age',
            observer: [ this.onChange01.bind(this), this.onChange02 ]
        });
        this.model.unbind({
            prop: 'age',
            observer: this.onChange01
        });
        this.model.mutate.AGE(22);
        console.groupEnd();
    }

    public case13(): void {
        console.group('CASE013');
        this.init();
        this.model.bind({
            prop: 'age',
            observer: [ this.onChange01.bind(this), this.onChange02 ]
        });
        this.model.unbind({
            prop: 'age',
        });
        this.model.mutate.AGE(22);
        console.groupEnd();
    }

    public case14(): void {
        console.group('CASE014');
        this.init();
        this.model.bind({
            prop: 'address',
            observer: this.onChange01.bind(this),
            recursive: false
        });
        this.model.mutate.ADDRESS({
            street: {
                name: 'some name',
                number: 777
            },
            code: 787
        });
        this.model.mutate.ADDRESS_CODE(7877);
        console.groupEnd();
    }

    public case15(): void {
        console.group('CASE015');
        this.init();
        this.model.bind({
            prop: 'address',
            observer: this.onChange01.bind(this),
            recursive: true
        });
        this.model.mutate.ADDRESS_CODE(7877);
        console.groupEnd();
    }

    public case16(): void {
        console.group('CASE016');
        this.init();
        this.model.bind({
            prop: 'address',
            observer: this.onChange01.bind(this),
            recursive: false
        });

        this.model.unbind({
            prop: 'address'
        });
        this.model.mutate.ADDRESS({
            street: {
                name: 'some name',
                number: 777
            },
            code: 787
        });
        console.groupEnd();
    }

    public case17(): void {
        console.group('CASE017');
        this.init();
        this.model.bind({
            prop: 'address',
            observer: [this.onChange01.bind(this), this.onChange02.bind(this)],
            recursive: true
        });

        this.model.unbind({
            prop: 'address',
            observer: this.onChange01.bind(this),
            recursive: false
        });
        this.model.mutate.ADDRESS({
            street: {
                name: 'some name',
                number: 777
            },
            code: 787
        });
        console.groupEnd();
    }

    public case18(): void {
        console.group('CASE018');
        this.init();
        this.model.bind({
            prop: 'address',
            observer: this.onChange01.bind(this),
            recursive: true
        });

        
        this.model.mutate.ADDRESS_CODE(1234);
        console.groupEnd();
    }

    public case19(): void {
        console.group('CASE019');
        this.init();
        this.model.bind({
            prop: 'address',
            observer: this.onChange01.bind(this),
            recursive: true
        });

        this.model.unbind({
            prop: 'address'
        });

        
        this.model.mutate.ADDRESS_CODE(1234);
        console.groupEnd();
    }

    public case20(): void {
        console.group('CASE020');
        this.init();
        this.model.bind({
            prop: 'address',
            observer: this.onChange01.bind(this),
            recursive: true
        });

        this.model.unbind({
            prop: 'address',
            recursive: true
        });

        
        this.model.mutate.ADDRESS_CODE(1234);
        console.groupEnd();
    }

    public case21(): void {
        console.group('CASE021');
        this.init();
        this.model.bind({
            prop: 'address',
            observer: this.onChange01.bind(this),
            recursive: true
        });

        this.model.unbind({
            recursive: false
        });

        
        this.model.mutate.ADDRESS_CODE(1234);
        console.groupEnd();
    }

}

class ViewTest {

    private view: View;
    private static instance: ViewTest;
    private app: PIXI.Application;

    public static Test(): void {
        ViewTest.instance = new ViewTest();
        ViewTest.instance.app = new PIXI.Application();
        document.body.appendChild(ViewTest.instance.app.view);
        ViewTest.instance.init();
    }

    private init(): void {
        this.view = new View();
        const cmk = getCMK();
        this.view.init({
            state: cmk,
            reactive: false
        });
        // this.view.get('background').bind({
        //     prop: 'alpha',
        //     observer: this.onChange
        // });
        this.view.get<PIXI.Text, TextMutations>('text').mutate.TEXT('lolz');
        
        this.app.stage.addChild(cmk);
        debugger;
    }

    private onChange(args: any): void {
        debugger;
    }

}

class ViewModelTest {

    private view: View;
    private viewModel: ViewModel<Model>;
    private model: Model<ModelState, ModelMutations>;

    private static instance: ViewModelTest;
    private app: PIXI.Application;

    public static Test(): void {
        ViewModelTest.instance = new ViewModelTest();
        ViewModelTest.instance.app = new PIXI.Application();
        document.body.appendChild(ViewModelTest.instance.app.view);
        ViewModelTest.instance.init();
    }

    public init(): void {
        this.model = new Model<ModelState, ModelMutations>();
        this.model.init({
            state: DEFAULT_MODEL_STATE,
            mutations: ModelMutations,
            reactive: true
        });

        this.view = new View();
        const cmk = getCMK();
        this.view.init({
            state: cmk,
            reactive: ['renderable']
        });
        this.viewModel = new ViewModel();
        this.viewModel.init({
            model: this.model,
            view: this.view
        });

        this.app.stage.addChild(cmk);

        this.viewModel.model.bind({
            prop: 'age',
            observer: this.onChange.bind(this)
        });

        this.viewModel.view.get('background').bind({
            prop: 'alpha',
            observer: this.onChange2.bind(this)
        });

        setTimeout(() => {
            this.viewModel.model.mutate.AGE(17);
        }, 3000);

    }

    private onChange(newValue: any, oldValue: any, propPath: string): void {
        this.view.get('background').mutate.ALPHA(0.8);
        this.view.get('background').mutate.RENDERABLE(false);
        this.view.get<PIXI.Text, TextMutations>('text').mutate.TEXT('some text');
    }

    private onChange2(...args: any[]): void {
        debugger;
    }
}

const getCMK = function(): PIXI.Container {
    const bg = new PIXI.Container();
    bg.name = 'background';
    const text = new PIXI.Text('This is background.', { fill: 'white' });
    text.name = 'text';
    const container = new PIXI.Container();
    container.name = 'container';
    const graphics = new PIXI.Graphics();
    graphics.beginFill(0xDE3249);
    graphics.drawRect(50, 50, 100, 100);
    graphics.endFill();
    graphics.name = 'graphics';
    bg.addChild(container);
    container.addChild(graphics, text);
    return bg;
};