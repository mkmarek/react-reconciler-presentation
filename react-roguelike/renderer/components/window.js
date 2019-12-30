const sdl = require('../sdl-addon/build/Release/SDLAddon');
const BaseComponent = require('./base-component');
const RenderSprite = require('./rendersprite');
const Spritesheet = require('./spritesheet');
const Sprite = require('./sprite');

class Window extends BaseComponent {
    constructor(props) {
        super();
        console.log('Creating window');
        sdl.initializeWindow(props.title, props.width, props.height);
        this.interval = setInterval(() => {
            const events = sdl.updateWindow();

            if (events.length && props.onEvents) props.onEvents(events);

            for (let event of events) {
                if (event === 'QUIT') this.dispose();
            }
        }, 1);
    }

    render() {
        const sprites = this.collectSpriteSheets();
        const renderSprites = this.collectRenderSprites();

        for (let renderSprite of renderSprites) {
            const sprite = sprites.find(e => e.name === renderSprite.name);
            if (!sprite) continue;

            sdl.blit(sprite.image, sprite.x, sprite.y, sprite.width, sprite.height, renderSprite.x, renderSprite.y);
        }
    }

    collectSprites(el) {
        let result = [];
        let queue = [el];

        while (queue.length > 0) {
            const el = queue.pop();

            if (el instanceof Sprite) {
                result.push(el);
            }

            for (let child of el.children) {
                queue.push(child);
            }
        }

        return result;
    }

    collectSpriteSheets() {
        let result = [];
        let queue = [this];

        while (queue.length > 0) {
            const el = queue.pop();

            if (el instanceof Spritesheet) {
                const renderSprites = this.collectSprites(el);
                result = [...result, ...renderSprites.map(e => ({ ...e, image: el.image }))]
            }

            for (let child of el.children) {
                queue.push(child);
            }
        }

        return result;
    }

    collectRenderSprites() {
        let result = [];
        let queue = [this];

        while (queue.length > 0) {
            const el = queue.pop();

            if (el instanceof RenderSprite) {
                result.push(el);
            }

            for (let child of el.children) {
                queue.push(child);
            }
        }

        return result;
    }

    dispose() {
        let queue = [];

        for (let child of this.children) {
            queue.push(child);
        }

        while (queue.length > 0) {
            const el = queue.pop();

            if (el.dispose) el.dispose();

            for (let child of el.children) {
                queue.push(child);
            }
        }

        console.log('Disposing window');
        clearInterval(this.interval);
        sdl.close()
    }
}

module.exports = Window;