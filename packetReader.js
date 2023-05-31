/****************************************************************************
 * packetReader.js
 * openacousticdevices.info
 * August 2021
 *****************************************************************************/

'use strict';

const audiomoth = require('audiomoth-hid');

function fourBytesToNumber (buffer, offset) {

    return (buffer[offset] & 0xFF) + ((buffer[offset + 1] & 0xFF) << 8) + ((buffer[offset + 2] & 0xFF) << 16) + ((buffer[offset + 3] & 0xFF) << 24);

}

function twoBytesToNumber (buffer, offset) {

    return (buffer[offset] & 0xFF) + ((buffer[offset + 1] & 0xFF) << 8);

}

function digitWithLeadingZero (value) {

    const formattedString = '0' + value;

    return formattedString.substring(formattedString.length - 2);

}

function formatTime (minutes) {

    return digitWithLeadingZero(Math.floor(minutes / 60)) + ':' + digitWithLeadingZero(minutes % 60);

}

function formatDate (date) {

    return (date.valueOf() / 1000) + ' - ' + date.toISOString().replace(/T/, ' ').replace(/\..+/, '') + ' (UTC)';

}

/*

typedef struct {
    uint32_t time;
    uint8_t gain;
    uint8_t clockDivider;
    uint8_t acquisitionCycles;
    uint8_t oversampleRate;
    uint32_t sampleRate;
    uint8_t sampleRateDivider;
    uint16_t lowerFilterFreq;
    uint16_t higherFilterFreq;
    uint32_t serialNumber;
    uint8_t enableEnergySaverMode : 1;
    uint8_t disable48HzDCBlockingFilter : 1;
    uint8_t disableLED : 1;
    uint32_t devid[2];
} configSettings_t;

*/

exports.read = (packet) => {

    let config = {};

    /* Read and decode configuration packet */

    config.time = audiomoth.convertFourBytesFromBufferToDate(packet, 0);

    config.gain = packet[4];
    config.clockDivider = packet[5];
    config.acquisitionCycles = packet[6];
    config.oversampleRate = packet[7];

    config.sampleRate = fourBytesToNumber(packet, 8);
    config.sampleRateDivider = packet[12];

    config.lowerFilterFreq = twoBytesToNumber(packet, 13);
    config.higherFilterFreq = twoBytesToNumber(packet, 15);

    config.energySaverModeEnabled = packet[17] & 1;

    config.disable48DCFilter = (packet[17] >> 1) & 1;

    config.lowGainRangeEnabled = (packet[17] >> 2) & 1;

    config.enableLED = (packet[17] >> 3) & 1 ? 0 : 1;

    globalThis.devID = [fourBytesToNumber(packet, 18), fourBytesToNumber(packet, 22)];

    return config;

};

exports.print = (config) => {

    /* Display configuration */

    console.log('Current time: ', formatDate(config.time));

    console.log('Gain: ', config.gain);
    console.log('Clock divider: ', config.clockDivider);
    console.log('Acquisition cycles: ', config.acquisitionCycles);
    console.log('Oversample rate: ', config.oversampleRate);
    console.log('Sample rate: ', config.sampleRate);
    console.log('Sample rate divider: ', config.sampleRateDivider);

    console.log('Lower filter value: ', config.lowerFilterFreq);
    console.log('Higher filter value: ', config.higherFilterFreq);

    console.log('Enable LED: ', config.enableLED === 1);

    console.log('Energy saver mode enabled: ', config.energySaverModeEnabled === 1);
    console.log('48 Hz DC blocking filter disabled: ', config.disable48DCFilter === 1);
    console.log('Low gain range enabled: ', config.lowGainRangeEnabled === 1);

};
