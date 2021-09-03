/****************************************************************************
 * uiAdvanced.js
 * openacousticdevices.info
 * August 2021
 *****************************************************************************/

const electron = require('electron');

const energySaverModeCheckbox = document.getElementById('energy-saver-mode-checkbox');
const disable48DCFilterCheckbox = document.getElementById('disable-48-dc-filter-checkbox');

exports.isEnergySaverModeEnabled = () => {

    return energySaverModeCheckbox.checked;

};

exports.is48DCFilterDisabled = () => {

    return disable48DCFilterCheckbox.checked;

};

