import React from 'react';
import App from './components/App.jsx'
import { render } from 'react-dom';
import DevTools from 'mobx-react-devtools';

render(
  <App />,
  document.getElementById('root')
);

//store.addTodo('Get Coffee');
//store.addTodo('Write simpler code');
//store.todos[0].finished = true;

// playing around in the console
//window.store = store;
