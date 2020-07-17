import { ContainerMutations, TextMutations, GraphicsMutations, SpriteMutations, TilingSpriteMutations } from 'modules/view/ViewMutations';

export type ViewElement = PIXI.Container | PIXI.Text | PIXI.Graphics | PIXI.Sprite | PIXI.TilingSprite;

export type ViewMutations = ContainerMutations<PIXI.Container> | GraphicsMutations<PIXI.Graphics> | SpriteMutations<PIXI.Sprite> | TilingSpriteMutations<PIXI.TilingSprite> | TextMutations<PIXI.Text>