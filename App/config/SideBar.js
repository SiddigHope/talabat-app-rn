import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  Pressable,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import Icon4 from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/AntDesign';
import {List, ListItem, Right, Body} from 'native-base';
import _ from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'rn-fetch-blob';
import RNRestart from 'react-native-restart';

const {width, height} = Dimensions.get('window');

export default SideBar = (props) => {
  const [user, setUser] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    getUser();
  }, [props.user]);

  const getUser = async () => {
    setUser(props.user);
  };

  const logout = () => {
    Alert.alert(
      'Talabat App',
      'Do you want to logout ? ',
      [
        {
          text: 'No',
          onPress: () => console.log('do not want to logout'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            AsyncStorage.removeItem('talabat-user');
            AsyncStorage.removeItem('cart');
            props.getUser();
            RNRestart.Restart();
            // props.navigator.navigate('Login');
          },
        },
      ],
      {cancelable: false}
    );
  };

  return (
    <ScrollView style={{backgroundColor: '#e57373'}}>
      <View style={styles.closeCont}>
        <Icon name="close" color="#FFF" size={30} />
      </View>
      <Pressable
        onPress={() => {
          props.user.length != 0
            ? logout()
            : props.navigator.navigate('Login', {
                navigation: props.navigator,
              });
        }}
      >
        <View style={styles.headerView}>
          <View style={styles.headerCont}>
            <View style={styles.avatarCont}>
              <Image
                style={styles.avatar}
                source={require('../../assets/images/302-3022217_roger-berry-avatar-placeholder.png')}
              />
            </View>
            <View style={styles.textCont}>
              <Text style={styles.signText}>
                {props.user.length != 0 ? props.user.username : 'تسجيل الدخول'}
              </Text>
              <Text style={styles.profileText}>
                {props.user.length != 0 ? props.user.phone : 'الملف الشخصي'}
              </Text>
            </View>
            <Pressable>
              <Icon name="power" color="#bdbdbd" size={30} />
            </Pressable>
          </View>
        </View>
      </Pressable>

      <View style={styles.container}>
        <List showsVerticalScrollIndicator={false}>
          {/* <ListItem noBorder>
            <Body>
              <TouchableOpacity
                onPress={() =>
                  props.navigator.navigate('Home', {
                    navigation: props.navigator,
                  })
                }
                style={styles.btnContainer}
              >
                <Icon3 name="clipboard-list" color="#bdbdbd" size={20} />
                <Text style={styles.btnText}> {'القائمة'} </Text>
              </TouchableOpacity>
            </Body>
          </ListItem> */}

          <ListItem noBorder>
            <Body>
              <TouchableOpacity
                onPress={() =>
                  props.navigator.navigate('ItemsList', {
                    navigation: props.navigator,
                  })
                }
                style={styles.btnContainer}
              >
                <Icon2 name="md-cart-outline" color="#bdbdbd" size={20} />
                <Text style={styles.btnText}> {'مشترياتي'} </Text>
                <View style={styles.notificationNumberCont}>
                  <Text style={{fontFamily: 'Tajawal-Regular'}}>
                    {props.user.length != 0 ? props.cartCount : '0'}
                  </Text>
                </View>
              </TouchableOpacity>
            </Body>
          </ListItem>

          <ListItem noBorder>
            <Body>
              <TouchableOpacity
                onPress={() =>
                  props.navigator.navigate('MyOrders', {
                    id: props.user.length != 0 ? props.user.id : '0',
                    navigation: props.navigator,
                  })
                }
                style={styles.btnContainer}
              >
                <Icon2 name="ios-time-outline" color="#bdbdbd" size={20} />
                <Text style={styles.btnText}> {'طلباتي'} </Text>
                <View style={styles.notificationNumberCont}>
                  <Text style={{fontFamily: 'Tajawal-Regular'}}>
                    {props.ordersCount}
                  </Text>
                </View>
              </TouchableOpacity>
            </Body>
          </ListItem>

          <ListItem noBorder>
            <Body>
              <TouchableOpacity
                onPress={() =>
                  props.navigator.navigate('MyFav', {
                    id: props.user.length != 0 ? props.user.id : '0',
                    navigation: props.navigator,
                    data:props.fav
                  })
                }
                style={styles.btnContainer}
              >
                <Icon name="heart-outline" color="#bdbdbd" size={20} />
                <Text style={styles.btnText}> {'المفضل'} </Text>
              </TouchableOpacity>
            </Body>
          </ListItem>

          <ListItem noBorder>
            <Body>
              <TouchableOpacity
                onPress={() =>
                  props.navigator.navigate('About', {
                    id: props.user.length != 0 ? props.user.id : '0',
                    navigation: props.navigator,
                  })
                }
                style={styles.btnContainer}
              >
                <Icon name="information-outline" color="#bdbdbd" size={20} />
                <Text style={styles.btnText}> {'عنا'} </Text>
              </TouchableOpacity>
            </Body>
          </ListItem>

          <ListItem noBorder>
            <Body>
              <TouchableOpacity
                onPress={() =>
                  props.navigator.navigate('Privacy', {
                    id: props.user.length != 0 ? props.user.id : '0',
                    navigation: props.navigator,
                  })
                }
                style={styles.btnContainer}
              >
                <Icon4 name="hand-stop-o" color="#bdbdbd" size={20} />
                <Text style={styles.btnText}> {'الخصوصية'} </Text>
              </TouchableOpacity>
            </Body>
          </ListItem>
        </List>
      </View>
      {props.user.length != 0 ? null : (
        <Pressable
          onPress={() =>
            props.navigator.navigate('DeliveryLogin', {
              navigation: props.navigator,
            })
          }
          style={styles.delivery}
        >
          <View style={styles.deliverySignIcon}>
            <Icon5 name="login" color="#e3e3e3" size={30} />
          </View>
          <Text style={styles.deliverySignText}>
            {'تسجيل الدخول كفتي توصيل'}
          </Text>
        </Pressable>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: (height * 60) / 100,
    // backgroundColor: '#344',
    marginHorizontal: 20,
  },
  headerView: {
    height: 120,
    width: '100%',
    justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#2196f3',
    marginBottom: 50,
  },
  headerCont: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    // backgroundColor: '#219',
  },
  avatarCont: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: '#FFF',
    elevation: 5,
  },
  avatar: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  textCont: {
    flex: 1,
    alignItems: 'flex-start',
    marginLeft: 10,
  },
  signText: {
    flex: 1,
    textAlignVertical: 'center',
    color: '#e3e3e3',
    fontFamily: 'Tajawal-Bold',
    fontSize: 18,
  },
  profileText: {
    flex: 1,
    textAlignVertical: 'center',
    color: '#bdbdbd',
    fontFamily: 'Tajawal-Regular',
    fontSize: 14,
  },
  closeCont: {
    width: '100%',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    // backgroundColor: '#e3e3e3',
  },
  appName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#eee',
    marginBottom: 20,
    fontFamily: 'Tajawal-Regular',
  },

  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 30,
    alignItems: 'center',
    marginHorizontal: 15,
  },
  btnText: {
    flex: 1,
    color: '#e3e3e3',
    fontSize: 15,
    textAlign: 'left',
    marginLeft: 10,
    fontFamily: 'Tajawal-Bold',
  },
  notificationNumberCont: {
    width: 30,
    height: 30,
    backgroundColor: '#e3e3e3',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  delivery: {
    marginHorizontal: 20,
    marginTop: 30,
    //   backgroundColor: "red",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
  },
  deliverySignIcon: {
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'green',
    borderWidth: 0.5,
    borderColor: '#e3e3e3',
  },
  deliverySignText: {
    // flex: 1,
    // backgroundColor: 'red',
    textAlign: 'left',
    color: '#e3e3e3',
    marginLeft: 15,
    fontFamily: 'Tajawal-Bold',
  },
});
