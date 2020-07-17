import { Model } from 'modules/model/Model';
import { View } from 'modules/view/View';
import { Store } from 'modules/store/Store';
import { ContainerMutations } from 'modules/view/ViewMutations';
import { ViewStore } from 'modules/view/ViewStore';

export type InitSettings<M extends Model> = {
    model: M;
    view: View;
}