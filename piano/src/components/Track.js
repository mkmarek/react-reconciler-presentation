class Track {
	constructor(root, props) {
		this.root = root;
		this.props = props;
		this.children = [];

		this.root.appendChild(this);
	}

	getCommandAndOffset(a, b, parentOffset) {
		const { tempo, octave, } = this.props;
		let commands = [];
		let currentOffset = 0;

		for (let child of this.children) {
			const [command, offset] = child.getCommandAndOffset(tempo, octave, currentOffset + parentOffset);
			
			if (command) {
				commands = [...commands, ...command ];
			}

			console.log(offset);
			currentOffset += offset;
		}

		return [commands, currentOffset];
	}

	appendChild(child) {
		this.children.push(child);
	}
}

module.exports = Track;