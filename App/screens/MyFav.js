import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';
import MenuItemsList from '../components/MenuItemsList';

const {width, height} = Dimensions.get('window');

class MyFav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    // console.log(this.props.route.params.data)  
    this.setState({
          data:this.props.route.params.data
      })
  }


  renderItem = (data) => (
    <MenuItemsList navigation={this.props.navigation} data={data} />
  );
  render() {
    return (
      <View style={styles.container}>
        {this.state.item}
        <View style={styles.scrollContainer}>
          <FlatList
            data={[{1: 1}]}
            keyExtractor={(item, index) => index.toString()}
              ListHeaderComponent={() => <View style={{height: 20}}/>}
            renderItem={() => this.renderItem(this.state.data)}
          />
        </View>
      </View>
    );
  }
}

export default MyFav;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    // paddingHorizontal: 20,
    // height: height
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  textTitle: {
    // height: '15%',
    // backgroundColor: '#e3e3e3',
    marginBottom: 20,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 35,
    fontFamily: 'Tajawal-Bold',
    color: '#333',
    marginLeft: -8,
    // backgroundColor: 'red'
  },
  subTitle: {
    fontSize: 45,
    fontFamily: 'Tajawal-Regular',
    color: '#4444',
    marginTop: -15,
    marginLeft: -11,
    // backgroundColor: 'green'
  },
  catTitle: {
    fontSize: 18,
    marginVertical: 5,
    marginHorizontal: 20,
    color: '#e57373',
    fontFamily: 'Tajawal-Regular',
  },
  footer: {
    height: (height * 10) / 100,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  radiusCont: {
    backgroundColor: '#e3e3e3',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
