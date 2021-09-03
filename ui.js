/****************************************************************************
 * ui.js
 * openacousticdevices.info
 * August 2021
 *****************************************************************************/

'use strict';

/* global document */

const electron = require('electron');
const menu = electron.remote.Menu;
const ipc = electron.ipcRenderer;

const nightMode = require('./nightMode.js');

/* UI components */

const applicationMenu = menu.getApplicationMenu();

/* Switch between display modes */

function setNightMode (nm) {

    nightMode.setNightMode(nm);

}

exports.setNightMode = setNightMode;

function toggleNightMode () {

    nightMode.toggle();

}

exports.toggleNightMode = toggleNightMode;

exports.isNightMode = nightMode.isEnabled;

ipc.on('poll-night-mode', function () {

    electron.ipcRenderer.send('night-mode-poll-reply', nightMode.isEnabled());

});
