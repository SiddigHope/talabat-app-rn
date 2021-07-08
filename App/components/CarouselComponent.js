import { Item } from 'native-base';
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window')

export default class CarouselComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const image = Number(this.props.index) % 2 == 0 ? require('../assets/banner2.jpg') : require('../assets/banner.jpg')
        return (
            <View style={styles.container}>
                <Image source={{uri: "http://192.168.43.148:1337" + this.props.item.image.url}} style={styles.banner} />
                {/* <View style={styles.avatarContainer}>
                    <Image source={require("../assets/the-red-cafe.png")} style={styles.avatar} />
                </View> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 150,
        width: width - 20,
        backgroundColor: "#e3e3e3",
        borderRadius: 10,
        elevation: 3
    },
    banner: {
        width: '100%',
        height: '100%',
        borderRadius: 10
    },
    avatarContainer: {
        height: 70,
        width: 70,
        borderRadius: 35,
        position: 'absolute',
        bottom: 20,
        left: 40,
        backgroundColor: "#FFF",
        elevation: 10,
    },
    avatar: {
        height: 70,
        width: 70,
        borderRadius: 35,
    },
})