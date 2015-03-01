#! /usr/bin/env node

var rdp = require('./rdp');
var Command = require('commander').Command;
var packageInfo = require('../package.json');

var program = new Command();
program
  .version(packageInfo.version)
  .usage('-a <address> -u <username> -p <password>')
  .option('-a, --address <address>', 'address to connect to')
  .option('-u, --username <username>', 'username to use for connection')
  .option('-p, --password <password>', 'password to use for connection')
  .option('--colors <colors>', 'number of colors to use')
  .option('--launch <launch>', 'launch application after connection')
  .option('--launchdir <launchWorkingDirectory>', 'working directory for the application to be launched')
  .option('--no-clean', 'don\'t remove credentials and temporary files after disconnection')
  .option('--no-autoreconnect', 'don\'t auto-reconnect after an erroneous disconnection')
  .option('--no-fullscreen', 'don\'t launch as a fullscreen application')
  .option('--no-printers', 'disable printers')
  .option('--no-clipboard', 'disable clipboard')
  .option('--no-drives', 'disable all drives')
  .parse(process.argv);

var config = {
  address: program.address,
  username: program.username,
  password: program.password,
  colors: program.colors,
  launch: program.launch,
  launchWorkingDirectory: program.launchdir,
  deleteCredentialsAfter: program.clean,
  autoReconnect: program.autoreconnect,
  fullscreen: program.fullscreen,
  enableLocalPrinters: program.printers,
  enableClipboard: program.clipboard,
  enableDrives: program.drives ? '*' : ''
};

if (!(config.address && config.username && config.password)) {
  program.outputHelp();
  return;
}

console.log('Connecting to %s as user %s...', config.address, config.username);

rdp(config)
  .then(function() {
    console.log('Disconnected from %s.', config.address);
  })
  .fail(function(err) {
    console.error(err);
  });