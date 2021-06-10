import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  Pressable,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ItemsListComponent from '../components/ItemsListComponent';

const {width, height} = Dimensions.get('window');

export default class ItemsList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
      <StatusBar backgroundColor="#e57373"/>
        <View style={styles.header}>
          <ItemsListComponent
            navigation={this.props.navigation}
            data={this.state.data}
          />
        </View>
        <View style={styles.footer}>
          <View style={styles.priceCont}>
            <Text style={styles.price}> Total: </Text>
            <Text style={styles.price}> $60.00 </Text>
          </View>
          <View style={styles.buttonCont}>
            <Pressable
              onPress={() => this.props.navigation.navigate('Payment')}
              style={styles.btn}>
              <Text style={styles.btnText}> {'الدفع'} </Text>
            </Pressable>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flex: 1,
    marginTop: 10,
    width: '90%',
  },
  priceCont: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontFamily: 'Tajawal-Bold',
    fontSize: 25,
    color: '#e3e3e3',
  },
  buttonCont: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    backgroundColor: '#e57373',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginBottom: 10,
  },
  btnText: {
    fontFamily: 'Tajawal-Bold',
    fontSize: 16,
    color: '#e3e3e3',
  },
  footer: {
    height: '20%',
    width: '90%',
  },
});
