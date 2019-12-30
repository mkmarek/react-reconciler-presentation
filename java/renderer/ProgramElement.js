const JavaElement = require('./JavaElement');
const fs = require('fs');

class ProgramElement extends JavaElement {
    render() {
        const classes = this.children.map(e => ({ name: e.props.name, code: e.render() }));

        for (let cls of classes) {
            fs.writeFileSync(`tmp/${cls.name}.java`, cls.code);
        }

        return classes.map(e => `tmp/${e.name}.java`);
    }
}

module.exports = ProgramElement;