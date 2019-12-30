const React = require('react');

const { render } = require('../src');

const IntroUp = () => (
	<React.Fragment>
		<note tone="A" hold={1/2} />
		<note tone="F" hold={1/2} />
		<note tone="D" hold={1/2} />
		<note tone="A" hold={1/2} />

		<note tone="G" hold={1/2} />
		<note tone="E" hold={1/2} />
		<note tone="C" hold={1/2} />
		<note tone="G" hold={1/2} />

		<note tone="A" hold={1/2} />
		<note tone="F" hold={1/2} />
		<note tone="D" hold={1} />
	</React.Fragment>
);

const IntroDown = () => (
	<React.Fragment>
		<note tone="D" hold={1/2} />
		<note tone="F" hold={1/2} />
		<note tone="A" hold={1/2} />
		<note tone="F" hold={1/2} />

		<note tone="C" hold={1/2} />
		<note tone="E" hold={1/2} />
		<note tone="G" hold={1/2} />
		<note tone="E" hold={1/2} />

		<note tone="B" hold={1/2} octave={-1} />
		<note tone="D" hold={1/2} />
		<note tone="F" hold={1} />
	</React.Fragment>
);

const FirstLine = ({ octave }) => (
	<paralleltrack>
		<track tempo={4/4} octave={octave}>
			<IntroUp />

			<rest hold={1} />

			<note tone="C" hold={1/4} octave={1} />
			<note tone="B" hold={1/4} />
			<note tone="A" hold={1/4} />
			<note tone="G" hold={1/4} />

			<IntroUp />
		</track>
		<track tempo={4/4} octave={octave + 1}>
			<IntroUp />

			<rest hold={1} />

			<note tone="C" hold={1/4} octave={1} />
			<note tone="B" hold={1/4} />
			<note tone="A" hold={1/4} />
			<note tone="G" hold={1/4} />

			<IntroUp />
		</track>
		<track tempo={4/4} octave={octave - 1} volume={0.9}>
			<IntroDown />

			<note tone="B" hold={1/2} octave={-1} />
			<note tone="D" hold={1/2} />
			<note tone="F" hold={1} />

			<IntroDown />

			<note tone="B" hold={1/2} octave={-1} />
			<note tone="D" hold={1/2} />
			<note tone="F" hold={1} />
		</track>
	</paralleltrack>
)

const SecondUp = () => (
	<React.Fragment>
		<note tone="D" hold={1/2} />
		<note tone="Bb" hold={1/2} octave={-1} />
		<note tone="G" hold={1/2} octave={-1} />
		<note tone="D" hold={1/2} />

		<note tone="C" hold={1} />
		<rest hold={1/2} />
		<note tone="Bb" hold={1/4} octave={-1} />
		<note tone="A" hold={1/4} octave={-1} />

		<note tone="G" hold={2} octave={-1} />

		<note tone="A" hold={1/2} octave={-1} />
		<note tone="Bb" hold={1/2} octave={-1} />
	</React.Fragment>
);

const SecondDown = ({ octave }) => (
	<React.Fragment>
		<note tone="E" hold={1/2} />
		<note tone="G" hold={1/2} />
		<note tone="B" hold={1/2} />
		<note tone="G" hold={1/2} />

		<note tone="D" hold={1/2} />
		<note tone="F" hold={1/2} />
		<note tone="A" hold={1/2} />
		<note tone="F" hold={1/2} />

		<paralleltrack tempo={4/4} octave={octave}>
			<note tone="C" hold={2} />
			<note tone="C" hold={2} octave={-1} />
		</paralleltrack>
	</React.Fragment>
);

const SecondLine = ({ octave }) => (
	<paralleltrack>
		<track tempo={4/4} octave={octave}>
			<SecondUp />
		</track>
		<track tempo={4/4} octave={octave + 1}>
			<SecondUp />
		</track>
		<track tempo={4/4} octave={octave - 1}>
			<SecondDown octave={octave - 1} />
		</track>
	</paralleltrack>
)

const ThirdUp = () => (
	<React.Fragment>
		<note tone="C" hold={2} />
		<rest hold={1/2} />
		<note tone="E" hold={1/2} />
		<note tone="A" hold={1/2} />
		<note tone="Bb" hold={1/2} />
		<note tone="C" hold={2} octave={1} />
		<rest hold={1} />
	</React.Fragment>
);

const ThirdDown = ({ octave }) => (
	<React.Fragment>
		<note tone="F" hold={1/2} octave={-1} />
		<note tone="Ab" hold={1/2} octave={-1} />
		<note tone="C" hold={1/2} />
		<note tone="F" hold={1/2} />
		<note tone="A" hold={1/2} />
	</React.Fragment>
);

