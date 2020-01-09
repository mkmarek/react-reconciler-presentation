import { render } from './renderer';
import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="some-class" onClick={() => setCount(10)}>
      <span className="span-class">Some text inside span {count}</span>
    </div>
  )
}

  render(<App />, document.getElementById('app'));