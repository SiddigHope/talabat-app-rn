import AsyncStorage from '@react-native-async-storage/async-storage';
import { Item } from 'native-base';
import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Pressable,
  Platform,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {sendNotification} from '../config/var';

const {width, height} = Dimensions.get('window');

export default class ListDeliveryOrderFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 2,
      goingMessage: 'الطلب في الطريق',
      doneMessage: 'تم تسليم الطلب بنجاح',
      title: 'Hommies Resturant',
    };
  }

  componentDidMount() {
    this.setState({
      status: this.props.status,
    });
    //   console.log(this.props.status)
  }

  changeOrderStatus = async() => {
    const sAdmins = await AsyncStorage.getItem('talabat-branch-admins');
    const admins = JSON.parse(sAdmins);

    if (this.state.status == 4) {
      console.log('status is 4');
      return;
    }
    const status = Number(this.state.status) + 1;
    const requestOptions = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        process: status,
      }),
    };
    try {
      fetch(
        `http://192.168.43.148:1337/orders/${this.props.id}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          // console.log(data)
          sendNotification(this.state.title, status == 3 ? this.state.goingMessage:this.state.doneMessage,admins[Number(this.props.item.item.branch.id)-1].token);
          this.props.getData();
        });
    } catch (error) {
      console.log(error);
    }
  };

  openGps = (lat, lng) => {
    const address = JSON.parse(this.props.address);
    // console.log(address.latitude)
    var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
    var url = scheme + `${address.latitude},${address.longitude}`;
    Linking.openURL(url);
  };

  _renderVItem = () => {
    //   console.log(this.props.item)
    return (
      <View style={styles.ItemInfo}>
        <Pressable
          onPress={() => {
            // this.props.navigation.navigate('GetAddress', {
            //   page: 'return',
            //   address: this.props.address,
            // });
            this.openGps();
          }}
          style={[styles.btn, {backgroundColor: '#81b0ff'}]}
        >
          <Icon name="map-marker-outline" color="#FFF" size={20} />
          <Text style={styles.btnText}>{'Loc'}</Text>
        </Pressable>
        <Pressable
          onPress={() => Linking.openURL(`tel:${this.props.user.phone}`)}
          style={[styles.btn, {backgroundColor: '#a5d6a7'}]}
        >
          <Icon name="phone-outline" color="#FFF" size={20} />
          <Text style={styles.btnText}>{'Call'}</Text>
        </Pressable>
        <Pressable
          onPress={() => this.changeOrderStatus()}
          style={[
            styles.btn,
            this.state.status == '2'
              ? {backgroundColor: '#f5dd4b'}
              : {backgroundColor: '#ef9a9a'},
          ]}
        >
          <Icon
            name={
              this.state.status == '2'
                ? 'map-marker-right-outline'
                : 'check-circle-outline'
            }
            color="#FFF"
            size={20}
          />
          <Text style={styles.btnText}>
            {this.state.status == '2' ? 'Going' : 'Done'}
          </Text>
        </Pressable>
      </View>
    );
  };
  _vItemSeparator = () => (
    <View
      style={{
        width: '100%',
        height: 10,
        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View style={{width: '100%', height: 1, backgroundColor: '#4444'}} />
    </View>
  );

  render() {
    return (
      <>
        {this._vItemSeparator()}
        {this._renderVItem()}
      </>
    );
  }
}
const styles = StyleSheet.create({
  ItemInfo: {
    //   backgroundColor: 'grey',
    width: '100%',
    // height: 50,
    paddingHorizontal: 20,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btn: {
    height: 40,
    width: '30%',
    backgroundColor: '#FFF',
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  btnText: {
    marginLeft: 5,
    color: '#FFF',
    fontSize: 14,
    fontFamily: 'Tajawal-Regular',
  },
});
