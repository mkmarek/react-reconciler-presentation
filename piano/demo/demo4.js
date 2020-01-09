const React = require('react');
const { render } = require('../src');

const Track1 = require('./demo4/track-0');
const Track2 = require('./demo4/track-1');
const Track3 = require('./demo4/track-2');
const Track4 = require('./demo4/track-3');
const Track5 = require('./demo4/track-4');
const Track6 = require('./demo4/track-5');
const Track7 = require('./demo4/track-6');

const tempo = 1;

const App = () => (
    <paralleltrack tempo={tempo} octave={0}>
        <Track1 tempo={tempo} />
        <Track2 tempo={tempo} />
        <Track3 tempo={tempo} />
        <Track4 tempo={tempo} />
        <Track5 tempo={tempo} />
        <Track6 tempo={tempo} />
        <Track7 tempo={tempo} />
    </paralleltrack>
)

render(<App />, `${__dirname}/demo4.wav`);