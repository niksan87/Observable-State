import { ViewElement } from 'modules/view/IView';

export class Timeline {

    private element: ViewElement;
    private instance: gsap.core.Timeline;

    public constructor(element: ViewElement, options: gsap.TimelineVars) {
        this.element = element;
        this.instance = new gsap.core.Timeline(options);
    }

    public set(options: gsap.TweenVars, position?: gsap.Position): Timeline {
        this.instance.set(this.element, options, position);
        return this;
    }

    public to(options: gsap.TweenVars, position?: gsap.Position): Timeline {
        this.instance.to(this.element, options, position);
        return this;
    }

    public from(options: gsap.TweenVars, position?: gsap.Position): Timeline {
        this.instance.from(this.element, options, position);
        return this;
    }

    public fromTo(fromVars: gsap.TweenVars, toVars: gsap.TweenVars, position?: gsap.Position): Timeline {
        this.instance.fromTo(this.element, fromVars, toVars, position);
        return this;
    }

    public delay(value: number): Timeline {
        this.instance.delay(value);
        return this;
    }

}

export class ViewTweens {

    protected element: ViewElement;
    
    public constructor(element: ViewElement) {
        this.element = element;
    }
    
    public defaults(defaults: gsap.TweenVars): gsap.TweenVars {
        return gsap.defaults(defaults);
    }
    
    public config(config: gsap.GSAPConfig): gsap.GSAPConfig {
        return gsap.config(config);
    }
    
    public from(options: gsap.TweenVars): gsap.core.Tween {
        return gsap.from(this.element, options);
    }
    
    public to(options: gsap.TweenVars): gsap.core.Tween {
        return gsap.to(this.element, options);
    }

    public fromTo(fromOptions: gsap.TweenVars, toOptions: gsap.TweenVars): gsap.core.Tween {
        return gsap.fromTo(this.element, fromOptions, toOptions);
    }
    
    public timeline(options?: gsap.TimelineVars): Timeline {
        return new Timeline(this.element, options);
    }
    
    public set(options: gsap.TweenVars): gsap.core.Tween {
        return gsap.set(this.element, options);
    }
    
    public getTweensOf(onlyActive?: boolean): gsap.core.Tween[] {
        return gsap.getTweensOf(this.element, onlyActive);
    }

    public isTweening(): boolean {
        return gsap.isTweening(this.element);
    }

}