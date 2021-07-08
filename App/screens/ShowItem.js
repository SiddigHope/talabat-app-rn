import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('window');

export default class ShowItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.route.params.item,
      itemCount: 1,
      price: this.props.route.params.item.price,
      fav: [],
      color: '#333',
      icon: 'heart-outline',
    };
  }

  componentDidMount() {
    // console.log(this.props.route.params.item);
    this.setState({
      item: this.props.route.params.item,
    });
    this.getFav();
  }

  getFav = async () => {
    const sFav = await AsyncStorage.getItem('talabat-fav');
    if (sFav != null) {
      const fav = JSON.parse(sFav);
      console.log('fav')
      console.log(fav)
      console.log('this.state.item')
      console.log(this.state.item)
      const index = fav.indexOf(this.state.item.created_at);
      console.log(index)
      if (index > -1) {
        this.setState({
          color: '#e57373',
          icon: 'heart',
        });
      }
      this.setState({fav});
    }
  };

  increaseCount = () => {
    this.setState({
      itemCount: this.state.itemCount + 1,
      price: this.props.route.params.item.price * (this.state.itemCount + 1),
    });
  };

  decreaseCount = () => {
    if (this.state.itemCount <= 1) {
      return;
    }
    this.setState({
      itemCount: this.state.itemCount - 1,
      price: this.props.route.params.item.price * (this.state.itemCount - 1),
    });
  };

  addToCart = async () => {
    // AsyncStorage.removeItem('cart')
    const user = await AsyncStorage.getItem('talabat-user');
    if (user != null) {
      console.log('user logged in');
    } else {
      this.props.navigation.navigate('Login');
      return;
    }
    this.state.item.count = this.state.itemCount;
    this.state.item.price = this.state.price;
    const cart = await AsyncStorage.getItem('cart');
    if (cart != null) {
      const jsonCart = JSON.parse(cart);
      jsonCart.push(this.state.item);
      console.log(jsonCart);
      AsyncStorage.setItem('cart', JSON.stringify(jsonCart));
    } else {
      AsyncStorage.setItem('cart', JSON.stringify([this.state.item]));
    }
    Alert.alert(
      'Talabat App',
      'Do you want to shop more ?',
      [
        {
          text: 'No',
          onPress: () => this.props.navigation.navigate('ItemsList'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => this.props.navigation.navigate('Home')},
      ],
      {cancelable: false}
    );
  };

  makeRedHeart = async () => {
    // AsyncStorage.removeItem('talabat-fav')
    const {fav} = this.state;
    fav.push(this.state.item.created_at);
    this.setState({
      fav,
      color: '#e57373',
      icon: 'heart',
    });
    AsyncStorage.setItem('talabat-fav', JSON.stringify(fav));
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerImage}>
            <Image
              source={{
                uri: 'http://192.168.43.148:1337' + this.state.item.image.url,
              }}
              style={styles.image}
            />
          </View>
          <View style={styles.bodyContent}>
            <ScrollView
              contentContainerStyle={{flex: 1}}
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.title}> {this.state.item.name} </Text>
              <View style={styles.subHeader}>
                <View style={styles.countCont}>
                  <Pressable onPress={() => this.decreaseCount()}>
                    <Icon name="minus" size={20} />
                  </Pressable>
                  <Text style={styles.itemCount}> {this.state.itemCount} </Text>
                  <Pressable onPress={() => this.increaseCount()}>
                    <Icon name="plus" size={20} />
                  </Pressable>
                </View>
                <Text style={styles.price}>{'$' + this.state.price}</Text>
              </View>
              <Text style={{fontFamily: 'Tajawal-Regular', fontSize: 16}}>
                {this.state.item.description}
              </Text>
            </ScrollView>
          </View>
        </View>
        <View style={styles.footer}>
          <Pressable onPress={() => this.makeRedHeart()}>
            <Icon name={this.state.icon} size={25} color={this.state.color} />
          </Pressable>
          <Pressable onPress={() => this.addToCart()} style={styles.btn}>
            <Text style={styles.btnText}> {'اضافة للسلة'} </Text>
          </Pressable>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flex: 1,
    width: '90%',
    alignItems: 'center',
  },
  headerImage: {
    height: '40%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginBottom: 20,
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 30,
  },
  bodyContent: {
    flex: 1,
    width: '90%',
  },
  title: {
    fontFamily: 'Tajawal-Bold',
    fontSize: 20,
    color: '#333',
  },
  subHeader: {
    height: '20%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  countCont: {
    flexDirection: 'row',
    height: 35,
    borderRadius: 20,
    paddingHorizontal: 5,
    width: '40%',
    borderWidth: 0.5,
    borderColor: '#333',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  price: {
    fontFamily: 'Tajawal-Regular',
    fontSize: 30,
  },
  itemCount: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'Tajawal-Bold',
    fontSize: 18,
  },
  footer: {
    height: '10%',
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  btn: {
    width: '80%',
    height: 60,
    flexDirection: 'row',
    backgroundColor: '#4444',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  btnText: {
    fontFamily: 'Tajawal-Bold',
    fontSize: 16,
    color: '#333',
  },
});
