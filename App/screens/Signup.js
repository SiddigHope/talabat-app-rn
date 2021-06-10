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
} from 'react-native';

const {width, height} = Dimensions.get('window');

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      password: '',
      activityIndicator: false,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.itemsContainer}>
          <View style={styles.inputCont}>
            <TextInput
              textAlign="right"
              keyboardType="default"
              style={styles.textInput}
              blurOnSubmit={false}
              placeholder={'الاسم كاملا'}
              onSubmitEditing={() => this.password.focus()}
              onChangeText={fullname => this.setState({fullname})}
            />
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
            <TextInput
              ref={input => (this.password = input)}
              textAlign="right"
              placeholder={'تأكيد كلمة المرور'}
              secureTextEntry
              style={[styles.textInput]}
              onChangeText={cpassword => this.setState({cpassword})}
            />
          </View>
          <Pressable style={styles.btn}>
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
            onPress={() => this.props.navigation.navigate('Login')}>
            <Text style={{fontFamily: 'Tajawal-Regular', color: '#dbdbdb'}}>
              {' '}
              {'سجل دخول الأن'}{' '}
            </Text>
            <Text style={{fontFamily: 'Tajawal-Bold', color: '#FFF'}}>
              {' '}
              {'لديك حساب ؟'}{' '}
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
