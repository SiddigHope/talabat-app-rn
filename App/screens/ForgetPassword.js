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

export default class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      activityIndicator: false,
    };
  }

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
              onChangeText={phone => this.setState({phone})}
            />
          </View>
          <Pressable style={styles.btn}>
            <Text style={styles.btnText}> {'استعادة كلمة المرور'} </Text>
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
    width: (width * 50) / 100,
    height: (width * 50) / 100,
    borderRadius: (width * 50) / 100 / 2,
    borderWidth: 0.5,
    borderColor: '#333',
    marginBottom: 50,
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
