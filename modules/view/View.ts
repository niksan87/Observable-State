import { ViewElement, ViewMutations } from 'modules/view/IView';
import { TextMutations, ContainerMutations } from 'modules/view/ViewMutations';
import { Store } from 'modules/store/Store';
import { Constructor } from 'modules/misc/IMisc';
import { InitSettings } from 'modules/store/IStore';

export class View {
    
        private map: Map<string, Store<ViewElement, ViewMutations>>;
        private reactive: boolean | string[];

        public get<S extends PIXI.Container, M extends ContainerMutations<S>>(id: string): Store<S, M> {
            return this.map.get(id) as any;
        }

        public init(settings: Omit<InitSettings<ViewElement>, 'mutations'> ): void {
            this.map = new Map();
            this.reactive = settings.reactive;
            this.extractValues(settings.state);
        }

        private extractValues(viewElement: ViewElement | ViewElement[]): void {
            if(Array.isArray(viewElement)) {
                viewElement.forEach(child => this.extractValues(child));
            } else {
                const viewStore = new Store<ViewElement, ViewMutations>();
                viewStore.init({
                    state: viewElement,
                    mutations: this.getMutations(viewElement),
                    reactive: this.reactive
                });
                this.map.set(viewElement.name, viewStore);
                this.extractValues(viewElement.children as ViewElement[]);
            }
        }

        private getMutations(viewElement: ViewElement): Constructor<ViewMutations> {

            switch (true) {
            
            case viewElement instanceof PIXI.Text:
                return TextMutations;
            
            case viewElement instanceof PIXI.Container:
                return ContainerMutations;
            
            default:
                break;
            }

        }

}