const React = require('react');
const Track = ({ tempo }) => (
  <track tempo={tempo} octave={0}>
    <rest hold={42.25625} />
    <note tone="E" octave={3} hold={4.133333} />
    <note tone="F" octave={5} hold={0.151042} />

  </track>
);

module.exports = Track;
