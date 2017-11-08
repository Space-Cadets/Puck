import {extendObservable, computed, asStructure} from 'mobx';
import resolve from '../ajax/resolve.js';

class State {
  constructor(courseData, courses) {
    extendObservable(this, {
      classes: courseData,
      userClasses: courses,
      crns: courses.map(c => c.crn),
    });
  }

  addClass(course) {
    console.log(course);
    this.userClasses.push(course);
  }
}

export default State;
