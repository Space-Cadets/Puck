// Http requests to get all department, courses, teacher, and section data

//get course index (get it if we don't have it -> return it either way)
export default async function getCourses() {
  if (localStorage && localStorage.courses && localStorage.index) {
    console.log(JSON.parse(localStorage.index));
    return {
      courses: JSON.parse(localStorage.courses),
      index: JSON.parse(localStorage.index),
    };
  } else {

    //if we don't actyally have the course index, let's search if up
    const data = await fetch('/static/js/sections.json');
    const cd = await data.json();
    const courses = cd.courses.reduce((obj, c) => {
      obj[c.crn] = c;
      return obj
    }, {});

    //write departments and courses within it
    const departments = {};
    Object.values(courses).forEach(c => {
      if (!departments[c.department]) {
        departments[c.department] = {
          [c.class]: [c.crn],
        };
      } else {
        if (departments[c.department][c.class]) {
          departments[c.department][c.class].push(c.crn);
        } else {
          departments[c.department][c.class] = [c.crn];
        }
      }
    });

    if (localStorage) {
      localStorage.courses = JSON.stringify(courses);
      localStorage.index = JSON.stringify(departments);
    }

    return {
      courses: courses,
      index: departments,
    };
  }
}
