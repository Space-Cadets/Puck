//our indexedDB object
if (!window.indexedDB) {
  console.error('Yo, your browser does not support indexDB. Go get chrome.');
}

//load up course list into indexDB if we can.
export default async function getDB(){
  let dbreq = await window.indexedDB.open('courses', 4);
  return await new Promise((resolve, reject) => {
    dbreq.onsuccess = () => resolve(dbreq.result);
    dbreq.onerror = reject;
  });
}
