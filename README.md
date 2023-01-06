# AudioMoth USB Microphone App #
An Electron-based application capable of configuring the sampling settings of the AudioMoth USB microphone.

For more details on the device itself, visit [www.openacousticdevices.info](http://www.openacousticdevices.info).

### Usage ###
Once the repository has been cloned, you must either have electron-builder installed globally, or get it for the app specifically by running:
```
npm install
```

From then onwards, or if you already had electron-builder installed, start the application with:
```
npm run start 
```

Package the application into an installer for your current platform with:
```
npm run dist [win64/win32/mac/linux]
```

This will place a packaged version of the app and an installer for the platform this command was run on into the `/dist` folder. Note that to sign the binary in macOS you will need to run the command above as 'sudo'. The codesign application will retreive the appropriate certificate from Keychain Access.

To download prebuilt installers of the latest stable version for all platforms, visit the AudioMoth Labs page [here](https://www.openacousticdevices.info/usb-microphone).

### Related Repositories ###
* [AudioMoth-HID](https://github.com/OpenAcousticDevices/AudioMoth-HID)
* [AudioMoth Time App](https://github.com/OpenAcousticDevices/AudioMoth-Time-App)

### License ###

Copyright 2017 [Open Acoustic Devices](http://www.openacousticdevices.info/).

[MIT license](http://www.openacousticdevices.info/license).

