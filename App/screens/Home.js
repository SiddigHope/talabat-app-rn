import React, {Component} from 'react';
import {
  StatusBar,
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Image,
  BackHandler,
  Alert,
  ScrollView,
  Pressable,
} from 'react-native';
import {
  Container,
  Header,
  Left,
  Right,
  Drawer,
  DefaultTabBar,
} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';
import SideBar from '../config/SideBar';
import MenuItemsList from '../components/MenuItemsList';
import CarouselBanner from '../components/CarouselBanner';
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';

const {width, height} = Dimensions.get('window');

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      cartCount: 0,
      fav: [],
      user: [],
      ordersCount: 0,
    };
  }

  componentDidMount() {
    this.getUser();
    this.getData();
    this.getCartCount();
    const navigation = this.props.navigation;
    navigation.addListener('focus', async () => {
      this.getUser();
      // this.getData();
      this.getFav(this.state.data)
      this.getCartCount();
      this._closeDrawer();
    });
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    if (this.props.navigation.isFocused()) {
      Alert.alert(
        'Exit App',
        'Do you want to exit?',
        [
          {
            text: 'No',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'Yes', onPress: () => BackHandler.exitApp()},
        ],
        {cancelable: false}
      );
      return true;
    }

    // return true;  // Do nothing when back button is pressed
  };

  componentWillUnmount() {
    const navigation = this.props.navigation;
    navigation.removeListener('focus');
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  getUser = async () => {
    const user = await AsyncStorage.getItem('talabat-user');
    if (user != null) {
      const userJson = JSON.parse(user);
      this.setState({
        user: userJson,
      });
      // console.log(user)
    }
    this.countMyOrders();
  };

  getData = async () => {
    try {
      RNFetchBlob.fetch('GET', 'http://192.168.43.148:1337/items', {
        // Authorization: "Bearer access-token",
        // otherHeader: "foo",
        'Content-Type': 'application/json',
      })
        .then((resp) => {
          // console.log(resp.data);
          let data = [];
          if (resp.data.includes('{')) {
            data = JSON.parse(resp.data);
          } else {
            data = jwt_decode(resp.data, {header: true});
          }
          if (data.error) {
            console.log(resp.data);
          } else {
            this.setState({
              data,
            });
            this.getFav(data);
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

  getFav = async (data) => {
    const {fav, user} = this.state;
    const sFav = await AsyncStorage.getItem('talabat-fav');
    if (sFav != null) {
      const favJson = JSON.parse(sFav);
      data.forEach((element) => {
        const index = favJson.indexOf(element.created_at);
        if (index > -1) {
          fav.push(element)
        }
      });
      if(user.length == 0){
        this.setState({fav:[]})
        return
      }
      this.setState({fav});
    }
  };

  countMyOrders = async () => {
    try {
      RNFetchBlob.fetch(
        'GET',
        `http://192.168.43.148:1337/orders/count?users_permissions_user=${this.state.user.id}/count`,
        {
          // Authorization: "Bearer access-token",
          // otherHeader: "foo",
          'Content-Type': 'application/json',
        }
      )
        .then((resp) => {
          // console.log(resp.data);
          this.setState({
            ordersCount: resp.data,
          });
        })
        .catch((err) => {
          console.log('error response');
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  getCartCount = async () => {
    const cart = await AsyncStorage.getItem('cart');
    if (cart != null) {
      const cartJson = JSON.parse(cart);
      // console.log(cartJson )
      this.setState({
        cartCount: cartJson.length,
      });
    }
  };

  renderTabBar = (props) => {
    props.tabStyle = Object.create(props.tabStyle);
    return <DefaultTabBar {...props} />;
  };

  _closeDrawer() {
    this.drawer._root.close();
  }

  openDrawer() {
    this.drawer._root.open();
  }

  _listHeader = () => {
    return <View style={{width: 20}} />;
  };
  _listFooter = () => {
    return <View style={{width: 20}} />;
  };

  container(fav) {
    return (
      <>
        {/* Hedding title ( app name and describtion) */}
        <View style={styles.textTitle}>
          <Text style={styles.title}> {'Hommies'} </Text>
          <Text style={styles.subTitle}> {'Resturant'} </Text>
        </View>

        {/* App categories part ( resturant branches ) */}

        {fav.length == 0 ? null : (
          <View style={{height: 150}}>
            <CarouselBanner data={this.state.fav} navigation={this.props.navigation} />
          </View>
        )}

        {/* categories menu items ( branches menu items ) */}

        <Text
          style={[styles.catTitle, fav.length == 0 ? {marginVertical: 20} : {}]}
        >
          {' '}
          {'Popular'}{' '}
        </Text>
      </>
    );
  }

  renderItem = (data) => (
    <MenuItemsList navigation={this.props.navigation} data={data} />
  );
  render() {
    return (
      <Drawer
        side="left"
        openDrawerOffset={0}
        ref={(ref) => {
          this.drawer = ref;
        }}
        content={
          <SideBar
            cartCount={this.state.cartCount}
            user={this.state.user}
            ordersCount={this.state.ordersCount}
            navigator={this.props.navigation}
            getUser={this.getUser}
            fav={this.state.fav}
          />
        }
        onClose={() => this._closeDrawer()}
      >
        <View style={styles.container}>
          {/* Header part ( menu icon and profile icon ) */}
          <Header
            style={{
              marginHorizontal: 20,
              backgroundColor: '#FFF',
              elevation: 0,
              paddingLeft: 0,
              paddingRight: 0,
            }}
            androidStatusBarColor="#333"
          >
            <Left style={{flexDirection: 'row', flex: 1}}>
              <TouchableOpacity
                onPress={() => this.openDrawer()}
                style={{height: '100%'}}
              >
                <Icon name="menu" size={25} color="#e57373" />
              </TouchableOpacity>
            </Left>
            <Right>
              <View
                style={{
                  backgroundColor: '#e3e3e3',
                  padding: 5,
                  borderRadius: 20,
                }}
              >
                <Icon name="account-circle" color="#e57373" size={25} />
              </View>
            </Right>
          </Header>
          {this.state.item}
          <View style={styles.scrollContainer}>
            <FlatList
              data={[{1: 1}]}
              keyExtractor={(item, index) => index.toString()}
              ListHeaderComponent={() => this.container(this.state.fav)}
              renderItem={() => this.renderItem(this.state.data)}
            />
          </View>
          {/* {this.container()} */}
          <Pressable
            onPress={() => this.props.navigation.navigate('ItemsList')}
            style={styles.footer}
          >
            <Text
              style={{
                fontFamily: 'Tajawal-Bold',
                color: '#e3e3e3',
                fontSize: 18,
              }}
            >
              {'السلة'}
            </Text>
            {/* <Image
              source={require('../assets/logo.jpg')}
              style={styles.footerImage}
            /> */}
            <View style={{flexDirection: 'row'}}>
              <View style={styles.radiusCont}>
                <Text style={{color: '#e57373'}}> {this.state.cartCount} </Text>
              </View>
              <View style={styles.radiusCont}>
                <Icon2 name="chevron-forward" color="#e57373" size={25} />
              </View>
            </View>
          </Pressable>
        </View>
      </Drawer>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    // paddingHorizontal: 20,
    // height: height
  },
  scrollContainer: {
    backgroundColor: '#FFF',
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    height: (height * 83) / 100,
  },
  textTitle: {
    // height: '15%',
    // backgroundColor: '#e3e3e3',
    marginBottom: 20,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 35,
    fontFamily: 'Tajawal-Bold',
    color: '#333',
    marginLeft: -8,
    // backgroundColor: 'red'
  },
  subTitle: {
    fontSize: 45,
    fontFamily: 'Tajawal-Regular',
    color: '#4444',
    marginTop: -15,
    marginLeft: -11,
    // backgroundColor: 'green'
  },
  catTitle: {
    fontSize: 18,
    marginVertical: 5,
    marginHorizontal: 20,
    color: '#e57373',
    fontFamily: 'Tajawal-Regular',
  },
  footer: {
    height: (height * 10) / 100,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  radiusCont: {
    backgroundColor: '#e3e3e3',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
