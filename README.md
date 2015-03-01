node-rdp
========

[![NPM version][npm-version-image]][npm-url]
[![Apache License][license-image]][license-url]
[![NPM downloads][npm-downloads-image]][npm-url]

_Microsoft Remote Desktop Protocol wrapper for NodeJS_

Install via `npm`:

```shell
$ npm install node-rdp --save
```

You can also use node-rdp as a shell command if you install it globally with the `--global` modifier.

**IMPORTANT**: Windows is the only platform currently supported. I'm already working on adding Mac OS X support.

## Command Line Usage

The `node-rdp` usage follows the syntax:

```shell
$ node-rdp -a 123.45.67.89:1337 -u DOMAIN\username -p thepassword
```

The needed parameters are:

*  `-a <address>`, `--address <address>` (address to connect to)
*  `-u <username>`, `--username <username>` (username to use for connection)
*  `-p <password>`, `--password <password>` (password to use for connection)

Optional parameters are:

*  `--colors <colors>` (color depth in bits)
*  `--launch <launch>` (launch application after connection)
*  `--launchdir <launchWorkingDirectory>` (working directory for the application to be launched)
*  `--no-clean` (don't remove credentials and temporary files after disconnection)
*  `--no-autoreconnect` (don't auto-reconnect after an erroneous disconnection)
*  `--no-fullscreen` (don't launch as a fullscreen application)
*  `--no-printers` (disable printers)
*  `--no-clipboard` (disable clipboard)
*  `--no-drives` (disable all drives)

You can also use:

*  `-h`, `--help` (output usage information)
*  `-V`, `--version` (output the version number)

## NPM Module Usage

Simply require the `node-rdp` module and call the returned function with a configuration object as a single parameter.
The return value will be a `Promise` object that will be resolved as soon as the connection is terminated.

The configuration object can contain the following parameters:

* `address`: address to connect to (defaults to the empty string `''`)
* `username`: username to use for connection (defaults to the empty string `''`)
* `password`: password to use for connection (defaults to the empty string `''`)
* `deleteCredentialsAfter`: deletes credentials and temporary files after disconnection (defaults to `true`)
* `safeMode`: enables a "safe mode" for handling the connection (see [caveats](#caveats)) (defaults to `false`)
* `autoReconnect`: auto-reconnect after an erroneous disconnection (defaults to `true`)
* `fullscreen`: launch as a fullscreen application (defaults to `true`)
* `colors`: color depth in bits (defaults to `32`)
* `compression`: determines if the connection must be compressed (defaults to `true`)
* `connectionType`: the type of the connection, can be one of `'modem'`, `'low'`, `'satellite'`, `'high'`, `'wan'`, `'lan'`, `'auto'` (defaults to `'auto'`)
* `networkAutoDetect`: set some connection parameters automatically depending on the detected network type (defaults to `true`)
* `bandwidthAutoDetect`: set some connection parameters automatically depending on the detected bandwidth type (defaults to `true`)
* `showWallpaper`: show the wallpaper on the remote computer (defaults to `false`)
* `fontSmoothing`: enable font smoothing (defaults to `false`)
* `desktopComposition`: enable desktop composition, useful for Aero (defaults to `false`)
* `showDraggedWindow`: show full window contents while dragging (defaults to `false`)
* `showMenuAnimations`: show menu animations (defaults to `false`)
* `showThemes`: show themes (defaults to `true`)
* `showBlinkingCursor`: show blinking cursor on input controls (defaults to `true`)
* `audioPlayMode`: determine which audio stream is played, can be one of `'local'`, `'remote'`, `'none'` (defaults to `'local'`)
* `audioCaptureMode`: enable capturing audio on the local computer (defaults to `false`)
* `enableLocalPrinters`: enable local printers on the remote computer (defaults to `true`)
* `enableLocalCOMPorts`: enable local COM ports on the remote computer (defaults to `false`)
* `enableSmartCards`: enable local smart cards on the remote computer (defaults to `true`)
* `enableClipboard`: enable clipboard sharing between the local and remote computers (defaults to `true`)
* `enablePlugAndPlayDevices`: determine a subset of Plug And Play devices (separated by a semi-colon `;`) based on the specified HIDs or the wildcard `*` (defaults to the empty string `''`)
* `enableDrives`: determine a subset of local drives (separated by a semi-colon `;`) for use on the remote computer, based on the labels or the wildcard `*` (defaults to the empty string `''`)
* `enablePos`: enable local Point of Service on the remote computer (defaults to `false`)
* `launch`: application to launch upon connection (defaults to the empty string `''`)
* `launchWorkingDirectory`: working directory for the application to be launched upon connection (defaults to the empty string `''`)

The basic usage is shown below:

```javascript
var rdp = require('node-rdp');

rdp({
  address: '123.45.67.89:1337',
  username: 'DOMAIN\username',
  password: 'thepassword'
}).then(function() {
  console.log('At this, point, the connection has terminated.');
});
```

All other options are pretty straightforward:
if you want to see all of your local computer's drives among the remote computer's ones, just do:

```javascript
var rdp = require('node-rdp');

rdp({
  address: '123.45.67.89:1337',
  username: 'DOMAIN\username',
  password: 'thepassword',
  enableDrives: '*'
}).then(function() {
  console.log('At this, point, the connection has terminated.');
});
```

<a id="caveats">
## Hooplas Involving Circus Tricks (Caveats and Their Friends)

After saving the connection credentials in the system key store, the main RDP connection process is launched.
Sometimes, somehow, the launched process doesn't terminate by itself when the RDP window is closed by the user, causing
the returned promise to never be resolved. Eventually, after a timespan that ranges between a few seconds up to a solid
minute, the process finally closes, returning control to the Node process.

![I know, right?](http://i.imgur.com/nLKkvte.gif)

_I know, right?_

If you need absolute certainty about the handling of the process you can enable `safeMode` among the configuration
parameters; this mode won't resolve the `Promise` with a simple object, but with a `Deferred` one as soon as the
connection is initiated, meaning you can manually resolve it whenever you want (e.g. you can prompt the user to press
some keys to manually terminate the process instead of relying on the window closing).
Also, when this deferred object is resolved, the RDP process will be force-killed by the `node-rdp` module.

The following example implements a simple system that will force-close the connection after a minute.

```javascript
var rdp = require('node-rdp');

rdp({
  address: '123.45.67.89:1337',
  username: 'DOMAIN\username',
  password: 'thepassword',
  safeMode: true
}).then(function(deferred) {
  // this function is entered as soon as the connection is initiated
  setTimeout(function() {
    // by forcing the rejection of the deferred, the connection will be terminated
    console.error('Timeout expired, force-killing the connection')
    deferred.reject();
  }, 1000 * 60);
});
```

The safe mode is not implemented in the `node-rdp` global CLI, since you can simply force-close the process to terminate
all of its children, including the RDP client.

## License

```
   Copyright 2015 Francesco Pontillo

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
```

[license-image]: http://img.shields.io/badge/license-Apache_2.0-blue.svg?style=flat
[license-url]: LICENSE

[npm-url]: https://npmjs.org/package/node-rdp
[npm-version-image]: http://img.shields.io/npm/v/node-rdp.svg?style=flat
[npm-downloads-image]: http://img.shields.io/npm/dm/node-rdp.svg?style=flat