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
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import jwt_decode from 'jwt-decode';
import messaging from '@react-native-firebase/messaging';

const {width, height} = Dimensions.get('window');

export default class Login extends Component {
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
    console.log(user.user);
    let requestOptions = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        token,
      }),
    };
    try {
      fetch(
        `http://192.168.43.148:1337/users/${user.user.id}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          AsyncStorage.setItem('talabat-user', JSON.stringify(data));
          this.props.navigation.navigate('ChooseBranch');
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
          'POST',
          'http://192.168.43.148:1337/auth/local',
          {
            // Authorization: "Bearer access-token",
            // otherHeader: "foo",
            'Content-Type': 'application/json',
          },
          [
            // to send data
            {
              name: 'identifier',
              data: String('a_' + this.state.phone + '@email.com'),
            },
            {name: 'password', data: String(this.state.password)},
          ]
        )
          .then((resp) => {
            let data = [];
            if (resp.data.includes('{')) {
              data = JSON.parse(resp.data);
            } else {
              data = jwt_decode(resp.data, {header: true});
            }
            if (data.error) {
              console.log(resp.data);
            } else {
              this.insertToken(data);
              // AsyncStorage.setItem('talabat-user', JSON.stringify(data));
              // this.props.navigation.navigate('ChooseBranch');
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
              source={require('../assets/cafe.jpg')}
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
              onChangeText={(phone) => this.setState({phone})}
            />
            <TextInput
              ref={(input) => (this.password = input)}
              textAlign="right"
              placeholder={'كلمة المرور'}
              secureTextEntry
              style={[styles.textInput]}
              onChangeText={(password) => this.setState({password})}
            />
            <Text
              onPress={() => this.props.navigation.navigate('ForgetPassword')}
              style={{fontFamily: 'Tajawal-Regular', marginHorizontal: 10}}
            >
              {'نسيت كلمة المرور ؟'}
            </Text>
          </View>
          <Pressable onPress={() => this.login()} style={styles.btn}>
            <Text style={styles.btnText}> {'تسجيل الدخول'} </Text>
          </Pressable>
        </View>

        <View style={styles.elseContainer}>
          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            }}
            onPress={() => this.props.navigation.navigate('Signup')}
          >
            <Text style={{fontFamily: 'Tajawal-Regular', color: '#dbdbdb'}}>
              {' '}
              {'ليس لديك حساب؟'}{' '}
            </Text>
            <Text style={{fontFamily: 'Tajawal-Bold', color: '#FFF'}}>
              {' '}
              {'سجل الأن'}{' '}
            </Text>
          </Pressable>
        </View>
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
    width: (width * 50) / 100,
    height: (width * 50) / 100,
    borderRadius: (width * 50) / 100 / 2,
    borderWidth: 0.5,
    borderColor: '#333',
    marginBottom: 30,
  },
  image: {
    width: (width * 50) / 100,
    height: (width * 50) / 100,
    borderRadius: (width * 50) / 100 / 2,
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
