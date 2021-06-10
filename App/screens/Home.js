import React, {Component} from 'react';
import {
  StatusBar,
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import {
  Container,
  Header,
  Left,
  Right,
  Drawer,
  DefaultTabBar,
} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';
import SideBar from '../config/SideBar';
import CategoryItem from '../components/CategoryItem';
import MenuItemsList from '../components/MenuItemsList';

const {width, height} = Dimensions.get('window');

const data = [
  {
    id: '1',
    title: 'الخرطوم',
    image: require('../assets/cafe.jpg'),
  },
  {
    id: '2',
    title: 'بحري',
    image: require('../assets/cafe.jpg'),
  },
  {
    id: '3',
    title: 'امدرمان',
    image: require('../assets/cafe.jpg'),
  },
  {
    id: '4',
    title: 'مدني',
    image: require('../assets/cafe.jpg'),
  },
];

const menuItems = [
  {
    id: '1',
    title: 'شاورما',
    price: '1.50',
    desc: 'مرحبا بكم اليوم عرض خاص على الشورما اهلا وسهلا بكم بفرع الزرقاء',
    image: {
      uri: 'https://dlwaqty.com/storage/7348/%D8%B4%D8%A7%D9%88%D8%B1%D9%85%D8%A7-%D8%A7%D9%84%D8%AF%D8%AC%D8%A7%D8%AC-%D9%81%D9%8A-%D8%A7%D9%84%D9%85%D9%86%D8%B2%D9%84.jpg',
    },
  },
  {
    id: '2',
    title: 'بيرقر',
    price: '3.00',
    desc: 'مرحبا بكم اليوم عرض خاص على الشورما اهلا وسهلا بكم بفرع الزرقاء',
    image: {
      uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEGJ-S9Kji5pdhC4A5VY68hAYNPqYaaoHORQ&usqp=CAU',
    },
  },
  {
    id: '3',
    title: 'شيش',
    price: '4.00',
    desc: 'مرحبا بكم اليوم عرض خاص على الشورما اهلا وسهلا بكم بفرع الزرقاء',
    image: {
      uri: 'https://img.atyabtabkha.com/Abbs4Bo54qbz8Ku_bBYfqjRMHio=/640x360/https://harmony-assets-live.s3.amazonaws.com/image_source/bc/1f/bc1fdccaaf6d2acea03614867b55f84260837fb3.jpg',
    },
  },
  {
    id: '4',
    title: 'فلافل',
    price: '2.50',
    desc: 'مرحبا بكم اليوم عرض خاص على الشورما اهلا وسهلا بكم بفرع الزرقاء',
    image: {
      uri: 'data:image/jpeg;base64,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',
    },
  },
];

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: data,
      menuItems: menuItems,
    };
  }

  renderTabBar = props => {
    props.tabStyle = Object.create(props.tabStyle);
    return <DefaultTabBar {...props} />;
  };

  closeDrawer() {
    this.drawer._root.close();
  }

  openDrawer() {
    this.drawer._root.open();
  }

  _renderItem = (item, index) => {
    console.log(item);
    return <CategoryItem item={item} />;
  };

  _listHeader = () => {
    return <View style={{width: 20}} />;
  };
  _listFooter = () => {
    return <View style={{width: 20}} />;
  };

  container() {
    return (
      <View style={styles.scrollContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollView}>
          {/* Hedding title ( app name and describtion) */}
          <View style={styles.textTitle}>
            <Text style={styles.title}> {'Hommies'} </Text>
            <Text style={styles.subTitle}> {'Resturant'} </Text>
          </View>

          {/* App categories part ( resturant branches ) */}

          <View style={{height: (height * 20) / 100}}>
            <FlatList
              data={this.state.category}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
              horizontal
              ListHeaderComponent={this._listHeader}
              ListFooterComponent={this._listFooter}
              renderItem={this._renderItem}
            />
          </View>

          {/* categories menu items ( branches menu items ) */}

          <Text style={[styles.catTitle]}> {'Popular'} </Text>

          <MenuItemsList
            navigation={this.props.navigation}
            data={this.state.menuItems}
          />
        </ScrollView>
      </View>
    );
  }
  render() {
    return (
      <Drawer
        side="left"
        openDrawerOffset={0}
        ref={ref => {
          this.drawer = ref;
        }}
        content={<SideBar navigator={this.props.navigation} />}
        onClose={() => this.closeDrawer()}>
        <View style={styles.container}>
          {/* Header part ( menu icon and profile icon ) */}
          <Header
            style={{
              marginHorizontal: 20,
              backgroundColor: '#FFF',
              elevation: 0,
              paddingLeft: 0,
              paddingRight: 0,
            }}
            androidStatusBarColor="#333">
            <Left style={{flexDirection: 'row', flex: 1}}>
              <TouchableOpacity
                onPress={() => this.openDrawer()}
                style={{height: '100%'}}>
                <Icon name="menu" size={25} color="#333" />
              </TouchableOpacity>
            </Left>
            <Right>
              <View
                style={{
                  backgroundColor: 'grey',
                  padding: 5,
                  borderRadius: 20,
                }}>
                <Icon name="account-circle" size={25} />
              </View>
            </Right>
          </Header>
          {this.state.item}
          {this.container()}
          <Pressable
            onPress={() => this.props.navigation.navigate('ItemsList')}
            style={styles.footer}>
            <Text
              style={{
                fontFamily: 'Tajawal-Bold',
                color: '#e3e3e3',
                fontSize: 18,
              }}>
              {'السلة'}
            </Text>
            <Image
              source={require('../assets/logo.jpg')}
              style={styles.footerImage}
            />
            <View style={{flexDirection: 'row'}}>
              <View style={styles.radiusCont}>
                <Text> 1 </Text>
              </View>
              <View style={styles.radiusCont}>
                <Icon2 name="chevron-forward" size={25} />
              </View>
            </View>
          </Pressable>
        </View>
      </Drawer>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    // paddingHorizontal: 20,
    // height: height
  },
  scrollContainer: {
    backgroundColor: '#FFF',
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    height: (height * 83) / 100,
  },
  textTitle: {
    height: '15%',
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
    color: '#4444',
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
