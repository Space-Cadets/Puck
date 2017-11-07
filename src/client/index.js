import React from 'react';
import App from './components/App.jsx'
import { render } from 'react-dom';
import DevTools from 'mobx-react-devtools';
import getDB from './stores/db.js';
import resolve from './ajax/resolve.js';
import getCourses from './ajax/dump.js';
import fuse from './fuse/fuse.js';


//Searching options
const options = {
  shouldSort: true,
  threshold: 0.5,
  location: 0,
  distance: 100,
  maxPatternLength: 12,
  minMatchCharLength: 3,
  keys: [
    "department",
    "name",
    "class",
    "section",
    "instructors",
    "crn",
    "description"
  ]
};

const crns = localStorage.schedule || ["32769","33349", "33396", "33579", "33582"];

(async function init() {
  const db = await getDB();
  const sections = await getCourses();
  console.log(sections.courses);
  window.fuse = fuse;
  fuse.start(sections.courses, options)
  const schedule = await resolve(crns);
  console.log(schedule)
  render(
    <App db={db} classes={schedule.classes} />,
    document.getElementById('root')
  );
})()
