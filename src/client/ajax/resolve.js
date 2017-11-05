//HTTP requests to resolve CRNs, get sections by name

//get courses by CRN
export default async function getCoursesByCRN(list) {
  const data = await fetch('/crn', {
    headers: new Headers({'Content-Type':'application/json'}),
    method: 'POST',
    body: JSON.stringify({
      classes: list
    }),
  });
  return await data.json();
}
