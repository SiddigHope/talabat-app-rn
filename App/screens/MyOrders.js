import AsyncStorage from '@react-native-async-storage/async-storage';
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
  FlatList,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

const {width, height} = Dimensions.get('window');

export default class MyOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    try {
      RNFetchBlob.fetch(
        'GET',
        `http://192.168.43.148:1337/orders?users_permissions_user=${this.props.route.params.id}`,
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
          } else {
            this.setState({
              data,
            });
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

  _renderItem = (item, index) => {
      const status = item.item.process == '1'?'order placed':item.item.process == '2'?'preparing':item.item.process == '3'?'on it\'s way':item.item.process == '4'?'Delivered':'unknown'
    return (
      <View
        style={{
          height: 130,
          width: '90%',
          backgroundColor: '#f1f1f1',
          paddingBottom: 10,
          borderRadius: 20,
          alignSelf: 'center',
          paddingHorizontal: 20,
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
                alignSelf: 'flex-start',
                fontFamily: 'Tajawal-Bold',
                fontSize: 14,
                color: '#333',
              }}
            >
              {'رقم الطلب: ' + item.item.id}
            </Text>
            <Text style={{fontFamily: 'Ubuntu-Medium', fontSize: 30}}>
              {'$' + item.item.total}
            </Text>
          </View>
          <Pressable
          onPress={() => this.props.navigation.navigate('OrderProcess', {orderId : item.item.id})}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'flex-end',
              // backgroundColor: 'red'
            }}
          >
            <Text
              style={{
                fontFamily: 'Tajawal-Regular',
                fontSize: 18,
                width: '90%',
                borderWidth: 0.5,
                borderRadius: 20,
                borderColor: '#333',
                color: '#000',
                textAlign: 'center',
              }}
            >
              {status}
            </Text>
          </Pressable>
        </View>
        <Text
          style={{fontFamily: 'Tajawal-Regular', fontSize: 16, color: 'grey'}}
        >
          {item.item.orderType}
        </Text>
      </View>
    );
  };

  _itemSeparator = () => (
    <View
      style={{
        width: '100%',
        height: 10,
        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    ></View>
  );

  _listHeader = () => (
    <View
      style={{
        width: '100%',
        height: 20,
        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    ></View>
  );

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data.reverse()}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={this._listHeader}
          ListFooterComponent={this._listHeader}
          ItemSeparatorComponent={this._itemSeparator}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
  },
});
