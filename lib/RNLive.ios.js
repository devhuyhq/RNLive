import React, {Component} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import LiveStream from 'rn-live-stream';

export default class RNLive extends Component<{}> {

    constructor(props) {
        super(props);
    }

    render() {
        const {started, cameraFronted, url, landscape, onReady, onPending, onStart, onError, style} = this.props;
        return (
            <LiveStream
                started={started}
                style={style}
                cameraFronted={cameraFronted}
                url={url}
                landscape={landscape}
                onReady={onReady}
                onPending={onPending}
                onError={onError}
                onStart={onStart}
            />
        );
    }
}

RNLive.propTypes = {
    started: PropTypes.bool,
    cameraFronted: PropTypes.bool,
    url: PropTypes.string,
    landscape: PropTypes.bool,

    onReady: PropTypes.func,
    onPending: PropTypes.func,
    onStart: PropTypes.func,
    onError: PropTypes.func,
    onStop: PropTypes.func,
    ...View.propTypes,
};

RNLive.defaultProps= {
    cameraFronted: true
};

const styles = StyleSheet.create({

});

