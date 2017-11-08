# rn-live

[![NPM Version][npm-image]][npm-url]

# Info
This library based [rtmp-rtsp-stream-client-java](https://github.com/pedroSG94/rtmp-rtsp-stream-client-java)
Add Stream based [LFLiveKit](https://github.com/LaiFengiOS/LFLiveKit)

**Support iOS and Android**

## Add it to your project

Run `npm install --save rn-live`

### iOS

1. Add RCTLFLiveKit.xcodeproj to Libraries

2. Your project Click

3. Go to General -> Embedded Binaries and add LFLiveKit.framework

4. Linked Frameworks and Libraries add LFLiveKit.framework

## Usage

```javascript
    <RNLive
        started={false} // start your stream
        cameraFronted={true} // camera front or back
        url="rtmp://xxx" // your rtmp publish url
        landscape={false} // landscape mode
        onReady={() => {}} // streaming ready
        onPending={() => {}} // streaming ready to start
        onStart={() => {}} // streaming start
        onError={() => {}} // straming error
        onStop={() => {}} // streaming stop
        />
```

# License
MIT

[npm-url]: https://www.npmjs.com/package/rn-live