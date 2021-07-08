/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {StatusBar, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from './App/screens/Home';
import Profile from './App/screens/Profile';
import Icon from 'react-native-vector-icons/Ionicons';
import Login from './App/screens/Login';
import Signup from './App/screens/Signup';
import DeliveryLogin from './App/screens/DeliveryLogin';
import ForgetPassword from './App/screens/ForgetPassword';
import ShowItem from './App/screens/ShowItem';
import ItemsList from './App/screens/ItemsList';
import Payment from './App/screens/Payment';
import ChooseBranch from './App/screens/ChooseBranch';
import GetAddress from './App/screens/GetAddress';
import OrderProcess from './App/screens/OrderProcess';
import VisaDetails from './App/screens/VisaDetails';
import MyOrders from './App/screens/MyOrders';
import HomeDelivery from './App/screens/HomeDelivery';
import DeliveryProfile from './App/screens/DeliveryProfile';
import DeliveryOrders from './App/screens/DeliveryOrders';
import {firebaseConfig, requestUserPermission} from './App/config/Firebase';
import app from '@react-native-firebase/app';
import About from './App/screens/About';
import Privacy from './App/screens/Privacy';
import MyFav from './App/screens/MyFav';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    try {
      requestUserPermission();
      app.initializeApp(firebaseConfig);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <>
        <StatusBar backgroundColor="#333" />
        <ChooseBranch navigation={this.props.navigation} />
      </>
    );
  }
}

const Stack = createStackNavigator();

