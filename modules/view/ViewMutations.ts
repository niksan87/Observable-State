import { Mutations } from 'modules/store/Mutations';
import { IPIXIProxy, Cursors, BlendModes } from 'modules/misc/IMisc';

export class DisplayObjectMutations<S extends PIXI.DisplayObject = PIXI.DisplayObject> extends Mutations<S> {

    /**
     * A mutation that updates the alpha.
     * @param id
     * @param value
     * @author nstefanov
     */
    public ALPHA(value: number): void {
        if(value < 0 || value > 1) {
            throw new Error(`Alpha cannot be of value ${value}.`);
        }
        this.state.alpha = value;
    }

    /**
     * A mutation that updates the angle.
     * @param id
     * @param value
     * @author nstefanov
     */
    public ANGLE(value: number): void {
        this.state.angle = value;
    }

    /**
     * A mutation that updates the buttom mode.
     * @param id
     * @param value
     * @author nstefanov
     */
    public BUTTON_MODE(value: boolean): void {
        this.state.buttonMode = value;
    }

    /**
     * A mutation that updates the cache as bitmap.
     * @param id
     * @param value
     * @author nstefanov
     */
    public CACHE_AS_BITMAP(value: boolean): void {
        this.state.cacheAsBitmap = value;
    }

    /**
     * A mutation that updates the cursor.
     * @param id
     * @param value
     * @author nstefanov
     */
    public CURSOR(value: Cursors ): void {
        this.state.cursor = value;
    }

    /**
     * A mutation that updates the interactivity.
     * @param id
     * @param value
     * @author nstefanov
     */
    public INTERACTIVE(value: boolean): void {
        this.state.interactive = value;
    }

    /**
     * A mutation that updates the pivot.
     * @param id
     * @param value
     * @author nstefanov
     */
    public PIVOT(value: number | IPIXIProxy): void {
        this.PIVOT_X(typeof value === 'object' ? value.x : value);
        this.PIVOT_Y(typeof value === 'object' ? value.y : value);
    }

    /**
     * A mutation that updates the x pivot.
     * @param id
     * @param value
     * @author nstefanov
     */
    public PIVOT_X(value: number): void {
        this.state.pivot.x = value;
    }

    /**
     * A mutation that updates the y pivot.
     * @param id
     * @param value
     * @author nstefanov
     */
    public PIVOT_Y(value: number): void {
        this.state.pivot.y = value;
    }

    /**
     * A mutation that updates the name.
     * @param id
     * @param value
     * @author nstefanov
     */
    public NAME(value: string): void {
        throw new Error(`Trying to change the name of '${this.state.name}'. Name property is immutable.`);
    }

    /**
     * A mutation that updates the position.
     * @param id
     * @param value
     * @author nstefanov
     */
    public POSITION(value: number | IPIXIProxy ): void {
        this.POSITION_X(typeof value === 'object' ? value.x : value);
        this.POSITION_Y(typeof value === 'object' ? value.y : value);
    }

    /**
     * A mutation that updates the x position.
     * @param id
     * @param value
     * @author nstefanov
     */
    public POSITION_X(value: number): void {
        this.state.position.x = value;
    }

    /**
     * A mutation that updates the y position.
     * @param id
     * @param value
     * @author nstefanov
     */
    public POSITION_Y(value: number): void {
        this.state.position.y = value;
    }

    /**
     * A mutation that updates the renderability.
     * @param id
     * @param value
     * @author nstefanov
     */
    public RENDERABLE(value: boolean): void {
        this.state.renderable = value;
    }

    /**
     * A mutation that updates the rotation (in radians).
     * @param id
     * @param value
     * @author nstefanov
     */
    public ROTATION(value: number): void {
        this.state.rotation = value;
    }

    /**
     * A mutation that updates the scale.
     * @param id
     * @param value
     * @author nstefanov
     */
    public SCALE(value: number | IPIXIProxy ): void {
        this.SCALE_X(typeof value === 'object' ? value.x : value);
        this.SCALE_Y(typeof value === 'object' ? value.y : value);
    }

    /**
     * A mutation that updates the scale x.
     * @param id
     * @param value
     * @author nstefanov
     */
    public SCALE_X(value: number): void {
        this.state.scale.x = value;
    }

    /**
     * A mutation that updates the scale y.
     * @param id
     * @param value
     * @author nstefanov
     */
    public SCALE_Y(value: number): void {
        this.state.scale.y = value;
    }

    /**
     * A mutation that updates the skew.
     * @param id
     * @param value
     * @author nstefanov
     */
    public SKEW(value: number | IPIXIProxy ): void {
        this.SKEW_X(typeof value === 'object' ? value.x : value);
        this.SKEW_Y(typeof value === 'object' ? value.y : value);
    }

    /**
     * A mutation that updates the skew x.
     * @param id
     * @param value
     * @author nstefanov
     */
    public SKEW_X(value: number): void {
        this.state.skew.x = value;
    }

    /**
     * A mutation that updates the skew y.
     * @param id
     * @param value
     * @author nstefanov
     */
    public SKEW_Y(value: number): void {
        this.state.skew.y = value;
    }

    /**
     * A mutation that updates the visibility.
     * @param id
     * @param value
     * @author nstefanov
     */
    public VISIBLE(value: boolean): void {
        this.state.visible = value;
    }

    /**
     * A mutation that updates the zindex. Parent container must have 'sortableChildren' property set to true.
     * @param id
     * @param value
     * @author nstefanov
     */
    public ZINDEX(value: number): void {
        this.state.zIndex = value;

    }

}

