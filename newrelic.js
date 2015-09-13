/**
 * New Relic agent configuration.
 *
 * See lib/config.defaults.js in the agent distribution for a more complete
 * description of configuration variables and their potential values.
 */

var svcs = JSON.parse(process.env.VCAP_SERVICES);
var nr = svcs.newrelic[0];
console.log(nr);
var license_key = nr.credentials.licenseKey;
console.log(license_key);

exports.config = {
  /**
   * Array of application names.
   */
  app_name: ['SteveGoodRocks'],
  /**
   * Your New Relic license key.
   */
  license_key: license_key,
  logging: {
    /**
     * Level at which to log. 'trace' is most useful to New Relic when diagnosing
     * issues with the agent, 'info' and higher will impose the least overhead on
     * production applications.
     */
    level: 'info'
  }
}
