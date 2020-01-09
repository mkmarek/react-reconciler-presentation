const React = require('react');
const Track = ({ tempo }) => (
  <track tempo={tempo} octave={0}>
    <rest hold={16.427083} />
    <note tone="F" octave={6} hold={0.736459} />
    <note tone="A" octave={6} hold={20.470833} />
    <note tone="A" octave={5} hold={0.526042000000004} />
    <note tone="B" octave={3} hold={3.557291} />
    <note tone="A" octave={5} hold={0.527083999999995} />
    <note tone="G" octave={3} hold={4.13541600000001} />
    <note tone="D" octave={4} hold={0.032292} />

  </track>
);

module.exports = Track;
