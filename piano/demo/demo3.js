const React = require('react');
const { render } = require('../src');

const CE = () => (
    <>
        <note tone="C" hold={1/2} octave={1} />
        <note tone="E" hold={1/2} />
    </>
)

const BE = () => (
    <>
        <note tone="B" hold={1/2} />
        <note tone="E" hold={1/2} />
    </>
)

const CEThreeTimes = () => (
    <>
        <CE />
        <CE />
        <CE />
    </>
)

const CETwoTimesWithDEInTheMiddle = () => (
    <>
        <CE />
        <note tone="D" hold={1/2} octave={1} />
        <note tone="E" hold={1/2} />
        <CE />
    </>
)

const BEThreeTimes = () => (
    <>
        <BE />
        <BE />
        <BE />
    </>
)

const BETwoTimesWithCEInTheMiddle = () => (
    <>
        <BE />
        <CE />
        <BE />
    </>
)

const TumTudidum = () => (
    <>
        <note tone="A" hold={1} />
        <note tone="A" hold={1/4} />
        <note tone="B" hold={1/4} />
        <note tone="A" hold={1} />

        <note tone="A" hold={1/4} />
        <note tone="B" hold={1/4} />
        <note tone="A" hold={1} />

        <note tone="A" hold={1/2} />
        <note tone="B" hold={1/2} />

        <note tone="A" hold={1/2} />
        <note tone="G" hold={1/2} />
        <note tone="E" hold={1/2} />
        <note tone="D" hold={1/2} />
        <note tone="E" hold={1/2} />
        <rest hold={1} />
    </>
)

const MainTrack = () => (
    <>
        <note tone="A" hold={1/2} />
        <note tone="B" hold={1/2} />
        
        <CEThreeTimes />
        <CETwoTimesWithDEInTheMiddle />
        <BEThreeTimes />
        <BETwoTimesWithCEInTheMiddle />
        <TumTudidum />
    </>
);

const tempo = 1 / 2;

const Stones = () =>
	<track tempo={tempo} octave={4}>
		{/* <MainTrack /> */}

        <paralleltrack>
            <track octave={6} tempo={tempo}>
                <MainTrack />
            </track>
            <track octave={5} tempo={tempo}>
                <MainTrack />
            </track>
            <track octave={4} tempo={tempo}>
                <MainTrack />
            </track>
        </paralleltrack>
	</track>

render(<Stones />, `${__dirname}/demo3.wav`);