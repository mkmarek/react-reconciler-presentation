class Rest {
	constructor(root, props) {
		this.root = root;
		this.props = props;
	}

	appendChild(child) {
	}

	getCommandAndOffset(tempo) {
		const { hold } = this.props;
        const toneLength = tempo * hold;
        
		return [null, toneLength];
	}
}

module.exports = Rest;