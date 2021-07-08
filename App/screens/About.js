import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';

export default class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
    };
  }

  componentDidMount() {
    this.getData();
    this.sendNote();
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
          this.setState({data: data[0].about});
        });
    } catch (error) {
      console.log(error);
    }
  };

  sendNote = async () => {
    const requestOptions = {
      method: 'GET',
      header: {'Content-Type': 'application/json'},
      body:JSON.stringify({
          title: 'Testing',
          message: 'just for testing',
          token: 'cqTQia6dTSCYdY6pM37Jwv:APA91bE33DNZMKzQ6IVgyh4F-fDCqs9rJ9CaCT5dKj1VBISLc6KvbgkYtJ6PBYX8BMV7IPSq-zltorFL4c_wLiBUE54O6hugVYKly6HdvMoYc_B4saOj9h10wHY1I4tzmyr2rJW4eNrP'
      })
    };
    try {
      fetch('http://192.168.43.148/send-notifications/sendToToken.php', requestOptions)
        .then((response) => response.text())
        .then((data) => {
          console.log(data);
        //   this.setState({data: data[0].about});
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