function Stacks() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="App"
        component={App}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChooseBranch"
        component={ChooseBranch}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="HomeDelivery"
        component={HomeDelivery}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="OrderProcess"
        component={OrderProcess}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="GetAddress"
        component={GetAddress}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: 'تسجيل الدخول',
          headerStyle: {
            backgroundColor: '#FFF',
            elevation: 0,
          },
          headerTintColor: '#333',
          headerTitleStyle: {
            alignSelf: 'flex-start',
            fontFamily: 'Tajawal-Bold',
          },
          headerRight: () => <View />,
          headerBackImage: () => (
            <Icon
              name="chevron-back"
              style={{marginLeft: 10}}
              color="#333"
              size={30}
            />
          ),
        }}
      />
      <Stack.Screen
        name="DeliveryProfile"
        component={DeliveryProfile}
        options={{
          title: 'حسابي',
          headerStyle: {
            backgroundColor: '#FFF',
            elevation: 0,
          },
          headerTintColor: '#333',
          headerTitleStyle: {
            alignSelf: 'flex-start',
            fontFamily: 'Tajawal-Bold',
          },
          headerRight: () => <View />,
          headerBackImage: () => (
            <Icon
              name="chevron-back"
              style={{marginLeft: 10}}
              color="#333"
              size={30}
            />
          ),
        }}
      />
      <Stack.Screen
        name="About"
        component={About}
        options={{
          title: 'عنا',
          headerStyle: {
            backgroundColor: '#333',
            elevation: 0,
          },
          headerTintColor: '#FFF',
          headerTitleStyle: {
            alignSelf: 'flex-start',
            fontFamily: 'Tajawal-Bold',
          },
          headerRight: () => <View />,
          headerBackImage: () => (
            <Icon
              name="chevron-back"
              style={{marginLeft: 10}}
              color="#FFF"
              size={30}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Privacy"
        component={Privacy}
        options={{
          title: 'الخصوصية',
          headerStyle: {
            backgroundColor: '#333',
            elevation: 0,
          },
          headerTintColor: '#FFF',
          headerTitleStyle: {
            alignSelf: 'flex-start',
            fontFamily: 'Tajawal-Bold',
          },
          headerRight: () => <View />,
          headerBackImage: () => (
            <Icon
              name="chevron-back"
              style={{marginLeft: 10}}
              color="#FFF"
              size={30}
            />
          ),
        }}
      />
      <Stack.Screen
        name="MyOrders"
        component={MyOrders}
        options={{
          title: 'حجوزاتي',
          headerStyle: {
            backgroundColor: '#FFF',
            elevation: 0,
          },
          headerTintColor: '#333',
          headerTitleStyle: {
            alignSelf: 'flex-start',
            fontFamily: 'Tajawal-Bold',
          },
          headerRight: () => <View />,
          headerBackImage: () => (
            <Icon
              name="chevron-back"
              style={{marginLeft: 10}}
              color="#333"
              size={30}
            />
          ),
        }}
      />
      <Stack.Screen
        name="DeliveryOrders"
        component={DeliveryOrders}
        options={{
          title: 'توصيلاتي',
          headerStyle: {
            backgroundColor: '#FFF',
            elevation: 0,
          },
          headerTintColor: '#333',
          headerTitleStyle: {
            alignSelf: 'flex-start',
            fontFamily: 'Tajawal-Bold',
          },
          headerRight: () => <View />,
          headerBackImage: () => (
            <Icon
              name="chevron-back"
              style={{marginLeft: 10}}
              color="#333"
              size={30}
            />
          ),
        }}
      />
      <Stack.Screen
        name="DeliveryLogin"
        component={DeliveryLogin}
        options={{
          title: 'دخول فتى التوصيل',
          headerStyle: {
            backgroundColor: '#FFF',
            elevation: 0,
          },
          headerTintColor: '#333',
          headerTitleStyle: {
            alignSelf: 'flex-start',
            fontFamily: 'Tajawal-Bold',
          },
          headerRight: () => <View />,
          headerBackImage: () => (
            <Icon
              name="chevron-back"
              style={{marginLeft: 10}}
              color="#333"
              size={30}
            />
          ),
        }}
      />
      <Stack.Screen
        name="ItemsList"
        component={ItemsList}
        options={{
          title: 'السلة',
          headerStyle: {
            backgroundColor: '#e57373',
            elevation: 0,
          },
          headerTintColor: '#e3e3e3',
          headerTitleStyle: {
            alignSelf: 'flex-start',
            fontFamily: 'Tajawal-Bold',
          },
          headerRight: () => <View />,
          headerBackImage: () => (
            <Icon
              name="chevron-back"
              style={{marginLeft: 10}}
              color="#e3e3e3"
              size={30}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Payment"
        component={Payment}
        options={{
          title: 'الدفع',
          headerStyle: {
            backgroundColor: '#e57373',
            elevation: 0,
          },
          headerTintColor: '#e3e3e3',
          headerTitleStyle: {
            alignSelf: 'flex-start',
            fontFamily: 'Tajawal-Bold',
          },
          headerRight: () => <View />,
          headerBackImage: () => (
            <Icon
              name="chevron-back"
              style={{marginLeft: 10}}
              color="#e3e3e3"
              size={30}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{
          title: 'حساب جديد',
          headerStyle: {
            backgroundColor: '#FFF',
            elevation: 0,
          },
          headerTintColor: '#333',
          headerTitleStyle: {
            alignSelf: 'flex-start',
            fontFamily: 'Tajawal-Bold',
          },
          headerRight: () => <View />,
          headerBackImage: () => (
            <Icon
              name="chevron-back"
              style={{marginLeft: 10}}
              color="#333"
              size={30}
            />
          ),
        }}
      />
      <Stack.Screen
        name="ForgetPassword"
        component={ForgetPassword}
        options={{
          title: 'نسيت كلمة المرور',
          headerStyle: {
            backgroundColor: '#FFF',
            elevation: 0,
          },
          headerTintColor: '#333',
          headerTitleStyle: {
            alignSelf: 'flex-start',
            fontFamily: 'Tajawal-Bold',
          },
          headerRight: () => <View />,
          headerBackImage: () => (
            <Icon
              name="chevron-back"
              style={{marginLeft: 10}}
              color="#333"
              size={30}
            />
          ),
        }}
      />
      <Stack.Screen
        name="ShowItem"
        component={ShowItem}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: '#FFF',
            elevation: 0,
          },
          headerTintColor: '#333',
          headerTitleStyle: {
            alignSelf: 'flex-start',
            fontFamily: 'Tajawal-Bold',
          },
          headerRight: () => <View />,
          headerBackImage: () => (
            <Icon
              name="chevron-back"
              style={{marginLeft: 10}}
              color="#333"
              size={30}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'حسابي الشخصي',
          headerStyle: {
            backgroundColor: '#333',
            elevation: 0,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            alignSelf: 'center',
          },
          headerRight: () => <View />,
          headerBackImage: () => (
            <Icon
              name="chevron-back-circle"
              style={{marginLeft: 10}}
              color="#FFF"
              size={30}
            />
          ),
        }}
      />
      <Stack.Screen
        name="MyFav"
        component={MyFav}
        options={{
          title: 'المفضلة',
          headerStyle: {
            backgroundColor: '#333',
            elevation: 0,
          },
          headerTintColor: '#FFF',
          headerTitleStyle: {
            alignSelf: 'flex-start',
            fontFamily: 'Tajawal-Bold',
          },
          headerRight: () => <View />,
          headerBackImage: () => (
            <Icon
              name="chevron-back"
              style={{marginLeft: 10}}
              color="#FFF"
              size={30}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function MainScreen() {
  return (
    <NavigationContainer>
      <Stacks />
    </NavigationContainer>
  );
}

export default MainScreen;
