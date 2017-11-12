import React from 'react';
import App from './components/App.jsx'
import { render } from 'react-dom';
import DevTools from 'mobx-react-devtools';
import getDB from './stores/db.js';
import getCourses from './ajax/dump.js';
import resolve from './ajax/resolve.js';

import fuse from './fuse/fuse.js';
import Store from './stores/store.js';

//Searching options
const options = {
  shouldSort: true,
  threshold: 0.5,
  location: 0,
  distance: 100,
  maxPatternLength: 35,
  minMatchCharLength: 3,
  keys: [
    'department',
    'name',
    'class',
    'section',
    'instructors',
    'crn',
    'description'
  ]
};

const crns = localStorage.crns ? localStorage.crns.split(",") : [];

(async function init() {
  const db = await getDB();
  const courseData = await getCourses();
  const schedule = await resolve(crns);
  const store = new Store(courseData, schedule.classes);
  fuse.start(Object.values(courseData.courses), options)
  render(
    <App store={store} db={db} />,
    document.getElementById('root')
  );
})()
