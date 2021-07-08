import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import SearchMap from '../components/MapSearch';
navigator.geolocation = require('@react-native-community/geolocation');

const {width, height} = Dimensions.get('screen');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class GetAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialPosition: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
      },
      title: 'Home location',
      placeholder: 'Search by user',
      searchText: '',
      markerImage: require('../../assets/images/map-pin@4X.png'),
    };
  }

  componentDidMount() {
    // const address = JSON.parse(this.props.route.params.address);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var lat = parseFloat(position.coords.latitude);
        var long = parseFloat(position.coords.longitude);

        var initialRegion = {
          latitude: lat,
          longitude: long,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        };

        // console.log('inside component did mount');
        // console.log(position);

        this.setState({
          initialPosition: this.props.route.params.page == 'return'
            ? JSON.parse(this.props.route.params.address)
            : initialRegion,
        });
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: false, timeout: 20000}
    );
  }

  setLocation = async () => {
    AsyncStorage.setItem(
      'talabat-user-location',
      JSON.stringify(this.state.initialPosition)
    );
    this.props.navigation.goBack();
  };
  render() {
    return (
      <View style={styles.container}>
        {/* <StatusBar translucent={false} backgroundColor="#FFF" /> */}
        <MapView
          style={styles.map}
          mapType="standard"
          onRegionChange={(region) => this.setState({initialPosition: region})}
          initialRegion={this.state.initialPosition}
        >
          <Marker
            draggable
            onDragEnd={(e) => {
              console.log('dragEnd', e.nativeEvent.coordinate);
            }}
            coordinate={this.state.initialPosition}
            title={this.state.title}
            onDragStart={(coords) => this.setState({initialPosition: coords})}
            description={this.state.placeholder}
            // image={this.state.markerImage}
          />
        </MapView>
        {this.props.route.params.page=='return' ? null : (
          <Pressable
            onPress={() => this.setLocation()}
            style={[styles.btn, {backgroundColor: '#333'}]}
          >
            <Text style={styles.btnText}>{'Save'}</Text>
          </Pressable>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width,
    height,
    // position: 'relative',
  },
  btn: {
    width: width - 40,
    height: 50,
    position: 'absolute',
    backgroundColor: '#FFF',
    bottom: 10,
    elevation: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  btnText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
});
