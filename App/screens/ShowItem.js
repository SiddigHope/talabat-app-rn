import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {width, height} = Dimensions.get('window');

export default class ShowItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: [],
      itemCount: 1,
    };
  }

  componentDidMount() {
    this.setState({
      item: this.props.route.params.item,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerImage}>
            <Image source={this.state.item.image} style={styles.image} />
          </View>
          <View style={styles.bodyContent}>
            <ScrollView
              contentContainerStyle={{flex: 1}}
              showsVerticalScrollIndicator={false}>
              <Text style={styles.title}> {this.state.item.title} </Text>
              <View style={styles.subHeader}>
                <View style={styles.countCont}>
                  <Pressable>
                    <Icon name="minus" size={20} />
                  </Pressable>
                  <Text style={styles.itemCount}> {this.state.itemCount} </Text>
                  <Pressable>
                    <Icon name="plus" size={20} />
                  </Pressable>
                </View>
                <Text style={styles.price}>{'$' + this.state.item.price}</Text>
              </View>
              <Text style={{fontFamily: 'Tajawal-Regular', fontSize: 16}}>
                {this.state.item.desc}
              </Text>
            </ScrollView>
          </View>
        </View>
        <View style={styles.footer}>
          <Pressable>
            <Icon name="heart-outline" size={25} color="#333" />
          </Pressable>
          <Pressable style={styles.btn}>
            <Text style={styles.btnText}> {'اضافة للسلة'} </Text>
          </Pressable>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flex: 1,
    width: '90%',
    alignItems: 'center',
  },
  headerImage: {
    height: '40%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginBottom: 20,
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 30,
  },
  bodyContent: {
    flex: 1,
    width: '90%',
  },
  title: {
    fontFamily: 'Tajawal-Bold',
    fontSize: 20,
    color: '#333',
  },
  subHeader: {
    height: '20%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  countCont: {
    flexDirection: 'row',
    height: 35,
    borderRadius: 20,
    paddingHorizontal: 5,
    width: '30%',
    borderWidth: 0.5,
    borderColor: '#333',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  price: {
    fontFamily: 'Tajawal-Regular',
    fontSize: 30,
  },
  itemCount: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'Tajawal-Bold',
    fontSize: 18,
  },
  footer: {
    height: '10%',
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  btn: {
    width: '80%',
    height: 60,
    flexDirection: 'row',
    backgroundColor: '#4444',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  btnText: {
    fontFamily: 'Tajawal-Bold',
    fontSize: 16,
    color: '#333',
  },
});
