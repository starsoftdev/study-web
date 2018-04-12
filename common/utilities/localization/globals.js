/* eslint-disable */
// TODO: reconfigure eslint rules w team

/**
 * globals.js
 * desc: manages localization globals
 * note: this is temporary implementation until second locale is introduced
 * ......................................................
 * TODO: outstanding list
 *  |_ need to determine how to handle globals
 *  |_ make sure dictionaries build 1x only (no race conditions)
 *  |_ store dictionaries somewhere accessible to entire app (window||redux||file)
 *  |_ make sure dictionaries are available to all components (not just containers)
 *  |_ check if user locale supported, otherwise fallback to settings.locales.DEFAULT
 * ......................................................
 */
'use strict';

import { createDictionaries } from './dictionaries';
import * as settings from '../../settings/app-settings.json';


// globals
const dictionaries = createDictionaries();
const userLocale = 'en-us';

// check if user locale supported
const locale = (settings.locales.SUPPORTED.indexOf(userLocale) !== -1) ? userLocale : settings.locales.DEFAULT;


export { locale, dictionaries };
