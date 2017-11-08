import React, {Component} from 'react'
import {requireNativeComponent, View, StyleSheet} from 'react-native'

const iface = {
    name: 'RTMPStreamingView',
    propTypes: {
        ...View.propTypes
    },
};

const RTMPStreamingView = requireNativeComponent('RTMPStreamingView', iface);

const styles = StyleSheet.create({
    text: {
        color: 'green'
    }
});

export default RTMPStreamingView


