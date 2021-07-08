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
  ToastAndroid,
  ScrollView,
} from 'react-native';
import {
  RNPaymentSDKLibrary,
  PaymentSDKConfiguration,
  PaymentSDKBillingDetails,
  PaymentSDKTheme,
} from '@paytabs/react-native-paytabs';
const {width, height} = Dimensions.get('window');

export default class VisaDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: '',
      exp: '',
      holder: '',
      cvv: '',
      activityIndicator: false,
    };
  }

  onPressPay() {
    let configuration = new PaymentSDKConfiguration();
    configuration.profileID = '70457';
    configuration.serverKey = 'SNJNTDZWHJ-JBRGTJLZHG-HMGJW9WTMT';
    configuration.clientKey = 'C7KMKQ-G7PH62-RT76B9-QKDR2B';
    configuration.cartID = '545454';
    configuration.currency = 'AED';
    configuration.cartDescription = 'Flowers';
    configuration.merchantCountryCode = 'AE';
    configuration.merchantName = 'Flowers Store';
    configuration.amount = 20;
    configuration.screenTitle = 'Pay with Card';

    let billingDetails = new PaymentSDKBillingDetails(
      {name: 'Mohamed Adly'},
      {email: 'm.adly@paytabs.com'},
      {phone: '+201113655936'},
      {addressLine: 'Flat 1,Building 123, Road 2345'},
      {city: 'Dubai'},
      {state: 'Dubai'},
      {country: "ae"},
      {zip: '1234'},
    );
    configuration.billingDetails = billingDetails;
    let theme = new PaymentSDKTheme();
    // theme.backgroundColor = "a83297"
    configuration.theme = theme;

    RNPaymentSDKLibrary.startCardPayment(JSON.stringify(configuration)).then(
      (result) => {
        if (result['PaymentDetails'] != null) {
          let paymentDetails = result['PaymentDetails'];
          console.log(paymentDetails);
        } else if (result['Event'] == 'CancelPayment') {
          console.log('Cancel Payment Event');
        }
      },
      function (error) {
        console.log(error);
      }
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.itemsContainer}>
          <View style={styles.imageCont}>
            <Image
              source={{
                uri: 'https://static.stashfin.com/website/assets/images/img/credit-card.png',
              }}
              style={styles.image}
            />
          </View>

          <View style={styles.inputCont}>
            <TextInput
              keyboardType="phone-pad"
              style={styles.textInput}
              blurOnSubmit={false}
              placeholder={'Card number'}
              onSubmitEditing={() => this.phone.focus()}
              onChangeText={(number) => this.setState({number})}
            />
            <TextInput
              ref={(input) => (this.phone = input)}
              keyboardType="phone-pad"
              style={styles.textInput}
              blurOnSubmit={false}
              placeholder={'Expired Date'}
              onSubmitEditing={() => this.password.focus()}
              onChangeText={(exp) => this.setState({exp})}
            />
            <TextInput
              keyboardType="phone-pad"
              ref={(input) => (this.password = input)}
              placeholder={'CVV'}
              onSubmitEditing={() => this.cpassword.focus()}
              style={[styles.textInput]}
              onChangeText={(cvv) => this.setState({cvv})}
            />
            <TextInput
              ref={(input) => (this.cpassword = input)}
              placeholder={'Card Holder'}
              style={[styles.textInput]}
              onChangeText={(holder) => this.setState({holder})}
            />
          </View>
          <Pressable onPress={() => this.onPressPay()} style={styles.btn}>
            <Text style={styles.btnText}> {'تأكيد العملية'} </Text>
          </Pressable>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  imageCont: {
    width: width - 40,
    height: (width - 40) / 1.5,
    // borderWidth: 0.5,
    // borderColor: '#333',
    marginVertical: 30,
  },
  image: {
    width: width - 40,
    height: (width - 40) / 1.5,
    borderRadius: 10,
    backgroundColor: 'red',
  },
  itemsContainer: {
    width: '100%',
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
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
