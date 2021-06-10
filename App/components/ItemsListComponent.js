import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {width, height} = Dimensions.get('window');

export default class ItemsListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deliveryImage: {
        uri: 'https://www.kindpng.com/picc/m/587-5871102_food-delivery-icon-hd-png-download.png',
      },
    };
  }

  _renderItem = (item, index) => {
    return (
      <Pressable
        onPress={() => {
          this.props.navigation.navigate('ShowItem', {item: item.item});
        }}
        style={styles.item}
      >
        <View style={styles.imageCont}>
          <Image
            source={require('../assets/icecreem.jpg')}
            style={styles.image}
          />
        </View>
        <Text style={styles.title}> {'3 ' + 'x ' + 'شاورما'} </Text>
        <Text style={styles.price}> {'$60.00'} </Text>
      </Pressable>
    );
  };

  _listSeparator = () => <View style={{height: 10}} />;
  _footerComponent = () => (
    <>
      <View style={{height: 0.5, width: '80%', backgroundColor: '#e3e3e3', marginVertical: 10, alignSelf: 'center'}} />
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
          data={[1, 2, 3]}
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
    color: '#333',
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
});
