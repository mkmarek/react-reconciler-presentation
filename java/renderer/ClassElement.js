const JavaElement = require('./JavaElement');

class ClassElement extends JavaElement {
    render() {
        return `${this.props.modifiers.join(' ')} class ${this.props.name} {
            ${this.children.map(e => e.render()).join('\n')}
        }`;
    }
}

module.exports = ClassElement;