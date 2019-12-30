const BaseComponent = require('./base-component');
const fs = require('fs');
const wav = require('wav');
const Speaker = require('speaker');

class Music extends BaseComponent {
    constructor(props) {
        super();

        this.file = props.file;
    }

    initialize() {
        setTimeout(() => {
            const file = fs.createReadStream(this.file);
            const reader = new wav.Reader();

            reader.on('format',(format) => {
                console.log(format);
                this.speaker = new Speaker(format);
                reader.pipe(this.speaker);
            });

            file.pipe(reader);
        }, 0);
    }

    dispose() {
        this.speaker.close();
    }
}

module.exports = Music;