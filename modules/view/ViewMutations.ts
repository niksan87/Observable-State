import { Mutations } from 'modules/store/Mutations';

export class ContainerMutations<S extends PIXI.Container = PIXI.Container> extends Mutations<S> {

    public ALPHA(value: number): void {
        this.state.alpha = value;
    }

    public RENDERABLE(value: boolean): void {
        this.state.renderable = value;
    }

    public SCALE_X(value: number): void {
        this.state.scale.x = value;
    }

}

export class TextMutations<S extends PIXI.Text = PIXI.Text> extends ContainerMutations<S> {

    public TEXT(value: string): void {
        this.state.text = value;
    }

}