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
import RadioButtonRN from 'radio-buttons-react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import {defBranch} from '../config/var';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'rn-fetch-blob';
import moment from 'moment';
import jwt_decode from 'jwt-decode';

const {width, height} = Dimensions.get('window');

const data = [
  {image: require('../../assets/images/1.png'), title: 'تم الطلب'},
  {image: require('../../assets/images/2.png'), title: 'جار التحضير'},
  {image: require('../../assets/images/3.png'), title: 'ارسال'},
  {image: require('../../assets/images/4.png'), title: 'تم التوصيل'},
];

export default class OrderProcess extends Component {
  constructor(props) {
    super(props);
    this.state = {
        orderId: this.props.route.params.orderId,
    //   orderId: '10',
      order: [],
      data: data,
      countArray: [],
      user: [],
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    try {
      RNFetchBlob.fetch(
        'GET',
        `http://192.168.43.148:1337/orders/${this.state.orderId}`,
        {
          // Authorization: "Bearer access-token",
          // otherHeader: "foo",
          'Content-Type': 'application/json',
        }
      )
        .then((resp) => {
          //   console.log(resp.data);
          let data = [];
            if (resp.data.includes('{')) {
              data = JSON.parse(resp.data);
            } else {
              data = jwt_decode(resp.data, {header: true});
            }
          if (data.error) {
            console.log(resp.data);
          } else {
            const ara = data.count.split(',');
            ara.pop(data.count.length);
            this.setState({
              order: data,
              countArray: ara != undefined ? ara : [],
              user:data.users_permissions_user
            });
          }
          //   const ara = data.count.split(',')
          //   ara.pop(data.count.length)
            // console.log(data.users_permissions_user)
        })
        .catch((err) => {
          console.log('error response');
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  _renderHeader = () => (
    <View style={styles.header}>
      <Icon
        onPress={() => this.props.navigation.navigate('Home')}
        name="chevron-back"
        style={{marginLeft: 10}}
        color="#333"
        size={30}
      />
      <Text style={styles.orderId}> {'طلب رقم  ' + this.state.orderId} </Text>
    </View>
  );

  _renderItem = (item, index) => {
    let background = 'rgba(255,255,255,0.1)';
    if (this.state.order.process > item.index) {
      background = 'rgba(41, 241, 195, 0.2)';
    } else if (this.state.order.process == item.index) {
      background = 'rgba(229,115,115, 0.4)';
    }

    return (
      <View style={{width: (width - 50) / 4}}>
        <Text
          style={{
            fontFamily: 'Tajawal-Regular',
            marginBottom: 10,
            fontSize: 14,
            alignSelf: 'center',
          }}
        >
          {item.item.title}
        </Text>
        <View style={styles.imageContainer}>
          <View style={[styles.overlayBack, {backgroundColor: background}]} />

          <Image source={item.item.image} style={styles.image} />
        </View>
      </View>
    );
  };

  _renderVItem = (item, index) => {
    return (
      <View style={styles.ItemInfo}>
        <Text
          style={{
            fontFamily: 'Tajawal-Regular',
            marginBottom: 10,
            fontSize: 16,
          }}
        >
          {item.item.name}
        </Text>
        <Text
          style={{
            fontFamily: 'Tajawal-Bold',
            marginBottom: 10,
            fontSize: 20,
          }}
        >
          {'$' + String(this.state.countArray[item.index] * item.item.price)}
        </Text>
      </View>
    );
  };

  _itemSeparator = () => (
    <View
      style={{
        // height: (width - 50) / 4,
        width: 10,
        marginTop: 30,
        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View style={{width: 10, height: 3, backgroundColor: '#333'}} />
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
      <View style={{width: '100%', height: 1, backgroundColor: '#333'}} />
    </View>
  );

  _headerComponent = () => (
    <View
      style={{
        height: 100,
        borderBottomColor: '#333',
        borderBottomWidth: 1,
        paddingBottom: 10,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: '70%',
          marginBottom: 5,
        }}
      >
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text
            style={{
              marginBottom: 5,
              fontFamily: 'Tajawal-Regular',
              fontSize: 16,
            }}
          >
            {' '}
            {moment(this.state.order.created_at).fromNow()}{' '}
          </Text>
          <Text style={{fontFamily: 'Tajawal-Regular', fontSize: 16}}>
            {'0'}
            {this.state.user.phone}{' '}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-end',
            paddingRight: 20,
          }}
        >
          <Text style={{fontFamily: 'Tajawal-Bold', fontSize: 20}}>
            {' '}
            {'$' + this.state.order.total}{' '}
          </Text>
        </View>
      </View>
      <Text
        style={{fontFamily: 'Tajawal-Regular', fontSize: 16, color: 'grey'}}
      >
        {this.state.order.orderType}
      </Text>
    </View>
  );

  _footerComponent = () => (
    <View
      style={{
        height: 70,
        borderTopColor: '#333',
        borderTopWidth: 1,
        paddingTop: 10,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: '70%',
          marginBottom: 5,
        }}
      >
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text
            style={{
              fontFamily: 'Tajawal-Bold',
              fontSize: 16,
              alignSelf: 'flex-start',
            }}
          >
            {' '}
            {'رسوم التوصيل'}{' '}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-end',
            paddingRight: 20,
          }}
        >
          <Text style={{fontFamily: 'Tajawal-Bold', fontSize: 20}}>
            {' '}
            {this.state.order.orderType == 'takeaway' ? '$0.00' : '$10:00'}{' '}
          </Text>
        </View>
      </View>
    </View>
  );

  _infoContainer = () => (
    <View style={styles._infoContainer}>
      <FlatList
        data={this.state.order.items}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={this._renderVItem}
        ListFooterComponent={this._footerComponent}
        ListHeaderComponent={this._headerComponent}
        ItemSeparatorComponent={this._vItemSeparator}
      />
    </View>
  );
  _renderTopFlow = () => (
    <View style={styles.item}>
      <FlatList
        data={this.state.data}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={this._renderItem}
        ItemSeparatorComponent={this._itemSeparator}
      />
    </View>
  );
  render() {
    return (
      <View style={styles.container}>
        {this._renderHeader()}
        {this._renderTopFlow()}
        {this._infoContainer()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
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
    width: '85%',
    borderRadius: 30,
    padding: 20,
    //   alignItems: 'center',
    backgroundColor: '#e3e3e3',
  },
  ItemInfo: {
    //   backgroundColor: 'grey',
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});
