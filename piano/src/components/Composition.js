var SoxCommand = require('sox-audio');

class Composition {
	constructor(props) {
		this.props = props;
		this.tracks = [];
	}

	getCommand() {
		const commands = this.tracks[this.tracks.length - 1].getCommandAndOffset(null, null, 12)[0];
		console.log(this.tracks[this.tracks.length - 1]);
		
		let command = SoxCommand();

		for (let c of commands) {
			command = command.inputSubCommand(c);
		}

		return command.combine('mix');
	}

	appendChild(child) {
		this.tracks.push(child);
	}
}

module.exports = Composition;