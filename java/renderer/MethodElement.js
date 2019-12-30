const JavaElement = require('./JavaElement');

class ClassElement extends JavaElement {
    render() {
        return `${this.props.modifiers.join(' ')} ${this.props.type} ${this.props.name}(${(this.props.arguments || []).join(', ')}) {
            ${this.children.map(e => e.render()).join('\n')}
        }`;
    }
}

module.exports = ClassElement;