export class ContainerMutations<S extends PIXI.Container = PIXI.Container> extends DisplayObjectMutations<S> {

    /**
     * A mutation that updates the height.
     * @param id
     * @param value
     * @author nstefanov
     */
    public HEIGHT( value: number ): void {
        this.state.height = value;
    }

    /**
     * A mutation that updates the interactive children.
     * @param id
     * @param value
     * @author nstefanov
     */
    public INTERACTIVE_CHILDREN( value: boolean ): void {
        this.state.interactiveChildren = value;
    }

    /**
     * A mutation that updates the sortable children.
     * @param id
     * @param value
     * @author nstefanov
     */
    public SORTABLE_CHILDREN( value: boolean ): void {
        this.state.sortableChildren = value;
    }

    /**
     * A mutation that updates the sort dirty.
     * @param id
     * @param value
     * @author nstefanov
     */
    public SORT_DIRTY( value: boolean ): void {
        this.state.sortDirty = value;
    }

    /**
     * A mutation that updates the width.
     * @param id
     * @param value
     * @author nstefanov
     */
    public WIDTH( value: number ): void {
        this.state.width = value;
    }

}

export class GraphicsMutations<S extends PIXI.Graphics = PIXI.Graphics> extends ContainerMutations<S> {

    public TINT(value: number): void {
        this.state.tint = value;
    }

}

export class SpriteMutations<S extends PIXI.Sprite = PIXI.Sprite> extends ContainerMutations<S> {

    /**
     * A mutation that updates the anchor.
     * @param id
     * @param value
     * @author nstefanov
     */
    public ANCHOR(value: number | IPIXIProxy ): void {
        this.ANCHOR_X(typeof value === 'object' ? value.x : value);
        this.ANCHOR_Y(typeof value === 'object' ? value.y : value);
    }

    /**
     * A mutation that updates the anchor x.
     * @param id
     * @param value
     * @author nstefanov
     */
    public ANCHOR_X(value: number): void {
        this.state.anchor.x = value;
    }

    /**
     * A mutation that updates the anchor y.
     * @param id
     * @param value
     * @author nstefanov
     */
    public ANCHOR_Y(value: number): void {
        this.state.anchor.y = value;
    }

    /**
     * A mutation that updates the blend mode.
     * @param id
     * @param value
     * @author nstefanov
     */
    public BLEND_MODE(value: BlendModes ): void {
        this.state.blendMode = value;
    }

    /**
     * A mutation that updates the roundPixels.
     * @param id
     * @param value
     * @author nstefanov
     */
    public ROUND_PIXELS(value: boolean ): void {
        this.state.roundPixels = value;
    }

    /**
     * A mutation that updates the texture.
     * @param id
     * @param value
     * @author nstefanov
     */
    public TEXTURE(value: PIXI.Texture ): void {
        this.state.texture = value;
    }

    /**
     * A mutation that updates the tint.
     * @param id
     * @param value
     * @author nstefanov
     */
    public TINT(value: number): void {
        //is.stateData[id].tint = value;
    }

}

export class TilingSpriteMutations<S extends PIXI.TilingSprite = PIXI.TilingSprite> extends SpriteMutations<S> {

    /**
     * A mutation that updates the tint.
     * @param id
     * @param value
     * @author nstefanov
     */
    public CLAMP_MARGIN(value: number): void {
        this.state.clampMargin = value;
    }

    /**
     * A mutation that updates the tilePosition.
     * @param id
     * @param value
     * @author nstefanov
     */
    public TILE_POSITION(value: number | IPIXIProxy ): void {
        this.TILE_POSITION_X(typeof value === 'object' ? value.x : value);
        this.TILE_POSITION_Y(typeof value === 'object' ? value.y : value);
    }

    /**
     * A mutation that updates the tilePosition x.
     * @param id
     * @param value
     * @author nstefanov
     */
    public TILE_POSITION_X(value: number): void {
        this.state.tilePosition.x = value;
    }

    /**
     * A mutation that updates the tilePosition y.
     * @param id
     * @param value
     * @author nstefanov
     */
    public TILE_POSITION_Y(value: number): void {
        this.state.tilePosition.y = value;
    }

    /**
     * A mutation that updates the tileScale.
     * @param id
     * @param value
     * @author nstefanov
     */
    public TILE_SCALE(value: number | IPIXIProxy ): void {
        this.TILE_SCALE_X(typeof value === 'object' ? value.x : value);
        this.TILE_SCALE_Y(typeof value === 'object' ? value.y : value);
    }

    /**
     * A mutation that updates the tileScale x.
     * @param id
     * @param value
     * @author nstefanov
     */
    public TILE_SCALE_X(value: number): void {
        this.state.tileScale.x = value;
    }

    /**
     * A mutation that updates the tileScale y.
     * @param id
     * @param value
     * @author nstefanov
     */
    public TILE_SCALE_Y(value: number): void {
        this.state.tileScale.y = value;
    }

    /**
     * A mutation that updates the tileScale y.
     * @param id
     * @param value
     * @author nstefanov
     */
    public FILL(value: number): void {
        //this.state.fill = value;
    }

}

export class TextMutations<S extends PIXI.Text = PIXI.Text> extends SpriteMutations<S> {

    public TEXT(value: string): void {
        this.state.text = value;
    }

    public STYLE(value: PIXI.TextStyle): void {
        this.state.style = value;
    }

    public RESOLUTION(value: number): void {
        this.state.resolution = value;
    }

}