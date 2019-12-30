const React = require('react');
const { render } = require('../src');

const CEThreeTimes = () => (
    <>
        <note tone="C" hold={1/4} octave={1} />
        <note tone="E" hold={1/4} />
        <note tone="C" hold={1/4} octave={1} />
        <note tone="E" hold={1/4} />
        <note tone="C" hold={1/4} octave={1} />
        <note tone="E" hold={1/4} />
    </>
)

const CEAndDEInTheMiddle = () => (
    <>
        <note tone="C" hold={1/4} octave={1} />
        <note tone="E" hold={1/4} />
        <note tone="D" hold={1/4} octave={1} />
        <note tone="E" hold={1/4} />
        <note tone="C" hold={1/4} octave={1} />
        <note tone="E" hold={1/4} />
    </>
)

const BEThreeTimes = () => (
    <>
        <note tone="B" hold={1/4} />
        <note tone="E" hold={1/4} />
        <note tone="B" hold={1/4} />
        <note tone="E" hold={1/4} />
        <note tone="B" hold={1/4} />
        <note tone="E" hold={1/4} />
    </>
)

const BEAndCEInTheMiddle = () => (
    <>
        <note tone="B" hold={1/4} />
        <note tone="E" hold={1/4} />
        <note tone="C" hold={1/4} octave={1} />
        <note tone="E" hold={1/4} />
        <note tone="B" hold={1/4} />
        <note tone="E" hold={1/4} />
    </>
)

const TumTudidum = () => (
    <>
        <note tone="A" hold={1/2} />
        <note tone="A" hold={1/8} />
        <note tone="B" hold={1/8} />
        <note tone="A" hold={1/2} />

        <note tone="A" hold={1/8} />
        <note tone="B" hold={1/8} />
        <note tone="A" hold={1/2} />

        <note tone="A" hold={1/8} />
        <note tone="B" hold={1/8} />

        <note tone="A" hold={1/4} />
        <note tone="G" hold={1/4} />
        <note tone="E" hold={1/4} />
        <note tone="D" hold={1/4} />
        <note tone="E" hold={1/2} />
        <rest hold={1} />
    </>
)

const Stones = () =>
	<track tempo={4/4} octave={4}>
		<note tone="A" hold={1/4} />
        <note tone="B" hold={1/4} />
        
        <CEThreeTimes />
        <CEAndDEInTheMiddle />
        <BEThreeTimes />
        <BEAndCEInTheMiddle />
        <TumTudidum />

        <paralleltrack octave={4} tempo={4/4}>
            <track octave={5} tempo={4/4}>
                <note tone="A" hold={1/4} />
                <note tone="B" hold={1/4} />
                <CEThreeTimes />
                <CEAndDEInTheMiddle />
                <BEThreeTimes />
                <BEAndCEInTheMiddle />
                <TumTudidum />
            </track>
            <track octave={4} tempo={4/4}>
                <note tone="A" hold={1/4} />
                <note tone="B" hold={1/4} />
                <CEThreeTimes />
                <CEAndDEInTheMiddle />
                <BEThreeTimes />
                <BEAndCEInTheMiddle />
                <TumTudidum />
            </track>
        </paralleltrack>
	</track>

render(<Stones />, `${__dirname}/demo3.wav`);