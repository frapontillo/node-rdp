var Q = require('q');
var childProcess = require('child_process');
var spawn = childProcess.spawn;
var RdpDefaults = require('./rdp-defaults');

var defaults = new RdpDefaults();

function toggle(option, name) {
  return (option ? '+' : '-') + name;
}

function buildConfigArray(config) {
  var params = ['/admin'];
  params.push(
    '/v:' + config.address,
    '/u:' + config.username,
    '/p:' + config.password);
  if (config.fullscreen) {
    params.push('/f');
  }
  params.push('/bpp:' + config.colors);
  if (config.compression) {
    params.push('+compression');
  }
  var network = 'auto';
  if (!config.bandwidthAutoDetect && !config.networkAutoDetect) {
    var broadbandTypes = {
      'low': 'broadband-low',
      'satellite': 'broadband',
      'high': 'broadband-high'
    };
    network = broadbandTypes[config.connectionType];
    if (!network) {
      network = config.connectionType;
    }
  }
  params.push('/network:' + network);
  params.push(toggle(config.showWallpaper, 'wallpaper'));
  params.push(toggle(config.fontSmoothing, 'fonts'));
  params.push(toggle(config.desktopComposition, 'aero'));
  params.push(toggle(config.showDraggedWindow, 'window-drag'));
  params.push(toggle(config.showMenuAnimations, 'menu-anims'));
  params.push(toggle(config.showThemes, 'themes'));
  params.push('/audio-mode:' + ['local', 'remote', 'none'].indexOf(config.audioPlayMode));
  params.push(toggle(config.audioCaptureMode, 'mic')); // TODO: check
  if (config.enableLocalPrinters) {
    params.push('/printer:*');
  }
  if (config.enableLocalCOMPorts) {
    params.push('/serial:*');
  }
  if (config.enableSmartCards) {
    params.push('/smartcard:*');
  }
  params.push(toggle(config.enableClipboard, 'clipboard'));
  if (config.enablePlugAndPlayDevices) {
    params.push('/parallel:*');
    params.push('/usb:*');
  }
  if (config.enableDrives) {
    var drives = config.enableDrives.split(';');
    for (var d in drives) {
      if (drives[d] === '*') {
        params.push('/drive:*');
        break;
      }
      // the label is the same as the drive name
      params.push('/drive:' + drives[d] + ',' + drives[d]);
    }
  }
  if (config.launch) {
    params.push('/shell:' + config.launch);
    if (config.launchWorkingDirectory) {
      params.push('/shell-dir:' + config.launchWorkingDirectory);
    }
  }
  return params;
}

function freeRdp(config) {
  var deferred = Q.defer();
  config = defaults.mergeConfiguration(config);
  var proc = spawn('/Applications/MacFreeRDP.app/Contents/MacOS/MacFreeRDP', buildConfigArray(config));
  // resolve the promise when the process is terminated
  proc.on('exit', function() {
    deferred.resolve(true);
  });
  return deferred.promise;
}

module.exports = freeRdp;