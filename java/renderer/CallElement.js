const JavaElement = require('./JavaElement');

const getArgumentValue = (arg) => {
    return `"${arg}"`;
}

class CallElement extends JavaElement {
    render() {
        return `${this.props.path.join('.')}(${this.props.arguments.map(e => getArgumentValue(e)).join(',')});`;
    }
}

module.exports = CallElement;