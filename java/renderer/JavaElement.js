class JavaElement {
    constructor(type, props) {
        this.type = type;
        this.children = [];
        this.props = props;
    }

    addChild(child) {
        this.children.push(child);
    }

    render() {
        return '';
    }
}

module.exports = JavaElement;