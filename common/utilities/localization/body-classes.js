/* eslint-disable */
// TODO: reconfigure eslint rules w team

/**
 * body-classes.js
 * desc: responsible for localization body classes
 * note: used for better control and flexibility on presentation layer
 */
'use strict';

import { locale } from './globals';


/**
 * setBodyClasses
 * desc: set body classes
 * note: uses the global user locale string
 */
export function setBodyClasses() {
    const bodyEle = document.getElementsByTagName('body')[0];
    const localeSplit = locale.split('-');

    // determine body classes
    const langClass = `lang-${localeSplit[0]}`;
    const countryClass = `country-${localeSplit[1]}`;
    const dialectClass = (localeSplit === 3) ? `dialect-${localeSplit[2]}` : '';

    // add body classes
    // note: only add dialect if necessary
    bodyEle.classList.add(langClass, countryClass);
    if (dialectClass) {
        bodyEle.classList.add(dialectClass);
    }
};
