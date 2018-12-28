import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Main from './app/components/main_srn'
import Setting from './app/components/setting_srn'
import Print from './app/components/print_srn'
import Camera from './app/components/camera'

import { createAppContainer, createStackNavigator } from 'react-navigation'

const AppStackNavigator = createStackNavigator({
    Main: Main,
    Setting: Setting,
    Print: Print,
    Camera: Camera
},
{
    initialRouteName: 'Main',
    headerMode: 'none'
    
})

const AppContainer = createAppContainer(AppStackNavigator)


async function requestStoragePermission() {
    // console.log('hello')
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          'title': 'Storage Permission',
          'message': 'Gusto Print needs the storage permission'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera")
      } else {
        console.log("Camera permission denied")
      }
    } catch (err) {
      console.warn(err)
    }
  }


export default class componentName extends Component {
  
    componentDidMount() {
        requestStoragePermission()
    }

  render() {
    // console.log('hello')
    
    return (
        <AppContainer />
    );
  }
}
