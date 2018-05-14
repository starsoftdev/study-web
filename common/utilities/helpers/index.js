/* eslint-disable */
// TODO: reconfigure eslint rules w team

/**
 * index.js
 * desc: utility helper functions
 */
'use strict';


/**
 * getQueryStringObject
 * desc: converts query string into object
 * @return {object}  query string object
 */
export function getQueryStringObject() {
  const qs = window.location.search.split('?')[1];
  const qsArr = (qs) ? qs.split('&') : [];

  let qsObj = {};

  // if query params exist, loop
  if (qsArr.length) {
    qsArr.forEach(param => {
      let set = param.split('=');
      qsObj[set[0]] = set[1];
    });
  }

  return qsObj;
};