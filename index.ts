import { ModelState } from 'modules/core/Model/IModel';
import { ModelMutations } from 'modules/core/Model/ModelMutations';
import { Model } from 'modules/core/Model/Model';
import { DEFAULT_MODEL_DATA, MODIFIED_MODEL_DATA } from 'modules/core/Model/ModelConstants';
import { Observer } from 'modules/proxy/IMisc';
import './modules/proxy/Prototype';

window.onload = () => {
    const model = new TestModel();
    //model.case01();
    //model.case02();
    //model.case03();
    //model.case04();
    //model.case05();
    //model.case06();
    //model.case07();
    //model.case08();
    //model.case09();
    //model.case10();
    model.case11();
    //model.case12();
};

class TestModel {

    private model: Model<ModelState, ModelMutations>;

    public constructor() {
        this.model = new Model<ModelState, ModelMutations>();
        this.model.init(DEFAULT_MODEL_DATA, ModelMutations);
        this.model.activate();
    }

    public case01(): void {
        this.model.bind(this.onChange.bind(this));
        this.model.mutate.STATE(MODIFIED_MODEL_DATA);
    }

    public case02(): void {
        this.model.bind(this.onChange.bind(this));
        this.model.unbind(this.onChange);
        //this.model.unbind(this.onChange.bind(this));
        this.model.mutate.STATE(MODIFIED_MODEL_DATA);
    }

    public case03(): void {
        this.model.bind(this.onChange.bind(this));
        this.model.bind(this.onChangeAnother);
        this.model.mutate.STATE(MODIFIED_MODEL_DATA);
    }

    public case04(): void {
        this.model.bind([this.onChange.bind(this), this.onChangeAnother.bind(this)]);
        this.model.mutate.STATE(MODIFIED_MODEL_DATA);
    }

    public case05(): void {
        this.model.bind([this.onChange.bind(this), this.onChangeAnother.bind(this)]);
        this.model.unbind();
        this.model.mutate.STATE(MODIFIED_MODEL_DATA);
    }

    public case06(): void {
        this.model.bind([this.onChange.bind(this), this.onChangeAnother.bind(this)]);
        this.model.unbind(this.onChange);
        this.model.mutate.STATE(MODIFIED_MODEL_DATA);
    }

    public case07(): void {
        this.model.bind([this.onChange.bind(this), this.onChangeAnother.bind(this)]);
        this.model.unbind([this.onChange, this.onChangeAnother]);
        this.model.mutate.STATE(MODIFIED_MODEL_DATA);
    }

    public case08(): void {
        this.model.bind(this.model.state.name, this.onChange.bind(this));
        this.model.mutate.NAME('Gogo');
    }

    public case09(): void {
        this.model.bind(this.model.state.name, this.onChange.bind(this));
        //this.model.unbind(this.model.state.name, this.onChange);
        this.model.unbind(this.model.state.name, this.onChange.bind(this));
        this.model.mutate.NAME('Gogo');
    }

    public case10(): void {
        this.model.bind(this.model.state.name, [this.onChange.bind(this), this.onChangeAnother.bind(this)]);
        this.model.mutate.NAME('Gogo');
    }

    public case11(): void {
        this.model.bind(this.model.state.name, [this.onChange.bind(this), this.onChangeAnother.bind(this)]);
        this.model.unbind(this.model.state.name, [this.onChangeAnother]);
        this.model.mutate.NAME('Gogo');
        this.model.mutate.NAME('Gogo1');
    }

    public case12(): void {
        this.model.bind(this.model.state.name, [this.onChange.bind(this), this.onChangeAnother.bind(this)]);
        this.model.unbind(this.model.state.name);
        this.model.mutate.NAME('Gogo');
    }

    private onChange(value: any): void {
        debugger;
    }

    private onChangeAnother(value: any): void {
        debugger;
    }

}