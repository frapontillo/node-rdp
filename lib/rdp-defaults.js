var defaults = require('lodash.defaults');

function Defaults() {
  var mappingStructure = {
    address: {
      def: ''
    },
    username: {
      def: ''
    },
    password: {
      def: ''
    },
    deleteCredentialsAfter: {
      def: true
    },
    safeMode: {
      def: false
    },
    autoReconnect: {
      def: true
    },
    fullscreen: {
      def: true
    },
    colors: {
      def: 32
    },
    compression: {
      def: true
    },
    connectionType: {
      def: 'auto'
    },
    networkAutoDetect: {
      def: true
    },
    bandwidthAutoDetect: {
      def: true
    },
    showWallpaper: {
      def: false
    },
    fontSmoothing: {
      def: false
    },
    desktopComposition: {
      def: false
    },
    showDraggedWindow: {
      def: false
    },
    showMenuAnimations: {
      def: false
    },
    showThemes: {
      def: true
    },
    showBlinkingCursor: {
      def: true
    },
    audioPlayMode: {
      def: 'local'
    },
    audioCaptureMode: {
      def: false
    },
    enableLocalPrinters: {
      def: true
    },
    enableLocalCOMPorts: {
      def: false
    },
    enableSmartCards: {
      def: true
    },
    enableClipboard: {
      def: true
    },
    enablePlugAndPlayDevices: {
      def: ''
    },
    enableDrives: {
      def: ''
    },
    enablePos: {
      def: false
    },
    launch: {
      def: ''
    },
    launchWorkingDirectory: {
      def: ''
    }
  };

  var mapping = {};
  for (var key in mappingStructure) {
    mapping[key] = mappingStructure[key].def;
  }

  this.mergeMappingStructure = function(ms) {
    var mergedStructure = defaults({}, mappingStructure, ms);
    return mergedStructure;
  };

  this.mergeConfiguration = function(config) {
    var mergedConfig = defaults({}, config, mapping);
    return mergedConfig;
  };

}

/*
var mappingStructure = {
  address: {
    def: ''
  },
  username: {
    def: ''
  },
  password: {
    def: ''
  },
  deleteCredentialsAfter: {
    def: true
  },
  safeMode: {
    def: false
  },
  autoReconnect: {
    def: true,
    name: 'autoreconnection enabled:i:',
    fn: arrayMatchTransform([false, true])
  },
  fullscreen: {
    def: true,
    name: 'screen mode id:i:',
    fn: arrayMatchTransform([false, true], 1)
  },
  colors: {
    def: 32,
    name: 'session bpp:i:'
  },
  compression: {
    def: true,
    name: 'compression:i:',
    fn: arrayMatchTransform([false, true])
  },
  connectionType: {
    def: 'auto',
    name: 'connection type:i:',
    fn: arrayMatchTransform(['modem', 'low', 'satellite', 'high', 'wan', 'lan', 'auto'], 1)
  },
  networkAutoDetect: {
    def: true,
    name: 'networkautodetect:i:',
    fn: arrayMatchTransform([false, true])
  },
  bandwidthAutoDetect: {
    def: true,
    name: 'bandwidthautodetect:i:',
    fn: arrayMatchTransform([false, true])
  },
  showWallpaper: {
    def: false,
    name: 'disable wallpaper:i:',
    fn: arrayMatchTransform([true, false])
  },
  fontSmoothing: {
    def: false,
    name: 'allow font smoothing:i:',
    fn: arrayMatchTransform([false, true])
  },
  desktopComposition: {
    def: false,
    name: 'allow desktop composition:i:',
    fn: arrayMatchTransform([false, true])
  },
  showDraggedWindow: {
    def: false,
    name: 'disable full window drag:i:',
    fn: arrayMatchTransform([true, false])
  },
  showMenuAnimations: {
    def: false,
    name: 'disable menu anims:i:',
    fn: arrayMatchTransform([true, false])
  },
  showThemes: {
    def: true,
    name: 'disable themes:i:',
    fn: arrayMatchTransform([true, false])
  },
  showBlinkingCursor: {
    def: true,
    name: 'disable cursor setting:i:',
    fn: arrayMatchTransform([true, false])
  },
  audioPlayMode: {
    def: 'local',
    name: 'audiomode:i:',
    fn: arrayMatchTransform(['local', 'remote', 'none'], 0)
  },
  audioCaptureMode: {
    def: false,
    name: 'audiocapturemode:i:',
    fn: arrayMatchTransform([false, true])
  },
  enableLocalPrinters: {
    def: true,
    name: 'redirectprinters:i:',
    fn: arrayMatchTransform([false, true])
  },
  enableLocalCOMPorts: {
    def: false,
    name: 'redirectcomports:i:',
    fn: arrayMatchTransform([false, true])
  },
  enableSmartCards: {
    def: true,
    name: 'redirectsmartcards:i:',
    fn: arrayMatchTransform([false, true])
  },
  enableClipboard: {
    def: true,
    name: 'redirectclipboard:i:',
    fn: arrayMatchTransform([false, true])
  },
  enablePlugAndPlayDevices: {
    def: '',
    name: 'devicestoredirect:s:'
  },
  enableDrives: {
    def: '',
    name: 'drivestoredirect:s:'
  },
  enablePos: {
    def: false,
    name: 'redirectposdevices:i:',
    fn: arrayMatchTransform([false, true])
  },
  launch: {
    def: '',
    name: 'alternate shell:s:'
  },
  launchWorkingDirectory: {
    def: '',
    name: 'shell working directory:s:'
  }
};
*/


module.exports = Defaults;