const ThirdLine = ({ octave }) => (
	<paralleltrack>
		<track tempo={4/4} octave={octave}>
			<ThirdUp />
		</track>
		<track tempo={4/4} octave={octave + 1}>
			<ThirdUp />
		</track>
		<track tempo={4/4} octave={octave - 1}>
			<ThirdDown octave={octave - 1} />
		</track>
	</paralleltrack>
)

const Riff = ({ octave, tempo }) => (
	<React.Fragment>
		<paralleltrack octave={octave} tempo={tempo}>
			<note tone="B" hold={1/2} />
			<note tone="F" hold={1/2}/>
			<note tone="B" hold={1/2} octave={1} />
		</paralleltrack>
		<paralleltrack octave={octave} tempo={tempo}>
			<note tone="B" hold={1/2} />
			<note tone="F" hold={1/2}/>
			<note tone="B" hold={1/2} octave={1} />
		</paralleltrack>
		<paralleltrack octave={octave} tempo={tempo}>
			<note tone="B" hold={1/2} />
			<note tone="F" hold={1/2}/>
			<note tone="B" hold={1/2} octave={1} />
		</paralleltrack>
		<paralleltrack octave={octave} tempo={tempo}>
			<note tone="B" hold={1/2} />
			<note tone="F" hold={1/2}/>
			<note tone="B" hold={1/2} octave={1} />
		</paralleltrack>

		<paralleltrack octave={octave} tempo={tempo}>
			<note tone="B" hold={1/2} />
			<note tone="F" hold={1/2}/>
			<note tone="B" hold={1/2} octave={1} />
		</paralleltrack>
		<paralleltrack octave={octave} tempo={tempo}>
			<note tone="B" hold={1/2} />
			<note tone="F" hold={1/2}/>
			<note tone="B" hold={1/2} octave={1} />
		</paralleltrack>
		<paralleltrack octave={octave} tempo={tempo}>
			<note tone="B" hold={1/2} />
			<note tone="F" hold={1/2}/>
			<note tone="B" hold={1/2} octave={1} />
		</paralleltrack>
		<paralleltrack octave={octave} tempo={tempo}>
			<note tone="B" hold={1/2} />
			<note tone="F" hold={1/2}/>
			<note tone="B" hold={1/2} octave={1} />
		</paralleltrack>

		<paralleltrack octave={octave} tempo={tempo}>
			<note tone="B" hold={1/2} />
			<note tone="Gb" hold={1/2}/>
			<note tone="B" hold={1/2} octave={1} />
		</paralleltrack>
		<paralleltrack octave={octave} tempo={tempo}>
			<note tone="B" hold={1/2} />
			<note tone="Gb" hold={1/2}/>
			<note tone="B" hold={1/2} octave={1} />
		</paralleltrack>
		<paralleltrack octave={octave} tempo={tempo}>
			<note tone="B" hold={1/2} />
			<note tone="Gb" hold={1/2}/>
			<note tone="B" hold={1/2} octave={1} />
		</paralleltrack>
		<paralleltrack octave={octave} tempo={tempo}>
			<note tone="B" hold={1/2} />
			<note tone="Gb" hold={1/2}/>
			<note tone="B" hold={1/2} octave={1} />
		</paralleltrack>

		<paralleltrack octave={octave} tempo={tempo}>
			<note tone="B" hold={1/2} />
			<note tone="Gb" hold={1/2}/>
			<note tone="B" hold={1/2} octave={1} />
		</paralleltrack>
		<paralleltrack octave={octave} tempo={tempo}>
			<note tone="B" hold={1/2} />
			<note tone="Gb" hold={1/2}/>
			<note tone="B" hold={1/2} octave={1} />
		</paralleltrack>
		<paralleltrack octave={octave} tempo={tempo}>
			<note tone="B" hold={1/2} />
			<note tone="Gb" hold={1/2}/>
			<note tone="B" hold={1/2} octave={1} />
		</paralleltrack>
		<paralleltrack octave={octave} tempo={tempo}>
			<note tone="B" hold={1/4} />
			<note tone="Gb" hold={1/4}/>
			<note tone="B" hold={1/4} octave={1} />
		</paralleltrack>
		<paralleltrack octave={octave} tempo={tempo}>
			<note tone="B" hold={1/4} />
			<note tone="E" hold={1/4}/>
			<note tone="B" hold={1/4} octave={1} />
		</paralleltrack>
	</React.Fragment>
);

const FourthLine = ({ octave }) => (
	<React.Fragment>
		<track tempo={4/4} octave={octave}>
			<Riff octave={octave} tempo={2/3} />
			<Riff octave={octave} tempo={2/3} />
		</track>
	</React.Fragment>
)

