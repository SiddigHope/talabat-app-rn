import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  Pressable,
} from 'react-native';

const {width, height} = Dimensions.get('window');

export default class MenuItemsList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _renderItem = (item, index) => {
    return (
      <Pressable
        onPress={() => {
          this.props.navigation.navigate('ShowItem', {item: item.item});
        }}
        style={styles.item}>
        <Image style={styles.image} source={{uri:"http://192.168.43.148:1337"+item.item.image.url}} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 5,
          }}>
          <Text numberOfLines={1} style={styles.price}>
            {' '}
            {'$' + item.item.price}{' '}
          </Text>
          <Text numberOfLines={1} style={styles.title}>
            {' '}
            {item.item.name}{' '}
          </Text>
        </View>
        <Text numberOfLines={2} style={styles.dec}>
          {item.item.description}
        </Text>
      </Pressable>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.data}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  item: {
    width: (width * 40) / 100,
    height: 200,
    borderRadius: 40,
    marginBottom: 15,
    marginHorizontal: 10,
    backgroundColor: '#e3e3e3',
  },
  image: {
    height: '60%',
    width: '100%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginBottom: 10,
  },
  title: {
    flex: 1,
    fontFamily: 'Tajawal-Bold',
  },
  price: {
    flex: 1,
    fontFamily: 'Ubuntu-Bold',
    fontSize: 18,
  },
  dec: {
    fontSize: 14,
    fontFamily: 'Tajawal-Regular',
    textAlign: 'center',
    // backgroundColor: '#4444',
    marginHorizontal: 10,
  },
});
