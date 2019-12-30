const sdl = require('../sdl-addon/build/Release/SDLAddon');
const BaseComponent = require('./base-component');

class Spritesheet extends BaseComponent {
    constructor(props) {
        super();

        this.image = props.image;
    }

    initialize() {
        sdl.loadImage(this.image);
    }
}

module.exports = Spritesheet;