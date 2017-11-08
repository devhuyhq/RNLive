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

import RNLive from "../lib/RNLive";

export default class App extends Component<{}> {

    constructor(props) {
        super(props);
        this.state = {
            started: false,
            videoEnabled: true,
            audioEnabled: true,
            cameraFronted: true,
        }
    }

    onPublishButtonPressed = () => {
        this.setState({
            started: true,
        })
    };

    onCancelButtonPressed = () => {
        const {started} = this.state;
        this.setState({
            started: false,
        })
    };

    onSwitchButtonPressed = () => {
        const {cameraFronted} = this.state;
        this.setState({
            cameraFronted: !cameraFronted,
        })
    };

    renderPublishButton = () => {
        const {started} = this.state;
        if (!started) {
            return (
                <View>
                    <TouchableOpacity style={styles.publish} onPress={this.onPublishButtonPressed}>
                        <Image style={styles.icon} source={require('./res/img/record.png')}/>
                    </TouchableOpacity>
                </View >
            )
        }
    };

    renderCancelButton = () => {
        const {started} = this.state;
        if (started) {
            return (
                <View>
                    <TouchableOpacity style={styles.cancel} onPress={this.onCancelButtonPressed}>
                        <Image style={styles.icon} source={require('./res/img/cancel.png')}/>
                    </TouchableOpacity>
                </View >
            )
        }

    };

    renderToggleAudioButton = () => {
        const {audioEnabled, started} = this.state;
        if (!started) return;
        if (audioEnabled) {
            return (
                <View>
                    <TouchableOpacity style={styles.toggleAudio} onPress={this.onToggleAudioButtonPressed}>
                        <Image style={styles.icon} source={require('./res/img/speaker.png')}/>
                    </TouchableOpacity>
                </View >
            )
        } else {
            return (
                <View>
                    <TouchableOpacity style={styles.toggleAudio} onPress={this.onToggleAudioButtonPressed}>
                        <Image style={styles.icon} source={require('./res/img/mute.png')}/>
                    </TouchableOpacity>
                </View >
            )
        }
    };

    onToggleAudioButtonPressed = () => {
        const {audioEnabled} = this.state;
        this.setState({
            audioEnabled: !audioEnabled
        })
    };

    onToggleVideoButtonPressed = () => {
        const {videoEnabled} = this.state;
        this.setState({
            videoEnabled: !videoEnabled
        })
    };

    renderToggleVideoButton = () => {
          const {videoEnabled, started} = this.state;
        if (!started) return;
          if (videoEnabled) {
              return (
                  <View>
                      <TouchableOpacity style={styles.toggleVideo} onPress={this.onToggleVideoButtonPressed}>
                          <Image style={styles.icon} source={require('./res/img/video-camera.png')}/>
                      </TouchableOpacity>
                  </View >
              )
          } else {
              return (
                  <View>
                      <TouchableOpacity style={styles.toggleVideo} onPress={this.onToggleVideoButtonPressed}>
                          <Image style={styles.icon} source={require('./res/img/no-video.png')}/>
                      </TouchableOpacity>
                  </View >
              )
          }
    };

    renderSwitchButton = () => {
        return (
            <View>
                <TouchableOpacity style={styles.switchCamera} onPress={this.onSwitchButtonPressed}>
                    <Image style={styles.icon} source={require('./res/img/switch-camera.png')}/>
                </TouchableOpacity>
            </View >
        )
    };

    renderCamera = () => {
        const {started, videoEnabled, audioEnabled, cameraFronted} = this.state;
        return (
            <RNLive cameraFronted={cameraFronted} url='rtmp://172.16.1.181:1935/live/test' started={started} videoEnabled={videoEnabled} audioEnabled={audioEnabled}/>
        )
    };



    render() {
        return (
            <View style={styles.container}>
                {this.renderCamera()}
                <View style={styles.cover}>
                    <View style={styles.top}>
                        {this.renderToggleVideoButton()}
                        {this.renderToggleAudioButton()}
                    </View>
                    <View style={styles.bottom}>
                        {this.renderCancelButton()}
                        {this.renderPublishButton()}
                        {this.renderSwitchButton()}
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cover: {
        flex: 1,
        justifyContent: 'space-between',
    },
    publish: {
        backgroundColor: '#0000ff',
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 24,
    },
    cancel: {
        backgroundColor: '#aa0000',
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 24,
    },
    switchCamera: {
        backgroundColor: '#0000ff',
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 24,
    },
    toggleVideo: {
        backgroundColor: '#0000ff',
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 24,
    },
    toggleAudio: {
        backgroundColor: '#0000ff',
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 24,
    },
    bottom: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 12,
    },
    top: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 12,
    },
    icon: {
        tintColor: '#ffffff',
        width: 24,
        height: 24,
    }
});
