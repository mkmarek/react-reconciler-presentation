const Reconciler = require('react-reconciler');
const Window = require('./components/window');
const Spritesheet = require('./components/spritesheet');
const Sprite = require('./components/sprite');
const RenderSprite = require('./components/rendersprite');
const Music = require('./components/music');

const SDLRenderer = Reconciler({
    now: Date.now,
    getRootHostContext: (node) => { },
    prepareForCommit: () => { },
    resetAfterCommit: () => { },
    getChildHostContext: () => { },
    shouldSetTextContent: () => { },
    createTextInstance: () => { },
    finalizeInitialChildren: () => { },
    supportsMutation: true,
    createInstance(type, props) {
        if (type === 'window') return new Window(props);
        if (type === 'spritesheet') return new Spritesheet(props);
        if (type === 'sprite') return new Sprite(props);
        if (type === 'rendersprite') return new RenderSprite(props);
        if (type === 'music') return new Music(props);
    },
    appendInitialChild(parent, child) {
        if (child.initialize) child.initialize();
        parent.appendChild(child);
    },
    appendChild(parent, child) {

        if (child.initialize) child.initialize();

        parent.appendChild(child);
    },
    appendChildToContainer(target, child) {
        if (child.initialize) child.initialize();
        target.window = child;

        child.render();
    },
    removeChild(parent, child) {

    },
    removeChildFromContainer(container, child) {

    },
    prepareUpdate(element, type, prevProps, newProps, rootContainer) {
        return { rootContainer, props: newProps };
    },
    commitUpdate(instance, payload) {
        for (let key of Object.keys(payload.props)) {
            instance[key] = payload.props[key];
        }

        payload.rootContainer.window.render();
    },
});

function render(element) {
    const node = SDLRenderer.createContainer({});
    SDLRenderer.updateContainer(element, node, null);
}

module.exports = {
    render
};