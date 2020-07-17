import './modules/misc/Prototype';

import {
    PixiPlugin
} from 'gsap/PixiPlugin';

gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);
window.PIXI = PIXI;

window.onload = () => {

    // Init

};