const FifthLine = ({ octave, tempo }) => (
	<paralleltrack>
		<track>
			<Riff octave={octave} tempo={tempo} />
			<Riff octave={octave} tempo={tempo} />
		</track>
		<track tempo={tempo} octave={6}>
			<rest hold={1} />
			<paralleltrack octave={5} tempo={tempo}>
				<note tone="F" hold={1} />
				<note tone="D" hold={1}/>
			</paralleltrack>
			<rest hold={1} />
			<paralleltrack octave={5} tempo={tempo}>
				<note tone="F" hold={1} />
				<note tone="D" hold={1}/>
			</paralleltrack>
			<rest hold={1} />
			<paralleltrack octave={5} tempo={tempo}>
				<note tone="F" hold={1} />
				<note tone="Bb" hold={1} octave={-1} />
			</paralleltrack>
			<rest hold={1} />
			<paralleltrack octave={5} tempo={tempo}>
				<note tone="F" hold={1} />
				<note tone="Bb" hold={1} octave={-1} />
			</paralleltrack>
			<rest hold={1} />
			<paralleltrack octave={5} tempo={tempo}>
				<note tone="F" hold={1} />
				<note tone="D" hold={1}/>
			</paralleltrack>
			<rest hold={1} />
			<paralleltrack octave={5} tempo={tempo}>
				<note tone="F" hold={1} />
				<note tone="D" hold={1}/>
			</paralleltrack>
			<rest hold={1} />
			<paralleltrack octave={5} tempo={tempo}>
				<note tone="F" hold={1} />
				<note tone="Bb" hold={1} octave={-1} />
			</paralleltrack>
			<rest hold={1} />
			<paralleltrack octave={5} tempo={tempo}>
				<note tone="F" hold={1} />
				<note tone="Bb" hold={1} octave={-1} />
			</paralleltrack>
		</track>
	</paralleltrack>
)

const SixthLine = ({ octave, tempo }) => (
	<paralleltrack>
		<track>
			<Riff octave={octave} tempo={tempo} />
			<Riff octave={octave} tempo={tempo} />
		</track>
		<track tempo={tempo} octave={6}>
			<paralleltrack octave={5} tempo={tempo}>
				<note tone="D" hold={1} octave={-1} />
				<note tone="F" hold={1}/>
				<note tone="A" hold={1}/>
			</paralleltrack>
			<paralleltrack octave={5} tempo={tempo}>
				<note tone="F" hold={1} octave={-1}/>
				<note tone="D" hold={1} octave={-1}/>
			</paralleltrack>
			<rest hold={1} />
			<paralleltrack octave={5} tempo={tempo}>
				<note tone="F" hold={1} octave={-1}/>
				<note tone="D" hold={1} octave={-1}/>
			</paralleltrack>
			<paralleltrack octave={5} tempo={tempo}>
				<note tone="F" hold={1} octave={-1} />
				<note tone="D" hold={1} octave={-1} />
				<note tone="A" hold={1}/>
			</paralleltrack>
			<paralleltrack octave={5} tempo={tempo}>
				<note tone="F" hold={1} octave={-1}/>
				<note tone="B" hold={1} />
			</paralleltrack>
			<rest hold={1} />
			<paralleltrack octave={5} tempo={tempo}>
				<note tone="F" hold={1} octave={-1}/>
				<note tone="B" hold={1} />
			</paralleltrack>
			<paralleltrack octave={5} tempo={tempo}>
				<note tone="D" hold={1} octave={-1} />
				<note tone="F" hold={1}/>
				<note tone="A" hold={1}/>
			</paralleltrack>
			<paralleltrack octave={5} tempo={tempo}>
				<note tone="F" hold={1} octave={-1}/>
				<note tone="D" hold={1} octave={-1}/>
			</paralleltrack>
			<rest hold={1} />
			<paralleltrack octave={5} tempo={tempo}>
				<note tone="F" hold={1} octave={-1}/>
				<note tone="D" hold={1} octave={-1}/>
			</paralleltrack>
			<paralleltrack octave={5} tempo={tempo}>
				<note tone="F" hold={2} />
				<note tone="B" hold={2} />
				<note tone="D" hold={2} />
			</paralleltrack>
			<paralleltrack octave={5} tempo={tempo}>
				<note tone="C" hold={2} />
				<note tone="E" hold={2} />
				<note tone="G" hold={2} />
			</paralleltrack>
		</track>
	</paralleltrack>
)

const Main = () => 
	<track>
		<FirstLine octave={5} />
		<SecondLine octave={5} />
		<ThirdLine octave={5} />
		<FourthLine octave={3} />
		<FifthLine octave={3} tempo={2/3} />
		<SixthLine octave={3} tempo={2/3} />
	</track>

render(<Main />, `${__dirname}/demo2.wav`);