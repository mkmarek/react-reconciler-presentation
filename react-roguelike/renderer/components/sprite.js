const BaseComponent = require('./base-component');

class Sprite extends BaseComponent {
    constructor(props) {
        super();

        this.x = props.x;
        this.y = props.y;
        this.width = props.width;
        this.height = props.height;
        this.name = props.name;
    }
}

module.exports = Sprite;