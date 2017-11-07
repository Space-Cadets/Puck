// Http requests to get all department, courses, teacher, and section data

//get courses by CRN
export default async function getCourses() {
  const data = await fetch('/static/js/sections.json');
  return await data.json();
}
