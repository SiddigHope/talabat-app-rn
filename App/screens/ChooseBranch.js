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
import RadioButtonRN from 'radio-buttons-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setBranch} from '../config/var';
import jwt_decode from 'jwt-decode';

const {width, height} = Dimensions.get('window');

const branch = [
  {
    label: 'فرع 1',
    value: '1',
  },
  {
    label: '2 فرع',
    value: '2',
  },
];

export default class ChooseBranch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      branch: '1',
      activityIndicator: false,
      data: branch,
      branchAdmin: [],
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    try {
      RNFetchBlob.fetch('GET', 'http://192.168.43.148:1337/branches', {
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
          if (data.error) {
            console.log(resp.data);
          } else {
            // this.setState({
            //   data,
            // });
            this.setArray(data);
            this.getAdmins();
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

  getAdmins = async () => {
    try {
      RNFetchBlob.fetch('GET', 'http://192.168.43.148:1337/branch-admins', {
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
          if (data.error) {
            console.log(resp.data);
          } else {
            // this.setState({
            //   data,
            // });
            // console.log(data);
            AsyncStorage.setItem('talabat-branch-admins', JSON.stringify(data))
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

  setArray = async (items) => {
    const data = [];
    items.forEach((element) => {
      // console.log(element)
      data.push({label: element.name, value: element.id});
      this.setState({data});
    });
    AsyncStorage.setItem('branches', JSON.stringify(data), (err) => {
      if (err) {
        // console.log("an error");
        throw err;
      }
      // console.log("success");
    }).catch((err) => {
      console.log('error is: ' + err);
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.itemsContainer}>
          <View
            style={{
              height: '70%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View style={styles.imageCont}>
              <Image
                source={require('../assets/cafe.jpg')}
                style={styles.image}
              />
            </View>

            <View style={styles.inputCont}>
              <Text
                style={{
                  width: '90%',
                  marginBottom: 5,
                  alignSelf: 'flex-end',
                  fontFamily: 'Tajawal-Bold',
                  marginHorizontal: 10,
                  fontSize: 16,
                }}
              >
                {'اختر الفرع'}
              </Text>
              <RadioButtonRN
                selectedBtn={(branch) => {
                  this.setState({
                    branch: branch.value,
                  });
                }}
                style={{flexDirection: 'row'}}
                boxStyle={styles.boxStyle}
                textStyle={{marginHorizontal: 3, fontFamily: 'Tajawal-Regular'}}
                initial={1}
                data={this.state.data}
                icon={<Icon name="check-circle" size={25} color="#e57373" />}
              />
              <Pressable
                onPress={() => {
                  setBranch(this.state.branch);
                  this.props.navigation.navigate('Home');
                }}
                style={styles.btn}
              >
                <Text style={styles.btnText}> {'تصفح الاصناف'} </Text>
              </Pressable>
            </View>
          </View>
        </View>

        <View style={styles.elseContainer}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
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
    flex: 1,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  image: {
    width: (width * 50) / 100,
    height: (width * 50) / 100,
    borderRadius: (width * 50) / 100 / 2,
  },
  btn: {
    width: '100%',
    height: 60,
    marginTop: 20,
    flexDirection: 'row',
    backgroundColor: '#e57373',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  btnText: {
    flex: 1,
    fontFamily: 'Tajawal-Bold',
    fontSize: 16,
    textAlign: 'center',
    color: '#e3e3e3',
  },
  inputCont: {
    width: '90%',
    flex: 1,
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    // marginBottom: 30,
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
  boxStyle: {
    flex: 1,
    height: 55,
    // margin: 0,
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
