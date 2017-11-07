import React from 'react';
import App from './components/App.jsx'
import { render } from 'react-dom';
import DevTools from 'mobx-react-devtools';
import getDB from './stores/db.js';
import resolve from './ajax/resolve.js';
const crns = localStorage.schedule || ["32769","33349", "33396", "33579", "33582"];

(async function init() {
  const db = await getDB();
  const schedule = await resolve(crns);
  console.log(schedule)
  render(
    <App db={db} classes={schedule.classes} />,
    document.getElementById('root')
  );
})()
