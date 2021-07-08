import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {SwipeItem, SwipeButtonsContainer} from 'react-native-swipe-item';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('window');

export default class ItemsListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemToRemove: 0,
      data: [],
      deliveryImage: {
        uri: 'https://www.kindpng.com/picc/m/587-5871102_food-delivery-icon-hd-png-download.png',
      },
    };

    this.rightButton = (
      <SwipeButtonsContainer
        style={{
          height: '100%',
          width: '20%',
          backgroundColor: '#ef5350',
          aspectRatio: 1,
          flexDirection: 'column',
          padding: 10,
        }}
      >
        <TouchableOpacity
          style={{
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => this.removeItem()}
        >
          <Icon name="trash-can-outline" size={30} color="#FFF" />
        </TouchableOpacity>
      </SwipeButtonsContainer>
    );
  }

componentDidMount(){
  console.log(this.props.data)
  this.setState({
    data: this.props.data
  })
}
  removeItem = async () => {
    this.setState({
      data : this.props.data
    })
    const {data} = this.state
    data.splice(this.state.itemToRemove, 1);
    this.swipe.close();
    this.setState({
      data: data,
    });

    AsyncStorage.setItem('cart', JSON.stringify(data))
  };

  _renderItem = (item, index) => {
    return (
      <SwipeItem
        ref={(swipe) => (this.swipe = swipe)}
        style={styles.button}
        onSwipeInitial={() => this.setState({itemToRemove: item.index})}
        swipeContainerStyle={styles.swipeContentContainerStyle}
        leftButtons={this.rightButton}
        rightButtons={this.rightButton}
      >
        <View style={styles.item}>
          <View style={styles.imageCont}>
            <Image
              source={{uri: 'http://192.168.43.148:1337' + item.item.image.url}}
              style={styles.image}
            />
          </View>
          <Text style={styles.title}>
            {' '}
            {item.item.count + 'x ' + item.item.name}{' '}
          </Text>
          <Text style={styles.price}> {'$' + item.item.price} </Text>
        </View>
      </SwipeItem>
    );
  };

  _listSeparator = () => <View style={{height: 10}} />;
  _footerComponent = () => (
    <>
      <View
        style={{
          height: 0.5,
          width: '80%',
          backgroundColor: '#e3e3e3',
          marginVertical: 10,
          alignSelf: 'center',
        }}
      />
      <View style={[styles.item, {marginVertical: 10}]}>
        <View style={styles.imageCont}>
          <Image source={this.state.deliveryImage} style={styles.image} />
        </View>
        <View style={styles.footerCont}>
          <Text style={styles.footerTitle}> {'التوصيل'} </Text>
          <Text style={styles.footerDesc}>
            {' '}
            {'التوصيل للمنزل له سعر $10.00'}{' '}
          </Text>
        </View>
        {/* <Text style={styles.price}> {'$60.00'} </Text> */}
      </View>
    </>
  );

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data.length != 0?this.state.data:this.props.data}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={this._renderItem}
          ItemSeparatorComponent={this._listSeparator}
          ListFooterComponent={this._footerComponent}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
  },
  item: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageCont: {
    height: '100%',
    width: 50,
    backgroundColor: '#FFF',
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: '95%',
    width: 45,
    borderRadius: 35,
  },
  title: {
    flex: 1,
    fontFamily: 'Tajawal-Bold',
    fontSize: 16,
    marginHorizontal: 10,
    color: '#e3e3e3',
  },
  price: {
    fontFamily: 'Tajawal-Bold',
    fontSize: 16,
    color: '#FFF',
  },
  footerCont: {
    flex: 1,
    marginHorizontal: 10,
    // backgroundColor: 'red'
  },
  footerTitle: {
    flex: 1,
    textAlign: 'left',
    fontFamily: 'Tajawal-Bold',
    fontSize: 16,
    color: '#e3e3e3',
  },
  footerDesc: {
    flex: 1,
    textAlign: 'left',
    fontFamily: 'Tajawal-Regular',
    fontSize: 12,
    color: '#bdbdbd',
  },
  button: {
    width: '100%',
    height: 50,
    // backgroundColor: 'red',
  },
  swipeContentContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  },
});
