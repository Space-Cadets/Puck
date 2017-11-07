// Fuse object should also be in this file
let fuse;

importScripts('/static/js/fuse.js'); 

onmessage = function (event) {
  switch (event.data.type) {
    case "start":
      start(event.data.list, event.data.options);
    case "search":
      search(event.data.searchData);
  }
};

//starts up searching
function start(list, options) {
  fuse = new Fuse(list, options);
}

function search(str){
  // event.data is the search string
  var result = fuse.search(str);
  postMessage(result);
}
