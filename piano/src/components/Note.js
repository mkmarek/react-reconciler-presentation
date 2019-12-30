var SoxCommand = require('sox-audio');

class Note {
	constructor(root, props) {
		this.root = root;
		this.props = props;
	}

	appendChild(child) {
	}

	getCommandAndOffset(tempo, baseOctave, offset) {
		const { tone, hold, octave } = this.props;
		const toneLength = tempo * hold;

		const command = SoxCommand()
			.input(`|sox piano/sounds/${tone}${baseOctave + (octave || 0)}.wav -t wav -p trim 0 ${Math.round(toneLength * 1.3 * 100) / 100} delay ${Math.round(offset * 100) / 100}`);

		return [[command], toneLength];
	}
}

module.exports = Note;