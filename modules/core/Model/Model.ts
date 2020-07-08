import { ModelState } from 'modules/core/Model/IModel';
import { Observable } from 'modules/core/Observable/Observable';
import { ModelMutations } from 'modules/core/Model/ModelMutations';

export class Model<S extends ModelState, M extends ModelMutations<S>> extends Observable<S, M> {

}