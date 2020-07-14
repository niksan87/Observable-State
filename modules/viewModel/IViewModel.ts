import { Model } from 'modules/model/Model';
import { View } from 'modules/view/View';

export type InitSettings<M extends Model> = {
    model: M,
    view: View
}