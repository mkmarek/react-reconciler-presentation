const React = require('react');
const { render } = require('../src');

const Track1 = require('./demo5/track-0');
const Track2 = require('./demo5/track-1');
const Track3 = require('./demo5/track-2');
const Track4 = require('./demo5/track-3');
const Track5 = require('./demo5/track-4');

const tempo = 1;

const App = () => (
    <paralleltrack tempo={tempo} octave={0}>
        <Track1 tempo={tempo} />
        <Track2 tempo={tempo} />
        <Track3 tempo={tempo} />
        <Track4 tempo={tempo} />
        <Track5 tempo={tempo} />
    </paralleltrack>
)

render(<App />, `${__dirname}/demo5.wav`);