import { InitSettings } from 'modules/viewModel/IViewModel';
import { Model } from 'modules/model/Model';
import { ContainerMutations } from 'modules/view/ViewMutations';
import { ViewStore } from 'modules/view/ViewStore';

export class ViewModel<M extends Model> {

    public model: M;
    public view: <S extends PIXI.Container, M extends ContainerMutations<S>>(id: string) => ViewStore<S, M>;
    private initiated: boolean;

    public init(settings: InitSettings<M>): void {
        
        if(this.initiated) {
            throw new Error(`You can't reinitiate '${this.constructor.name}'.`);
        }

        this.model = settings.model;
        this.view = settings.view.get.bind(settings.view);
        this.initiated = true;

    }
}