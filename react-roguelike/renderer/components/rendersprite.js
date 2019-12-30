const BaseComponent = require('./base-component');

class RenderSprite extends BaseComponent {
    constructor(props) {
        super();

        this.x = props.x;
        this.y = props.y;
        this.name = props.name;
    }
}

module.exports = RenderSprite;