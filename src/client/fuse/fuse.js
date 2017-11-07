const fuseWorker = new Worker("/static/js/search.js");

// Since we're only listening to data,
const fuse = {
  worker: fuseWorker,
  search: (str) => {
    fuseWorker.postMessage({
      type: 'search',
      searchData: str,
    });
    console.log("searching");

    //resolve worker queries in promises to make life a little easier
    return new Promise((resolve, reject) => {
      fuse.onData = data => {
        if (!data) {
          reject();
        }
        console.log("done");
        resolve(data);
      };
    });
  },
  start: (li, opts) => {
    fuseWorker.postMessage({
      type: 'start',
      list: li,
      options: opts,
    });
  },

  //NOTE: definitely not the best way to do this...
  onData: (data) => {}
}

//respond data
fuseWorker.onmessage = function(event) {
  // event.data contains the search results
  fuse.onData(event.data);
};

export default fuse;
