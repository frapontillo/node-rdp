var buildRdpFile = require('./rdp-file');
var rdpConnect = require('./rdp-connect');
var freeRdp = require('./free-rdp');
var os = require('os');

/**
 * Connects to a RDP server based on a configuration file.
 * The return value is a {Q.promise} that will be resolved:
 *   - with any value when the connection has terminated, if config.safeMode is false
 *   - with a {Q.defer} object as soon as the connection is initiated, if config.safeMode is true
 * The {Q.defer} object can be manually rejected in order to manually terminate the connection.
 *
 * @param config The configuration object
 * @returns {Q.promise} The promise that will be resolved when the connection is terminated
 * or when the connection is initiated.
 */
function rdp(config) {
  var osType = os.type();
  // for Windows, use the regular workflow
  if (osType === 'Windows_NT') {
    return buildRdpFile(config)
      .then(function(filePath) {
        return rdpConnect(config, filePath);
      });
  }
  // for other platforms, rely on FreeRDP
  return freeRdp(config);
}

module.exports = rdp;