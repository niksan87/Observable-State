import { ModelState } from 'modules/model/IModel';
import { ModelMutations } from 'modules/model/ModelMutations';
import { Store } from 'modules/store/Store';

export class Model<S extends ModelState = ModelState, M extends ModelMutations<S> = ModelMutations<S>> extends Store<S, M> {

}