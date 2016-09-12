/**
 * Created by mike on 9/9/16.
 */

'use strict'

/**
 * New Relic agent configuration.
 *
 * See lib/config.defaults.js in the agent distribution for a more complete
 * description of configuration variables and their potential values.
 */
let agentEnabled = true
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'jenkins') {
  agentEnabled = false
}

exports.config = {
  /**
   * Array of application names.
   */
  app_name: [ 'StudyKik Web' ],
  // disable the agent on development environments
  agent_enabled: agentEnabled,
  /**
   * Your New Relic license key.
   */
  license_key: 'bfc082a2b47d13c3b52848905d709cf64faea524',
  logging: {
    /**
     * Level at which to log. 'trace' is most useful to New Relic when diagnosing
     * issues with the agent, 'info' and higher will impose the least overhead on
     * production applications.
     */
    level: 'info'
  }
}
