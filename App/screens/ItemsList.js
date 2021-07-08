import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  Pressable,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ItemsListComponent from '../components/ItemsListComponent';

const {width, height} = Dimensions.get('window');

export default class ItemsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      total: 0,
    };
  }

  componentDidMount() {
    this.checkUser();
    this.getData();
    const navigation = this.props.navigation;
    navigation.addListener('focus', async () => {
      this.checkUser();
    });
  }

  componentWillUnmount() {
    const navigation = this.props.navigation;
    navigation.removeListener('focus');
  }

  getData = async () => {
    const cart = await AsyncStorage.getItem('cart');
    if (cart != null) {
      const cartJson = JSON.parse(cart);
      this.setState({
        data: cartJson,
      });
      this.getTotal(cartJson);
    }
  };
  checkUser = async () => {
    const user = await AsyncStorage.getItem('talabat-user');
    if (user != null) {
      console.log('user exists');
    } else {
      this.props.navigation.navigate('Login');
      return;
    }
  };

  getTotal = (items) => {
    items.forEach((element) => {
      this.setState({
        total: this.state.total + element.price,
      });
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#e57373" />
        <View style={styles.header}>
          <ItemsListComponent
            navigation={this.props.navigation}
            data={this.state.data}
          />
        </View>
        <View style={styles.footer}>
          <View style={styles.priceCont}>
            <Text style={styles.price}> Total: </Text>
            <Text style={styles.price}> {'$' + this.state.total} </Text>
          </View>
          <View style={styles.buttonCont}>
            <Pressable
              onPress={() => this.props.navigation.navigate('Payment', {total: this.state.total})}
              style={styles.btn}
            >
              <Text style={styles.btnText}> {'الدفع'} </Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flex: 1,
    marginTop: 10,
    width: '90%',
  },
  priceCont: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontFamily: 'Tajawal-Bold',
    fontSize: 25,
    color: '#e3e3e3',
  },
  buttonCont: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    backgroundColor: '#e57373',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginBottom: 10,
  },
  btnText: {
    fontFamily: 'Tajawal-Bold',
    fontSize: 16,
    color: '#e3e3e3',
  },
  footer: {
    height: '20%',
    width: '90%',
  },
});
