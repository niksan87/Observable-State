import { Mutations } from 'modules/store/Mutations';
import { InitSettings, BindSettings } from 'modules/store/IStore';
import { DeepReadonly, Dictionary, Observer } from 'modules/misc/IMisc';
import { State } from 'modules/store/State';
import { View } from 'modules/view/View';
import { ViewElement, ViewMutations } from 'modules/view/IView';
import { Store } from 'modules/store/Store';
import { ViewTweens } from 'modules/view/ViewTweens';


export class ViewStore<S extends ViewElement, M extends Mutations<S>> extends Store<S, M> {

    tween: ViewTweens;

    public init(settings: InitSettings<S, M>): void {
        super.init(settings);
        this.tween = new ViewTweens(this._state);
    }

}