import React from 'react';
import ReactDOM from 'react-dom';
import './normalize.css';
import './skeleton.css';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from "react-router-dom";

ReactDOM.render(
  <Router>
    <App authorized={false} login="daryao" />
  </Router>,
  document.getElementById('root')
);

/* Using Fragments */

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