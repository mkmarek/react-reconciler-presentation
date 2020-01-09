const React = require('react');
const Track = ({ tempo }) => (
  <track tempo={tempo} octave={0}>
  <rest hold={40.714245} />
<note tone="A" octave={3} hold={55.71423} />
<note tone="A" octave={3} hold={1.42857} />

  </track>
);

module.exports = Track;
