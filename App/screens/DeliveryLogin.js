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
  ToastAndroid
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import messaging from '@react-native-firebase/messaging';

const {width, height} = Dimensions.get('window');

export default class DeliveryLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      password: '',
      activityIndicator: false,
    };
  }

  insertToken = async (user) => {
    const token = await messaging().getToken();
    // console.log(user[0].id);
    let requestOptions = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        token,
      }),
    };
    try {
      fetch(
        `http://192.168.43.148:1337/delivery-boys/${user[0].id}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          AsyncStorage.setItem('talabat-delivery', JSON.stringify(data));
          this.props.navigation.navigate('HomeDelivery');
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  login = async () => {
    const {phone, password} = this.state;
    if (phone != '' && password != '') {
      try {
        RNFetchBlob.fetch(
          'GET',
          `http://192.168.43.148:1337/delivery-boys?phone=${phone}&password=${password}`,
          {
            // Authorization: "Bearer access-token",
            // otherHeader: "foo",
            'Content-Type': 'application/json',
          }
        )
          .then((resp) => {
            console.log(resp.json());
            const data = resp.json();
            if (data.error) {
              console.log(resp.data);
            } else if (data.length == 0) {
              ToastAndroid.show('Please enter a valid user info', ToastAndroid.LONG);
            } else {
              this.insertToken(data)
              // AsyncStorage.setItem('talabat-delivery', JSON.stringify(data));
              // this.props.navigation.navigate('HomeDelivery');
            }
          })
          .catch((err) => {
            console.log('error response');
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      ToastAndroid.show('Please fill all infos', ToastAndroid.LONG);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.itemsContainer}>
          <View style={styles.imageCont}>
            <Image
              resizeMode="contain"
              source={require('../assets/delivery-man.png')}
              style={styles.image}
            />
          </View>

          <View style={styles.inputCont}>
            <TextInput
              textAlign="right"
              keyboardType="phone-pad"
              style={styles.textInput}
              blurOnSubmit={false}
              placeholder={'رقم الهاتف'}
              onSubmitEditing={() => this.password.focus()}
              onChangeText={phone => this.setState({phone})}
            />
            <TextInput
              ref={input => (this.password = input)}
              textAlign="right"
              placeholder={'كلمة المرور'}
              secureTextEntry
              style={[styles.textInput]}
              onChangeText={password => this.setState({password})}
            />
          </View>
          <Pressable onPress={() => this.login()} style={styles.btn}>
            <Text style={styles.btnText}> {'تسجيل الدخول'} </Text>
          </Pressable>
        </View>

        <View style={styles.elseContainer} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
  },
  itemsContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFF',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  elseContainer: {
    height: '10%',
    width: '100%',
  },
  imageCont: {
    width: (width * 55) / 100,
    height: (width * 55) / 100,
    borderRadius: (width * 55) / 100 / 2,
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#333',
    marginBottom: 30,
  },
  image: {
    width: (width * 40) / 100,
    height: (width * 40) / 100,
    // borderRadius: (width * 50) / 100 / 2,
  },
  btn: {
    width: '90%',
    height: 60,
    flexDirection: 'row',
    backgroundColor: '#4444',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  btnText: {
    fontFamily: 'Tajawal-Bold',
    fontSize: 16,
    color: '#333',
  },
  inputCont: {
    width: '90%',
    marginBottom: 30,
  },
  textInput: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    fontSize: 18,
    elevation: 1,
    fontFamily: 'Tajawal-Regular',
    marginBottom: 20,
    borderColor: '#4444',
    borderBottomWidth: 0.5,
    paddingHorizontal: 20,
    height: 60,
  },
});
