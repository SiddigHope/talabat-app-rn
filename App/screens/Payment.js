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
  ScrollView,
  StatusBar,
  ToastAndroid,
  Alert,
} from 'react-native';
import RadioButtonRN from 'radio-buttons-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {defBranch, sendNotification} from '../config/var';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'rn-fetch-blob';
import jwt_decode from 'jwt-decode';
import {
  RNPaymentSDKLibrary,
  PaymentSDKConfiguration,
  PaymentSDKBillingDetails,
  PaymentSDKTheme,
} from '@paytabs/react-native-paytabs';

const {width, height} = Dimensions.get('window');

const branch = [
  {
    label: 'فرع 1',
    value: '1',
  },
  {
    label: 'فرع 2',
    value: '2',
  },
];
const delivery = [
  {
    label: 'من المحل',
    value: '1',
  },
  {
    label: 'توصيل',
    value: '2',
  },
];
const payment = [
  {
    label: 'فيزا',
    value: '1',
  },
  {
    label: 'كاش',
    value: '2',
  },
];

export default class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: this.props.route.params.total,
      branches: branch,
      branch: '1',
      delivery: '1',
      user: [],
      payment: '2',
      branchName: '',
      activityIndicator: false,
      items: [],
      count: '',
      profileId: '',
      serverKey: '',
      clientKey: '',
      cardId: '',
      currency: '',
      countryCode: '',
    };
  }

  componentDidMount() {
    this.getBranches();
    this.getUser();
    this.setItemsAsArrayOfIds();
    this.getData();
    // console.log(defBranch)
  }

  getData = async () => {
    try {
      RNFetchBlob.fetch('GET', 'http://192.168.43.148:1337/payment-infos', {
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
          //   const data = JSON.parse(jwt);
          //   console.log(data);
          if (data.length == 0) {
            // console.log(resp.data);
          } else {
            this.setState({
              profileId: data[0].profileId,
              serverKey: data[0].serverKey,
              clientKey: data[0].clientKey,
              cardId: data[0].cardId,
              currency: data[0].currency,
              countryCode: data[0].countryCode,
            });
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

  setItemsAsArrayOfIds = async () => {
    const cart = await AsyncStorage.getItem('cart');
    let count = '';
    const items = [];
    if (cart != null) {
      const cartJson = JSON.parse(cart);
      cartJson.forEach((element) => {
        // console.log(element)
        items.push(element.id);
        count += element.count + ',';
        this.setState({
          items,
          count,
        });
      });
    }
  };

  getBranches = async () => {
    const branch = await AsyncStorage.getItem('branches');
    if (branch != null) {
      this.setState({
        branches: JSON.parse(branch),
      });
    }
    const can = JSON.parse(branch);
    // console.log(can.user)
  };

  getUser = async () => {
    const user = await AsyncStorage.getItem('talabat-user');
    if (user != null) {
      this.setState({
        user: JSON.parse(user),
      });
    }
    const can = JSON.parse(user);
    // console.log(can.user.phone);
  };

  async onPressPay() {
    let userLocation = 'not set';
    const userAddress = await AsyncStorage.getItem('talabat-user-location');
    if (userAddress != null) {
      userLocation = userAddress;
    }

    if (this.state.delivery == '2' && userAddress == null) {
      ToastAndroid.show('يجب اخيار مكان التوصيل من الخريطة', ToastAndroid.LONG);
    }

    const {profileId, clientKey, serverKey, cardId, currency, total} =
      this.state;
    let configuration = new PaymentSDKConfiguration();
    configuration.profileID = profileId;
    configuration.serverKey = serverKey;
    configuration.clientKey = clientKey;
    configuration.cartID = cardId;
    configuration.currency = currency;
    configuration.cartDescription = 'Flowers';
    configuration.merchantCountryCode = this.state.countryCode;
    configuration.merchantName = 'Hommies App';
    configuration.amount = total;
    configuration.screenTitle = 'دفع عن طريق البطاقة';

    let billingDetails = new PaymentSDKBillingDetails(
      (name = 'Hommies Resturant'),
      (email = 'email@test.com'),
      (phone = '+2011111111'),
      (addressLine = 'address line'),
      (city = 'Dubai'),
      (state = 'Dubai'),
      (countryCode = 'ae'), // ISO alpha 2
      (zip = '1234')
    );

    configuration.billingDetails = billingDetails;
    let theme = new PaymentSDKTheme();
    // theme.backgroundColor = "a83297"
    theme.logoImage = require('../../assets/images/logo.jpg');
    theme.secondaryColor = '#e57373';
    theme.buttonColor = '#e57373';
    configuration.theme = theme;

    RNPaymentSDKLibrary.startCardPayment(JSON.stringify(configuration)).then(
      (result) => {
        if (result['PaymentDetails'] != null) {
          let paymentDetails = result['PaymentDetails'];
          console.log(paymentDetails);
          this.completePayment();
        } else if (result['Event'] == 'CancelPayment') {
          console.log('Cancel Payment Event');
        }
      },
      function (error) {
        console.log(error);
      }
    );
  }

  completePayment = async () => {
    let userLocation = 'not set';
    const userAddress = await AsyncStorage.getItem('talabat-user-location');
    if (userAddress != null) {
      userLocation = userAddress;
    }

    if (this.state.delivery == '2' && userAddress == null) {
      ToastAndroid.show('يجب اخيار مكان التوصيل من الخريطة', ToastAndroid.LONG);
    }

    // if (this.state.branchName != '') {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        count: this.state.count,
        orderType: this.state.delivery == '1' ? 'takeaway' : 'delivery',
        address: userLocation,
        branch: this.state.branch,
        items: this.state.items,
        total: this.state.total,
        paymentType: this.state.payment == '2' ? 'cash' : 'online payment',
        users_permissions_user: this.state.user.id,
      }),
    };
    try {
      fetch('http://192.168.43.148:1337/orders', requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            ToastAndroid.show(
              'حدث خطا.. اعد المجاولة مرة اخرى!',
              ToastAndroid.LONG
            );
          } else {
            Alert.alert(
              'Talabat App',
              'Order Process ? ',
              [
                {
                  text: 'No',
                  onPress: () =>
                    console.log('do not want to follow your order?'),
                  style: 'cancel',
                },
                {
                  text: 'Yes',
                  onPress: () => {
                    AsyncStorage.removeItem('cart');
                    this.props.navigation.navigate('OrderProcess', {
                      orderId: data.id,
                    });
                  },
                },
              ],
              {cancelable: false}
            );
            this.sendNote()
          }
        });
    } catch (error) {
      console.log(error);
    }
    // } else {
    //   ToastAndroid.show('ادخل اسم الفرع من فضلك', ToastAndroid.LONG);
    //   return;
    // }
  };

  sendNote = async () => {
    // sendNotification()
    const requestOptions = {
      method: 'GET',
      header: {'Content/Type': 'application/json'}
    }
    try {
      fetch(`http:// /branch-admins/${this.state.branch}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data)
        sendNotification('طلب جديد',this.state.user.username,data[0].token)
      })
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    // console.log(this.state.user.length != 0 ? this.state.user.phone : '');
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#e57373" />
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={styles.itemsContainer}
        >
          <View style={styles.topContainer}>
            <View style={styles.rowData}>
              <Text style={styles.rowDataKey}> {'المجموع الفرعي'} </Text>
              <Text style={styles.rowDataValue}>
                {' '}
                {'$' + this.state.total}{' '}
              </Text>
            </View>
            <View style={styles.rowData}>
              <Text style={styles.rowDataKey}> {'رسوم التوصيل'} </Text>
              <Text style={styles.rowDataValue}>
                {' '}
                {this.state.delivery == '2' ? '$10.00' : '$0'}{' '}
              </Text>
            </View>
            <View style={styles.rowData}>
              <Text style={styles.rowDataKey}> {'الاجمالي'} </Text>
              <Text style={styles.rowDataValue}>
                {' '}
                $
                {this.state.delivery == '1'
                  ? this.state.total
                  : this.state.total + 10.0}{' '}
              </Text>
            </View>
          </View>
          <View style={styles.inputCont}>
            <TextInput
              textAlign="right"
              keyboardType="default"
              style={styles.textInput}
              editable={false}
              blurOnSubmit={false}
              value={
                this.state.user.length != 0 ? this.state.user.username : ''
              }
              placeholder={'الاسم'}
              onSubmitEditing={() => this.password.focus()}
              onChangeText={(fullname) => this.setState({fullname})}
            />
            <TextInput
              textAlign="right"
              keyboardType="phone-pad"
              editable={false}
              style={styles.textInput}
              blurOnSubmit={false}
              value={
                this.state.user.length != 0
                  ? String(this.state.user.phone)
                  : ''
              }
              placeholder={'رقم الهاتف'}
              onSubmitEditing={() => this.password.focus()}
              onChangeText={(phone) => this.setState({phone})}
            />
            <Text style={styles.rowDataValue}> {'الفرع'} </Text>
            <RadioButtonRN
              selectedBtn={(branch) =>
                this.setState({
                  branch: branch.value,
                })
              }
              style={{flexDirection: 'row'}}
              boxStyle={styles.boxStyle}
              textStyle={{marginHorizontal: 3, fontFamily: 'Tajawal-Regular'}}
              initial={Number(defBranch)}
              data={this.state.branches}
              icon={<Icon name="check-circle" size={25} color="#e57373" />}
            />
            <Text style={styles.rowDataValue}> {'طريقة الاسلام'} </Text>
            <RadioButtonRN
              selectedBtn={(delivery) => {
                this.setState({
                  delivery: delivery.value,
                });
                if (delivery.value == '2') {
                  this.props.navigation.navigate('GetAddress', {page: 'new'});
                }
              }}
              style={{flexDirection: 'row'}}
              boxStyle={styles.boxStyle}
              textStyle={{marginHorizontal: 3, fontFamily: 'Tajawal-Regular'}}
              initial={Number(this.state.delivery)}
              data={delivery}
              icon={<Icon name="check-circle" size={25} color="#e57373" />}
            />
            <Text style={styles.rowDataValue}> {'طريقة الدفع'} </Text>
            <RadioButtonRN
              selectedBtn={(payment) =>
                this.setState({
                  payment: payment.value,
                })
              }
              style={{flexDirection: 'row'}}
              boxStyle={styles.boxStyle}
              textStyle={{marginHorizontal: 3, fontFamily: 'Tajawal-Regular'}}
              initial={Number(this.state.payment)}
              data={payment}
              icon={<Icon name="check-circle" size={25} color="#e57373" />}
            />

            {/* <TextInput
              ref={(input) => (this.branch = input)}
              textAlign="right"
              placeholder={'اسم الفرع للتأكيد'}
              style={[styles.textInput]}
              onChangeText={(branchName) => this.setState({branchName})}
            /> */}
          </View>
        </ScrollView>
        <Pressable
          onPress={() =>
            this.state.payment == '1'
              ? this.onPressPay()
              : this.completePayment()
          }
          style={styles.btn}
        >
          <Text style={styles.btnText}> {'تأكيد الطلب'} </Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  itemsContainer: {
    width: '100%',
    // backgroundColor: '#FF3',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  topContainer: {
    height: 120,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: '#e3e3e3',
    paddingBottom: 20,
    marginBottom: 50,
  },
  rowData: {
    flex: 1,
    // backgroundColor: 'red',
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowDataKey: {
    fontFamily: 'Tajawal-Bold',
  },
  rowDataValue: {
    fontFamily: 'Tajawal-Bold',
    color: 'grey',
  },
  btn: {
    width: '90%',
    height: 60,
    flexDirection: 'row',
    backgroundColor: '#e57373',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  btnText: {
    fontFamily: 'Tajawal-Bold',
    fontSize: 16,
    color: '#e3e3e3',
  },
  inputCont: {
    flex: 1,
    width: '90%',
    marginBottom: 30,
  },
  textInput: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    fontSize: 14,
    elevation: 1,
    fontFamily: 'Tajawal-Regular',
    marginBottom: 5,
    borderColor: '#4444',
    borderBottomWidth: 0.5,
    paddingHorizontal: 20,
    height: 50,
  },
  boxStyle: {
    flex: 1,
    height: 50,
    margin: 0,
    borderColor: '#FFF',
    backgroundColor: '#FFF',
    borderBottomWidth: 0.5,
    borderRadius: 10,
    marginBottom: 5,
    elevation: 1,
    borderBottomColor: '#4444',
    marginHorizontal: 5,
  },
});
