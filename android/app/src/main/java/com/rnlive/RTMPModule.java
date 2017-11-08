package com.rnlive;

import android.widget.Toast;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.pedro.rtplibrary.rtmp.RtmpCamera1;

import net.ossrs.rtmp.ConnectCheckerRtmp;

import java.util.HashMap;
import java.util.Map;

public class RTMPModule extends ReactContextBaseJavaModule {
    private static RTMPSurfaceView surfaceView;
    private static RtmpCamera1 rtmpCamera1;
    private static boolean isSurfaceCreated;

    public RTMPModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "RTMPModule";
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        return constants;
    }

    @ReactMethod
    public void show(String message) {
        Toast.makeText(getReactApplicationContext(), message, Toast.LENGTH_SHORT).show();
    }

    @ReactMethod
    public void startStream(String rtmpUrl, Promise promise) {
        if (isSurfaceCreated) {
            if (rtmpCamera1 != null && !rtmpCamera1.isStreaming() && rtmpCamera1.prepareAudio() && rtmpCamera1.prepareVideo()) {
                rtmpCamera1.startStream(rtmpUrl);
            } else {
                Toast.makeText(getReactApplicationContext(), "Failed to preparing RTMP builder.", Toast.LENGTH_SHORT).show();
            }
        } else {
            Toast.makeText(getReactApplicationContext(), "Surface view is not ready.", Toast.LENGTH_SHORT).show();
        }

        promise.resolve(rtmpCamera1.isStreaming());
    }

    @ReactMethod
    public void stopStream(Promise promise) {
        if (rtmpCamera1 != null && rtmpCamera1.isStreaming()) {
            rtmpCamera1.stopStream();
        }

        promise.resolve(!rtmpCamera1.isStreaming());
    }

    @ReactMethod
    public void switchCamera(Promise promise) {
        if (rtmpCamera1 != null && rtmpCamera1.isStreaming()) {
            rtmpCamera1.switchCamera();
        }

        promise.resolve(rtmpCamera1.isStreaming());
    }

    public static void setSurfaceView(RTMPSurfaceView surface) {
        surfaceView = surface;
        rtmpCamera1 = new RtmpCamera1(surfaceView, new ConnectCheckerRtmp() {
            @Override
            public void onConnectionSuccessRtmp() {

            }

            @Override
            public void onConnectionFailedRtmp() {

            }

            @Override
            public void onDisconnectRtmp() {

            }

            @Override
            public void onAuthErrorRtmp() {

            }

            @Override
            public void onAuthSuccessRtmp() {

            }
        });

        isSurfaceCreated = true;
    }

    public static void destroySurfaceView() {
        if (rtmpCamera1 != null && rtmpCamera1.isStreaming()) {
            rtmpCamera1.stopStream();
            rtmpCamera1 = null;
        }

        isSurfaceCreated = false;
    }
}
