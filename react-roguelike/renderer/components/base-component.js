class BaseComponent {
    constructor() {
        this.children = [];
    }

    appendChild(child) {
        this.children.push(child);
    }
}

module.exports = BaseComponent;