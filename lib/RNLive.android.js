import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    NativeModules,
    Dimensions,
    Image,
    TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';

import RTMPStreamingView from './RTMPStreamingView'

const RTMPModule = NativeModules.RTMPModule;

export default class RNLive extends Component<{}> {

    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        const {started, videoEnabled, audioEnabled, url, cameraFronted} = this.props;
        if (started && url) {
            this.startPublish(url)
        }
        if (videoEnabled) {
            RTMPModule.enableVideo();
        } else {
            RTMPModule.disableVideo();
        }

        if (audioEnabled) {
            RTMPModule.enableAudio();
        } else {
            RTMPModule.disableAudio();
        }
        if (!cameraFronted) {
            RTMPModule.switchCamera();
        }
    };

    componentDidUpdate = (prevProps, prevState) => {
        const {started, videoEnabled, audioEnabled, url, cameraFronted} = this.props;
        if (started !== prevProps.started || url !== prevProps.url) {
            if (started) {
                this.startPublish(url);
            } else {
                this.stopPublish();
            }
        }

        if (cameraFronted !== prevProps.cameraFronted) {
            RTMPModule.switchCamera();
        }

        if (videoEnabled) {
            RTMPModule.enableVideo();
        } else {
            RTMPModule.disableVideo();
        }

        if (audioEnabled) {
            RTMPModule.enableAudio();
        } else {
            RTMPModule.disableAudio();
        }
    };

    startPublish = async (rtmpUrl) => {
        return await RTMPModule.startStream(rtmpUrl);
    };

    stopPublish = async () => {
        return await RTMPModule.stopStream();
    };

    switchCamera = async () => {
        return await RTMPModule.switchCamera();
    };

    render() {
        const {style} = this.props;
        return (
            <RTMPStreamingView style={style}/>
        );
    }
}

RNLive.propTypes = {
    started: PropTypes.bool,
    cameraFronted: PropTypes.bool,
    videoEnabled: PropTypes.bool,
    audioEnabled: PropTypes.bool,
    url: PropTypes.string,
    ...View.propTypes,
};

RNLive.defaultProps= {
    cameraFronted: true
};


const styles = StyleSheet.create({

});
