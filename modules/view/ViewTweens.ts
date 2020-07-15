import { ITweenOptions, ITimelineOptions, ITweenConfig, ViewElement } from 'modules/view/IView';

export abstract class ViewTweens {

    protected tweenTypes = TweenTypes;

    /**
     * The view state data.
     * @author nstefanov
     */
    protected state: ViewElement;

    /**
     * Initialises with the view.
     * @param view
     * @author nstefanov
     */
    public constructor(state: ViewElement) {
        this.tweenTypes.timeline.prototype.getTarget = this.getTarget.bind(this);
        this.state = state;
    }

    /**
     * Ovveriden 'defaults' function that gets or sets global defaults that will be used in every tween.
     * @param config
     * @author nstefanov
     */
    public defaults(defaults: ITweenOptions): ITweenOptions {
        return this.tweenTypes.defaults(defaults);
    }

    /**
     * Ovveriden 'config' function that gets or sets global configuration settings.
     * @param config
     * @author nstefanov
     */
    public config(config: ITweenConfig): ITweenConfig {
        return this.tweenTypes.config(config);
    }

    /**
     * Ovveriden 'from' function that receives id insteaf of element and attaches default options to the sent ones.
     * @param id
     * @param options
     * @author nstefanov
     */
    public from(id: string, options: ITweenOptions): void {
        this.tweenTypes.from(this.getTarget(id), this.setDefaultOptions(id, options));
    }

    /**
     * Ovveriden 'to' function that receives id insteaf of element and attaches default options to the sent ones.
     * @param id
     * @param options
     * @author nstefanov
     */
    public to(id: string, options: ITweenOptions): void {
        this.tweenTypes.to(this.getTarget(id), this.setDefaultOptions(id, options));
    }

    /**
     * Ovveriden 'fromTo' function that receives id insteaf of element and attaches default options to the sent ones.
     * @param id
     * @param fromOptions
     * @param toOptions
     * @author nstefanov
     */
    public fromTo(id: string, fromOptions: ITweenOptions, toOptions: ITweenOptions): void {
        this.tweenTypes.fromTo(this.getTarget(id), this.setDefaultOptions(id, fromOptions), this.setDefaultOptions(id, toOptions));
    }

    /**
     * Ovveriden 'timeline' function that returns the extended timeline that receives id instead of element.
     * @param options
     * @author nstefanov
     */
    public timeline(options?: ITimelineOptions): Timeline {
        return new this.tweenTypes.timeline(options);
    }

    /**
     * Ovveriden 'set' function that receives id insteaf of element and attaches default options to the sent ones.
     * @param id
     * @param options
     * @author nstefanov
     */
    public set(id: string, options: ITweenOptions): void {
        this.tweenTypes.set(this.getTarget(id), this.setDefaultOptions(id, options));
    }

    /**
     * Ovveriden 'getTweensOf' function that receives id insteaf of element and attaches default options to the sent ones.
     * @param id
     * @param options
     * @author nstefanov
     */
    public getTweensOf(id: string, onlyActive?: boolean): Tween[] {
        return this.tweenTypes.getTweensOf(this.getTarget(id), onlyActive);
    }

    /**
     * Sets default options for the current animation. Attaches hook onStart() and onComplete functions.
     * @param id
     * @param options
     * @author nstefanov
     */
    protected setDefaultOptions(id: string, options: ITweenOptions): ITweenOptions {
        const onStart = () => {
            this.onStart(id);
            if(options.onStart) options.onStart();
        };

        const onComplete = () => {
            if(options.onComplete) options.onComplete();
            this.onComplete(id);
        };
        return {
            ...options,
            onStart: onStart,
            onComplete: onComplete
        } as ITweenOptions;
    }

    /**
     * Returns target by id.
     * @param id
     * @author nstefanov
     */
    protected getTarget(id: string): ViewElement {
        return 0 as any;
        // const state = this.state.get(id);
        // if(!state) throw new Error(`View with id '${id} doesn't exist.'`);
        // return state;
    }

    /**
     * A hook function onStart() of animation.
     * @param id
     * @author nstefanov
     */
    protected onStart(id: string): void { }

    /**
     * A hook function onComplete() of animation.
     * @param id
     * @author nstefanov
     */
    protected onComplete(id: string): void { }


}

export class Timeline extends gsap.core.Timeline {

    /**
     * A function that gets the target by id.
     * @param id
     * @author nstefanov
     */
    public getTarget: (id: string) => gsap.TweenTarget;

