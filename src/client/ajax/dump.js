// Http requests to get all department, courses, teacher, and section data

//get course index (get it if we don't have it -> return it either way)
export default async function getCourses() {
  if (localStorage && localStorage.courses) {
    console.log("local")
    return JSON.parse(localStorage.courses);
  } else {
    console.log('foreign')
    //if we don't actyally have the course index, let's search if up
    const data = await fetch('/static/js/sections.json');
    const cd = await data.json();
    const courses = cd.courses.reduce((obj, c) => {
      obj[c.crn] = c;
      return obj
    }, {});
    if (localStorage) {
      localStorage.courses = JSON.stringify(courses);
    }
    return courses;
  }
}
