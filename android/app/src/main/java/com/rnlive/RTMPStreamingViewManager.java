package com.rnlive;

import android.util.Log;
import android.view.SurfaceHolder;
import android.view.SurfaceView;
import android.view.View;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;

public class RTMPStreamingViewManager extends SimpleViewManager<View> implements SurfaceHolder.Callback {
    private RTMPSurfaceView surfaceView;
    private SurfaceHolder surfaceHolder;

    @Override
    public String getName() {
        return "RTMPStreamingView";
    }

    @Override
    protected View createViewInstance(ThemedReactContext reactContext) {
        surfaceView = new RTMPSurfaceView(reactContext);
        surfaceHolder = surfaceView.getHolder();
        surfaceHolder.addCallback(this);
        return surfaceView;
    }

    @Override
    public void surfaceCreated(SurfaceHolder holder) {
        RTMPModule.setSurfaceView(surfaceView);
    }

    @Override
    public void surfaceChanged(SurfaceHolder holder, int format, int width, int height) {

    }

    @Override
    public void surfaceDestroyed(SurfaceHolder holder) {
        RTMPModule.destroySurfaceView();
    }
}
