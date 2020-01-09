const React = require('react');
const Track = ({ tempo }) => (
  <track tempo={tempo} octave={0}>
    <rest hold={6.535417} />
    <note tone="A" octave={4} hold={9.860416} />
    <note tone="A" octave={4} hold={0.751042000000002} />
    <note tone="C" octave={4} hold={15.190625} />
    <note tone="A" octave={5} hold={0.457292000000002} />
    <note tone="D" octave={6} hold={3.416666} />
    <note tone="A" octave={5} hold={0.485416999999998} />
    <note tone="D" octave={6} hold={0.651042000000004} />
    <note tone="A" octave={2} hold={0.555208} />
    <note tone="B" octave={4} hold={0.253124999999997} />
    <note tone="G" octave={3} hold={1.026042} />
    <note tone="D" octave={2} hold={0.570833} />
    <note tone="E" octave={3} hold={0.504167000000002} />
    <note tone="A" octave={5} hold={0.495832999999998} />
    <note tone="A" octave={5} hold={0.943750000000001} />
    <note tone="F" octave={3} hold={0.279167000000001} />
    <note tone="C" octave={6} hold={0.264583000000002} />
    <note tone="A" octave={3} hold={0.566666999999995} />
    <note tone="G" octave={3} hold={2.748958} />
    <note tone="D" octave={3} hold={0.555208} />
    <note tone="D" octave={5} hold={0.265625} />
    <note tone="F" octave={4} hold={0.276042000000004} />
    <note tone="E" octave={5} hold={0.554167} />
    <note tone="F" octave={2} hold={0.254165999999998} />
    <note tone="E" octave={2} hold={0.303125000000001} />
    <note tone="D" octave={2} hold={0.897917} />
    <note tone="A" octave={4} hold={0.04375} />

  </track>
);

module.exports = Track;
