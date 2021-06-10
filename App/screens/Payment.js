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
} from 'react-native';
import RadioButtonRN from 'radio-buttons-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const {width, height} = Dimensions.get('window');

const branch = [
  {
    label: 'فرع الخرطوم',
    value: 'female',
  },
  {
    label: 'فرع بحري',
    value: 'male',
  },
];
const delivery = [
  {
    label: 'من المحل',
    value: 'female',
  },
  {
    label: 'توصيل',
    value: 'male',
  },
];
const payment = [
  {
    label: 'فيزا',
    value: 'female',
  },
  {
    label: 'كاش',
    value: 'male',
  },
];

export default class Payment extends Component {
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
        <StatusBar backgroundColor="#e57373" />
        <ScrollView contentContainerStyle={styles.itemsContainer}>
          <View style={styles.topContainer}>
            <View style={styles.rowData}>
              <Text style={styles.rowDataKey}> {'المجموع الفرعي'} </Text>
              <Text style={styles.rowDataValue}> {'669.00'} </Text>
            </View>
            <View style={styles.rowData}>
              <Text style={styles.rowDataKey}> {'رسوم التوصيل'} </Text>
              <Text style={styles.rowDataValue}> {'10.00'} </Text>
            </View>
            <View style={styles.rowData}>
              <Text style={styles.rowDataKey}> {'الاجمالي'} </Text>
              <Text style={styles.rowDataValue}> {'679.00'} </Text>
            </View>
          </View>
          <View style={styles.inputCont}>
            <TextInput
              textAlign="right"
              keyboardType="default"
              style={styles.textInput}
              blurOnSubmit={false}
              placeholder={'محمد احمد حامد'}
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
            <Text style={styles.rowDataValue}> {'الفرع'} </Text>
            <RadioButtonRN
              selectedBtn={agreement =>
                this.setState({
                  agreement: agreement.value,
                  showReason: agreement.value,
                })
              }
              style={{flexDirection: 'row'}}
              boxStyle={styles.boxStyle}
              textStyle={{marginHorizontal: 3, fontFamily: 'Tajawal-Regular'}}
              initial={2}
              data={branch}
              icon={<Icon name="check-circle" size={25} color="#e57373" />}
            />
            <RadioButtonRN
              selectedBtn={agreement =>
                this.setState({
                  agreement: agreement.value,
                  showReason: agreement.value,
                })
              }
              style={{flexDirection: 'row'}}
              boxStyle={styles.boxStyle}
              textStyle={{marginHorizontal: 3, fontFamily: 'Tajawal-Regular'}}
              initial={1}
              data={delivery}
              icon={<Icon name="check-circle" size={25} color="#e57373" />}
            />
            <RadioButtonRN
              selectedBtn={agreement =>
                this.setState({
                  agreement: agreement.value,
                  showReason: agreement.value,
                })
              }
              style={{flexDirection: 'row'}}
              boxStyle={styles.boxStyle}
              textStyle={{marginHorizontal: 3, fontFamily: 'Tajawal-Regular'}}
              initial={2}
              data={payment}
              icon={<Icon name="check-circle" size={25} color="#e57373" />}
            />

            <TextInput
              ref={input => (this.password = input)}
              textAlign="right"
              placeholder={'اسم الفرع'}
              style={[styles.textInput]}
              onChangeText={password => this.setState({password})}
            />
          </View>
          <Pressable style={styles.btn}>
            <Text style={styles.btnText}> {'تأكيد الطلب'} </Text>
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
  itemsContainer: {
    flex: 1,
    width: '100%',
    // backgroundColor: '#FF3',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  topContainer: {
    height: '20%',
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
