import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import Icon4 from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/AntDesign';
import {List, ListItem, Right, Body} from 'native-base';
import _ from 'lodash';

const {width, height} = Dimensions.get('window');

export default SideBar = props => {
  return (
    <ScrollView style={{backgroundColor: '#e57373'}}>

      <View style={styles.closeCont}>
        <Icon name="close" color="#FFF" size={30} />
      </View>
      <Pressable
        onPress={() =>
          props.navigator.navigate('Login', {
            navigation: props.navigator,
          })
        }>
        <View style={styles.headerView}>
          <View style={styles.headerCont}>
            <View style={styles.avatarCont}>
              <Image
                style={styles.avatar}
                source={require('../assets/400.jpeg')}
              />
            </View>
            <View style={styles.textCont}>
              <Text style={styles.signText}> {'تسجيل الدخول'} </Text>
              <Text style={styles.profileText}> {'الملف الشخصي'} </Text>
            </View>
            <Icon name="power" color="#bdbdbd" size={30} />
          </View>
        </View>
      </Pressable>

      <View style={styles.container}>
        <List showsVerticalScrollIndicator={false}>
          <ListItem noBorder>
            <Body>
              <TouchableOpacity
                onPress={() =>
                  props.navigator.navigate('Profile', {
                    navigation: props.navigator,
                  })
                }
                style={styles.btnContainer}>
                <Icon3 name="clipboard-list" color="#bdbdbd" size={20} />
                <Text style={styles.btnText}> {'القائمة'} </Text>
              </TouchableOpacity>
            </Body>
          </ListItem>

          <ListItem noBorder>
            <Body>
              <TouchableOpacity style={styles.btnContainer}>
                <Icon2 name="md-cart-outline" color="#bdbdbd" size={20} />
                <Text style={styles.btnText}> {'مشترياتي'} </Text>
                <View style={styles.notificationNumberCont}>
                  <Text style={{fontFamily: 'Tajawal-Regular'}}>{'1'}</Text>
                </View>
              </TouchableOpacity>
            </Body>
          </ListItem>

          <ListItem noBorder>
            <Body>
              <TouchableOpacity
                onPress={() =>
                  props.navigator.navigate('ParticipationOptions', {
                    navigation: props.navigator,
                  })
                }
                style={styles.btnContainer}>
                <Icon2 name="ios-time-outline" color="#bdbdbd" size={20} />
                <Text style={styles.btnText}> {'حجز طلب'} </Text>
                <View style={styles.notificationNumberCont}>
                  <Text style={{fontFamily: 'Tajawal-Regular'}}>{'1'}</Text>
                </View>
              </TouchableOpacity>
            </Body>
          </ListItem>

          <ListItem noBorder>
            <Body>
              <TouchableOpacity style={styles.btnContainer}>
                <Icon name="heart-outline" color="#bdbdbd" size={20} />
                <Text style={styles.btnText}> {'المفضل'} </Text>
              </TouchableOpacity>
            </Body>
          </ListItem>

          <ListItem noBorder>
            <Body>
              <TouchableOpacity style={styles.btnContainer}>
                <Icon name="information-outline" color="#bdbdbd" size={20} />
                <Text style={styles.btnText}> {'عنا'} </Text>
              </TouchableOpacity>
            </Body>
          </ListItem>

          <ListItem noBorder>
            <Body>
              <TouchableOpacity style={styles.btnContainer}>
                <Icon4 name="hand-stop-o" color="#bdbdbd" size={20} />
                <Text style={styles.btnText}> {'الخصوصية'} </Text>
              </TouchableOpacity>
            </Body>
          </ListItem>
        </List>
      </View>
      <Pressable
        onPress={() =>
          props.navigator.navigate('DeliveryLogin', {
            navigation: props.navigator,
          })
        }
        style={styles.delivery}>
        <View style={styles.deliverySignIcon}>
          <Icon5 name="login" color="#e3e3e3" size={30} />
        </View>
        <Text style={styles.deliverySignText}>{'تسجيل الدخول كفتي توصيل'}</Text>
      </Pressable>
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
    color:'#e3e3e3',
    marginLeft: 15,
    fontFamily: 'Tajawal-Bold',
  },
});
