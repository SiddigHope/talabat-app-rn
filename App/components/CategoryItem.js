import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

console.disableYellowBox = true;

export default class CategoryItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={this.props.item.item.image} />
        <Text style={styles.title}> {this.props.item.item.title} </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: (width * 30) / 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    marginRight: 15,
    backgroundColor: '#e3e3e3',
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 20,
    marginBottom: 10,
  },
  title: {
    fontFamily: 'Tajawal-Bold',
  },
});
