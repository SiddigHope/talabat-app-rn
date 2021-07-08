import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  ActivityIndicator,
  ScrollView,
  FlatList,
  StatusBar,
  ToastAndroid,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import Icon4 from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/AntDesign';
import {List, ListItem, Right, Body, Switch} from 'native-base';
import _ from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'rn-fetch-blob';

const {width, height} = Dimensions.get('window');

export default class ListDeliveryOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _renderVItem = () => {
    //   console.log(this.props.item)
    return (
      <View style={styles.ItemInfo}>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              fontFamily: 'Tajawal-Regular',
              // marginBottom: 10,
              fontSize: 16,
            }}
          >
            {this.props.countArray[this.props.item.index] + "x "}
          </Text>
          <Text
            style={{
              fontFamily: 'Tajawal-Regular',
              // marginBottom: 10,
              fontSize: 16,
            }}
          >
            {this.props.item.item.name}
          </Text>
        </View>
        <Text
          style={{
            fontFamily: 'Tajawal-Bold',
            // marginBottom: 10,
            fontSize: 16,
          }}
        >
          {'$' +
            String(
              this.props.countArray[this.props.item.index] *
                this.props.item.item.price
            )}
        </Text>
      </View>
    );
  };

  render() {
    return this._renderVItem();
  }
}
const styles = StyleSheet.create({
  ItemInfo: {
    //   backgroundColor: 'grey',
    width: '100%',
    // height: 50,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
});
