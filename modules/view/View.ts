import { ViewElement, ViewMutations } from 'modules/view/IView';
import { TextMutations, ContainerMutations, GraphicsMutations, TilingSpriteMutations, SpriteMutations } from 'modules/view/ViewMutations';
import { Constructor } from 'modules/misc/IMisc';
import { InitSettings } from 'modules/store/IStore';
import { ViewStore } from 'modules/view/ViewStore';

export class View {
    
        private map: Map<string, ViewStore<ViewElement, ViewMutations>>;
        private reactive: boolean | string[];

        public get<S extends PIXI.Container, M extends ContainerMutations<S>>(id: string): ViewStore<S, M> {
            return this.map.get(id) as ViewStore<S, M>;
        }

        public init(settings: Omit<InitSettings<ViewElement>, 'mutations'> ): void {
            this.map = new Map();
            this.reactive = settings.reactive;
            this.extractValues(settings.state);
            (window as any)['state'] = this.map;

        }

        private extractValues(viewElement: ViewElement | ViewElement[]): void {
            if(Array.isArray(viewElement)) {
                viewElement.forEach(child => this.extractValues(child));
            } else {
                const viewStore = new ViewStore<ViewElement, ViewMutations>();
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

            case viewElement instanceof PIXI.Graphics:
                return GraphicsMutations;

            case viewElement instanceof PIXI.TilingSprite:
                return TilingSpriteMutations;

            case viewElement instanceof PIXI.Sprite:
                return SpriteMutations;
            
            case viewElement instanceof PIXI.Container:
                return ContainerMutations;
            
            default:
                break;
            }

        }

}