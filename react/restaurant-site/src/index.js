import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './normalize.css';
import './skeleton.css';
import App from './App';

ReactDOM.render(<App authorized={false} />,
  document.getElementById('root')
);

/* Using Fragmnets */

// function AppTwo() {
//   return <h1>Second Store</h1>
// }

// ReactDOM.render(
//   <>
//   <App />
//   <AppTwo />
//   </>,
//   document.getElementById('root')
// );