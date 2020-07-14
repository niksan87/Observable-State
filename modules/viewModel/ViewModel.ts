import { InitSettings } from 'modules/viewModel/IViewModel';
import { View } from 'modules/view/View';
import { Model } from 'modules/model/Model';

export class ViewModel<M extends Model> {

    public model: M;
    public view: View;

    public init(settings: InitSettings<M>): void {
        this.model = settings.model;
        this.view = settings.view;
    }
}