    /**
     * Ovveriden 'set' method that receives an id instead of an element.
     * @param id
     * @param options
     * @param position
     * @author nstefanov
     */
    public set(id: string, options: ITweenOptions, position?: gsap.Position): this {
        return super.set(this.getTarget(id), options, position);
    }

    /**
     * Use this. A method overload that receives an id instead of an anctual element.
     * @param id
     * @param options
     * @param position
     * @author nstefanov
     */
    public to(id: string, options: ITweenOptions, position?: gsap.Position): this

    /**
     * Deprecated from gsap v2. A method overload that receives an id instead of an anctual element.
     * @param id
     * @param duration
     * @param options
     * @param position
     * @author nstefanov
     */
    public to(id: string, duration: number, options: ITweenOptions, position?: gsap.Position): this

    /**
     * The actual implementation of 'to'.
     * @param paramOne
     * @param paramTwo
     * @param paramThree
     * @param paramFour
     * @author nstefanov
     */
    public to(paramOne: string, paramTwo: ITweenOptions | number, paramThree?: gsap.Position | ITweenOptions, paramFour?: gsap.Position): this {
        const target = this.getTarget(paramOne);
        if(typeof paramTwo !== 'number' && (typeof paramThree === 'number' || typeof paramThree === 'string')) {
            return super.to(target, paramTwo as ITweenOptions, paramThree as gsap.Position);
        } else {
            return super.to(target, paramTwo as number, paramThree as ITweenOptions, paramFour);
        }
    }

    /**
     * Use this. A method overload that receives an id instead of an anctual element.
     * @param id
     * @param options
     * @param position
     * @author nstefanov
     */
    public from(id: string, options: ITweenOptions, position?: gsap.Position): this

    /**
     * Deprecated from gsap v2. A method overload that receives an id instead of an anctual element.
     * @param id
     * @param duration
     * @param options
     * @param position
     * @author nstefanov
     */
    public from(id: string, duration: number, options: ITweenOptions, position?: gsap.Position): this

    /**
     * The actual implementation of 'from' method.
     * @param paramOne
     * @param paramTwo
     * @param paramThree
     * @param paramFour
     * @author nstefanov
     */
    public from(paramOne: string, paramTwo: ITweenOptions | number, paramThree?: gsap.Position | ITweenOptions, paramFour?: gsap.Position): this {
        const target = this.getTarget(paramOne);
        if(typeof paramTwo !== 'number' && (typeof paramThree === 'number' || typeof paramThree === 'string')) {
            return super.from(target, paramTwo as ITweenOptions, paramThree as gsap.Position);
        } else {
            return super.from(target, paramTwo as number, paramThree as ITweenOptions, paramFour);
        }
    }

    /**
     * Use this. A method overload that receives an id instead of an anctual element.
     * @param id
     * @param fromVars
     * @param toVars
     * @param position
     * @author nstefanov
     */
    public fromTo(id: string, fromVars: ITweenOptions, toVars: ITweenOptions, position?: gsap.Position): this;

    /**
     * Deprecated from gsap v2. A method overload that receives an id instead of an anctual element.
     * @param id
     * @param duration
     * @param fromVars
     * @param toVars
     * @param position
     * @author nstefanov
     */
    public fromTo(id: string, duration: number, fromVars: ITweenOptions, toVars: ITweenOptions, position?: gsap.Position): this;

    /**
     * The actual implementation of 'fromTo' method.
     * @param paramOne
     * @param paramTwo
     * @param paramThree
     * @param paramFour
     * @author nstefanov
     */
    public fromTo(paramOne: string, paramTwo: ITweenOptions | number, paramThree: ITweenOptions, paramFour?: ITweenOptions | gsap.Position, paramFive?: gsap.Position ): this {
        const target = this.getTarget(paramOne);
        if(typeof paramTwo !== 'number' && (typeof paramFour === 'number' || typeof paramFour === 'string')) {
            return super.fromTo(target, paramTwo as ITweenOptions, paramThree, paramFour as gsap.Position);
        } else {
            return super.fromTo(target, paramTwo as number, paramThree, paramFour as ITweenOptions, paramFive);
        }
    }

}

export class Tween extends gsap.core.Tween {

}

/**
 * The tween types from gsap.
 * @author eberova
 */
const TweenTypes = {
    defaults: gsap.defaults,
    config: gsap.config,

    from: gsap.from,
    to: gsap.to,
    fromTo: gsap.fromTo,
    timeline: Timeline,

    set: gsap.set,
    getTweensOf: gsap.getTweensOf,
    isTweening: gsap.isTweening,
    killTweensOf: gsap.killTweensOf,
};