import React from 'react';
import App from './components/App.jsx'
import { render } from 'react-dom';
import DevTools from 'mobx-react-devtools';

render(
  <App />,
  document.getElementById('root')
);
