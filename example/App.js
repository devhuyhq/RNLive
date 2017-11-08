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


import RTMPStreamingView from '../RTMPStreamingView'

const RTMPModule = NativeModules.RTMPModule;

export default class App extends Component<{}> {

    constructor(props) {
        super(props);
        this.state = {
            publishing: false,
            videoEnabled: true,
            audioEnabled: true,
        }
    }

    startPublish = async (rtmpUrl) => {
        return await RTMPModule.startStream(rtmpUrl);
    };

    stopPublish = async () => {
        return await RTMPModule.stopStream();
    };

    switchCamera = async () => {
        return await RTMPModule.switchCamera();
    };

    onPublishButtonPressed = () => {
        const {publishing} = this.state;

        if (!publishing) {
            const rtmpURL = 'rtmp://172.16.1.181:1935/live/test';
            this.startPublish(rtmpURL);
            this.setState({
                publishing: true,
            })
        }

    };

    componentDidMount = () => {
    };

    onCancelButtonPressed = () => {
        const {publishing} = this.state;

        if (publishing) {
            this.stopPublish();
            this.setState({
                publishing: false,
            })
        }
    };

    onSwitchButtonPressed = () => {
        const {publishing} = this.state;

        if (publishing) {
            this.switchCamera();
        }
    };

    renderPublishButton = () => {
        const {publishing} = this.state;
        if (!publishing) {
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
        const {publishing} = this.state;
        if (publishing) {
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
        const {audioEnabled, publishing} = this.state;
        if (!publishing) return;
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
        if (audioEnabled) {
            RTMPModule.disableAudio();
        } else {
            RTMPModule.enableAudio();
        }
        this.setState({
            audioEnabled: !audioEnabled
        })
    };

    onToggleVideoButtonPressed = () => {
        const {videoEnabled} = this.state;
        if (videoEnabled) {
            RTMPModule.disableVideo();
        } else {
            RTMPModule.enableVideo();
        }
        this.setState({
            videoEnabled: !videoEnabled
        })
    };

    renderToggleVideoButton = () => {
          const {videoEnabled, publishing} = this.state;
        if (!publishing) return;
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
        return (
            <RTMPStreamingView style={StyleSheet.absoluteFill}/>
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
