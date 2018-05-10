/* eslint-disable */
// TODO: reconfigure eslint rules w team

/**
 * index.js
 * desc: customer feedback widget
 * note: implementation based on AppTentive SDK
 * docs: https://learn.apptentive.com/knowledge-base/integrating-the-apptentive-web-sdk/
 */
'use strict';

import './styles.less';
import * as packageJson from '../../../package.json';


// TODO:...........
// 1. add data (userId, name, email, siteId, studyId, clickTarget)
// 2. style widget (fonts, spacing, etc.)
// .................

export default class feedback {
    /**
     * init
     * desc: initialize feedback widget
     * @argument {object} opts  Configuration options
     */
    init(opts={}) {
        // setup data layer
        ApptentiveSDK.createConversation({
            app_release: {
                version: packageJson.version
            },
            person: {
                unique_token: opts.userId,
                name: opts.name,
                email: opts.email,
                custom_data: {
                    siteId: opts.siteId,
                    studyId: opts.studyId,
                    clickTarget: opts.clickTarget
                }
            }
        });

        // trigger modal
        ApptentiveSDK.setPageName(document.location.pathname);
        ApptentiveSDK.engage('CUSTOMER_FEEDBACK');
    }
};
