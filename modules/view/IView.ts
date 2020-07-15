import { ContainerMutations, TextMutations } from 'modules/view/ViewMutations';

export type ViewElement = PIXI.Container | PIXI.Text | PIXI.Graphics | PIXI.Sprite | PIXI.TilingSprite;

export type ViewMutations = ContainerMutations<PIXI.Container> | TextMutations<PIXI.Text>

export interface ITweenOptions extends gsap.TweenVars { }

export interface ITimelineOptions extends gsap.TimelineVars { }

export interface ITweenConfig extends gsap.GSAPConfig { }