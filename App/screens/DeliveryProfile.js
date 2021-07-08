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
  ToastAndroid,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('window');

export default class DeliveryProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const user = await AsyncStorage.getItem('talabat-delivery');
    if (user != null) {
      const userObj = JSON.parse(user);
      //   console.log(userObj)
      this.setState({
        user: userObj,
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.itemsContainer}>
          <View style={styles.inputCont}>
            <Text style={styles.rowDataValue}> {'الاسم'} </Text>
            <TextInput
              textAlign="right"
              keyboardType="default"
              style={styles.textInput}
              blurOnSubmit={false}
              value={this.state.user.name}
              editable={false}
              onSubmitEditing={() => this.phone.focus()}
              onChangeText={(fullname) => this.setState({fullname})}
            />
            <Text style={styles.rowDataValue}> {'رقم الهاتف'} </Text>
            <TextInput
              ref={(input) => (this.phone = input)}
              textAlign="right"
              keyboardType="phone-pad"
              style={styles.textInput}
              blurOnSubmit={false}
              value={String(this.state.user.phone)}
              editable={false}
              onSubmitEditing={() => this.password.focus()}
              onChangeText={(phone) => this.setState({phone})}
            />
            <Text style={styles.rowDataValue}> {'نوع المركبة'} </Text>
            <TextInput
              ref={(input) => (this.password = input)}
              textAlign="right"
              editable={false}
              value={this.state.user.carType}
              onSubmitEditing={() => this.cpassword.focus()}
              style={[styles.textInput]}
              onChangeText={(password) => this.setState({password})}
            />
            <Text style={styles.rowDataValue}> {'رقم المركبة'} </Text>
            <TextInput
              ref={(input) => (this.cpassword = input)}
              textAlign="right"
              value={this.state.user.carSerial}
              editable={false}
              style={[styles.textInput]}
              onChangeText={(cpassword) => this.setState({cpassword})}
            />
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
  },
  itemsContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  elseContainer: {
    height: '10%',
    width: '100%',
  },
  rowDataValue: {
    fontFamily: 'Tajawal-Bold',
    color: 'grey',
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
