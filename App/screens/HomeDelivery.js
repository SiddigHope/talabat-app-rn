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
import ListDeliveryOrder from '../components/ListDeliveryOrder';
import ListDeliveryOrderHeader from '../components/ListDeliveryOrderHeader';
import ListDeliveryOrderFooter from '../components/ListDeliveryOrderFooter';

const {width, height} = Dimensions.get('window');

export default class HomeDelivery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      available: true,
      id: '1',
      data: [],
      user: [],
      username: '',
    };
  }

  componentDidMount() {
    this.getUser();
  }

  getUser = async () => {
    const user = await AsyncStorage.getItem('talabat-delivery');
    if (user != null) {
      const userObj = JSON.parse(user);
      //   console.log(userObj)
      this.setState({
        user: userObj,
        available: userObj.available,
        username: userObj.name,
      });
      // console.log(userObj)
      this.getData();
    }
  };

  changeUserStatus = (status) => {
    const requestOptions = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        available: status,
      }),
    };
    try {
      fetch(
        `http://192.168.43.148:1337/delivery-boys/${this.state.user.id}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          // console.log(data)
          AsyncStorage.setItem('talabat-delivery', JSON.stringify([data]));
        });
    } catch (error) {
      console.log(error);
    }
  };

  getData = async () => {
    //   console.log(this.state.user[0].id)
    try {
      RNFetchBlob.fetch(
        'GET',
        `http://192.168.43.148:1337/orders?delivery_boy=${this.state.user.id}&&process=2&process=3`,
        {
          // Authorization: "Bearer access-token",
          // otherHeader: "foo",
          'Content-Type': 'application/json',
        }
      )
        .then((resp) => {
          //   console.log(resp.json());
          const data = resp.json();
          if (data.error) {
            console.log(resp.data);
          } else if (data.length == 0) {
            // ToastAndroid.show(
            //   'Please enter a valid user info',
            //   ToastAndroid.LONG
            // );
            this.setState({data});
          } else {
            this.setState({data});
          }
        })
        .catch((err) => {
          console.log('error response');
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  _headerComponent = () => (
    <View style={styles.headerView}>
      <View style={styles.headerCont}>
        <View style={styles.avatarCont}>
          <Image
            style={styles.avatar}
            source={require('../../assets/images/302-3022217_roger-berry-avatar-placeholder.png')}
          />
        </View>
        <View style={styles.textCont}>
          <Text style={styles.signText}>{this.state.username}</Text>
          <Text style={styles.profileText}>{'delivery boy'}</Text>
        </View>
        <Pressable>
          <Icon name="power" color="#bdbdbd" size={30} />
        </Pressable>
      </View>
      <View style={styles.footerView}>
        <Text style={{fontFamily: 'Tajawal-Bold', color: '#000'}}>
          {'Available ?'}
        </Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={this.state.available ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => {
            this.setState({available: !this.state.available});
            this.changeUserStatus(!this.state.available);
          }}
          value={this.state.available}
        />
      </View>
    </View>
  );

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

  _infoContainer = (item, index) => {
    const data = this.state.data[item.index];
    const ara = data.count.split(',');
    ara.pop(data.count.length);
    const countArray = ara != undefined ? ara : [];
    // console.log(data)
    return (
      <View style={styles._infoContainer}>
        <FlatList
          data={item.item.items}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={(item, index) => (
            <ListDeliveryOrder
              item={item}
              index={index}
              countArray={countArray}
            />
          )}
          ListHeaderComponent={() => (
            <ListDeliveryOrderHeader
              user={data.users_permissions_user}
              total={data.total}
              id={data.id}
            />
          )}
          ListFooterComponent={() => (
            <ListDeliveryOrderFooter
              navigation={this.props.navigation}
              address={data.address}
              id={data.id}
              item={item}
              user={data.users_permissions_user}
              status={data.process}
              getData={this.getData}
            />
          )}
          ItemSeparatorComponent={this._vItemSeparator}
        />
      </View>
    );
  };

  _getOrders = () => {
    // console.log(this.state.data);
    return (
      <FlatList
        data={this.state.data}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={this._infoContainer}
        // ListFooterComponent={this._footerComponent}
        // ItemSeparatorComponent={this._vItemSeparator}
      />
    );
  };

  _screenFooterButtons = () => (
    <View style={styles.btnContainer}>
      <Pressable
        onPress={() => this.props.navigation.navigate('DeliveryOrders')}
        style={styles.btn}
      >
        <Text style={styles.btnText}> {'My Orders'} </Text>
      </Pressable>
      <Pressable
        onPress={() => this.props.navigation.navigate('DeliveryProfile')}
        style={styles.btn}
      >
        <Text style={styles.btnText}> {'Profile'} </Text>
      </Pressable>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        {this._headerComponent()}
        {this._getOrders()}
        {this._screenFooterButtons()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    // alignItems: 'center',
  },
  headerView: {
    height: 140,
    width: '90%',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
    marginVertical: 20,
    paddingVertical: 10,
  },
  headerCont: {
    height: '70%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    // backgroundColor: '#219',
  },
  avatarCont: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#FFF',
    elevation: 5,
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  textCont: {
    flex: 1,
    alignItems: 'flex-start',
    marginLeft: 10,
  },
  signText: {
    textAlignVertical: 'center',
    color: '#333',
    fontFamily: 'Tajawal-Bold',
    fontSize: 16,
  },
  profileText: {
    textAlignVertical: 'center',
    color: 'grey',
    fontFamily: 'Tajawal-Regular',
    fontSize: 14,
  },
  footerView: {
    height: '30%',
    //   backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  header: {
    width: '100%',
    height: 70,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  orderId: {
    fontFamily: 'Tajawal-Bold',
    fontSize: 16,
  },
  item: {
    marginVertical: 20,
    width: width,
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    backgroundColor: '#e3e3e3',
    width: (width - 50) / 4,
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#333',
    height: (width - 50) / 4,
    borderRadius: (width - 50) / 4 / 2,
  },
  image: {
    backgroundColor: '#e3e3e3',
    width: (width - 60) / 4,
    height: (width - 60) / 4,
    borderRadius: (width - 60) / 4 / 2,
  },
  overlayBack: {
    position: 'absolute',
    width: '95%',
    height: '95%',
    alignSelf: 'center',
    borderRadius: (width - 60) / 4 / 2,
    backgroundColor: 'rgba(255,255,255,0.1)',
    zIndex: 11111111,
  },
  _infoContainer: {
    marginTop: 20,
    width: '90%',
    borderRadius: 20,
    padding: 20,
    alignSelf: 'center',
    backgroundColor: '#e3e3e3',
  },
  ItemInfo: {
    //   backgroundColor: 'grey',
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  btnContainer: {
    //   backgroundColor: 'grey',
    width: '100%',
    // height: 50,
    paddingHorizontal: 20,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },
  btn: {
    height: 40,
    width: '30%',
    backgroundColor: '#ef9a9a',
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
