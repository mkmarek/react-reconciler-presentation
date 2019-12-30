const React = require('react');
const { render } = require('../src');

const TuTuDu = () => <>
	<note tone="C" hold={1/4} />
	<note tone="C" hold={1/4} />
	<note tone="A" hold={1/4} octave={-1} />
	<rest hold={1/4} />
</>

const App = () =>
	<track tempo={8/4} octave={4}>
		<TuTuDu />
		<TuTuDu />
		<note tone="C" hold={1/4} />
		<note tone="C" hold={1/4} />
		<note tone="D" hold={1/4} />
		<note tone="C" hold={1/4} />
		<note tone="C" hold={1/2} />
		<note tone="A" hold={1/2} octave={-1} />
	</track>

render(<App />, `${__dirname}/demo1.wav`);