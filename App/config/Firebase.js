import React, {useState, useEffect, Component} from 'react';
import RNFetchBlob from 'rn-fetch-blob';
import {
  PermissionsAndroid,
  ToastAndroid,
  AlertIOS,
  Alert,
  Platform,
} from 'react-native';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';

export const firebaseConfig = {
  apiKey: 'AIzaSyDdnskEgUpZIJ_iAHyNayJZau8f0ilBcdU',
  databaseURL: 'talabat-1c532.firebaseapp.com',
  projectId: 'talabat-1c532',
  storageBucket: 'talabat-1c532.appspot.com',
  messagingSenderId: '416872381018',
  appId: '1:416872381018:web:9676c2b4a88d4e345cb663',
  measurementId: 'G-Y801P6LYLV',
};

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
  messaging().onNotificationOpenedApp(remoteMessage => {
    // Alert.alert(remoteMessage.ttl,remoteMessage.data)
    Alert.alert(
      remoteMessage.notification.title,
      remoteMessage.notification.body,
    );
  });

  messaging().getInitialNotification(remoteMessage => {
    // Alert.alert(remoteMessage.ttl,remoteMessage.data)
    Alert.alert(
      remoteMessage.notification.title,
      remoteMessage.notification.body,
    );
  });

  messaging().onMessage(remoteMessage => {
    // Alert.alert(remoteMessage.ttl,remoteMessage.data)
    Alert.alert(
      remoteMessage.notification.title,
      remoteMessage.notification.body,
    );
  });
}
