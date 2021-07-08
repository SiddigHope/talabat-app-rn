import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';

export default class Privacy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const requestOptions = {
      method: 'GET',
      header: {'Content-Type': 'application/json'},
    };
    try {
      fetch('http://192.168.43.148:1337/our-infos', requestOptions)
        .then((response) => response.json())
        .then((data) => {
        //   console.log(data.about);
          this.setState({data: data[0].privacy});
        });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#FFF'}}>
        <ScrollView style={{flex: 1}}>
        <Text
          style={{
            fontFamily: 'Tajawal-Regular',
            fontSize: 16,
            color: '#333',
            textAlign: 'right',
            margin: 20,
          }}
        >
          {' '}
          {this.state.data}{' '}
        </Text>
        </ScrollView>
      </View>
    );
  }
}
