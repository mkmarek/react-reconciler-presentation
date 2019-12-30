class ParallelTrack {
	constructor(root, props) {
		this.root = root;
		this.props = props;
		this.children = [];

		this.root.appendChild(this);
	}

	getCommandAndOffset(a, b, parentOffset) {
		const { tempo, octave, } = this.props;
		let commands = [];
		let maxOffset = 0;

		for (let child of this.children) {
			const [command, offset] = child.getCommandAndOffset(tempo, octave, parentOffset);
			
			if (command) {
				commands = [...commands, ...command ];
			}

			maxOffset = Math.max(maxOffset, offset);
		}

		return [commands, maxOffset];
	}

	appendChild(child) {
		this.children.push(child);
	}
}

module.exports = ParallelTrack;