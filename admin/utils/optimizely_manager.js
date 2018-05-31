import optimizely from 'optimizely-client-sdk';

const PROJECT_JSON_URL = `https://cdn.optimizely.com/json/${OPTIMIZELY_PROJECT_ID}.json`;

// Singleton instance of the optimizely object
let optlyInstance;

// In-memory copy of the datafile. We could also keep this in some form of cache like redis or memcached
let datafile;


export default function getOptimizelyInstance(fetchDatafile) {
  return new Promise((resolve) => {
    // check if we have a datafile or if we are forced to re-fetch it
    if (!datafile || fetchDatafile) {
      getDatafile()
        .then((fetchedDatafile) => {
          datafile = fetchedDatafile;
          const instance = _getInstance(fetchedDatafile);
          resolve(instance);
        });
    } else {
      const instance = _getInstance(datafile);
      resolve(instance);
    }
  });
}

function _getInstance(datafile) { // eslint-disable-line no-underscore-dangle
  if (!optlyInstance) {
    optlyInstance = optimizely.createInstance({
      datafile,
      skipJSONValidation: true, // This should be set to false if we modify the datafile in any way
    });
  }
  return optlyInstance;
}

function getDatafile() {
  return new Promise((resolve) => {
    fetch(PROJECT_JSON_URL, { mode: 'cors' })
      .then((response) => {
        resolve(response.json());
      });
  });
}
