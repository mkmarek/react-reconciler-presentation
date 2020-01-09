class BaseComponent {
    constructor() {
        this.children = [];
    }

    appendChild(child) {
        this.children.push(child);
    }

    removeChild(child) {
        this.children.filter(e => e != child);
    }

    insertBefore(child, beforeChild) {
        const index = this.children.findIndex(e => e === beforeChild);
        console.log(index);

        if (index >= 0)
            this.children.splice(index, 0, child);
    }
}

module.exports = BaseComponent;