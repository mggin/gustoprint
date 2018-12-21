import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Main from './app/components/main_srn'
import Setting from './app/components/setting_srn'
import Print from './app/components/print_srn'

import { createAppContainer, createStackNavigator } from 'react-navigation'

const AppStackNavigator = createStackNavigator({
    Main: Main,
    Setting: Setting,
    Print: Print
},
{
    initialRouteName: "Main",
    headerMode: 'none'
    
})

const AppContainer = createAppContainer(AppStackNavigator)

export default class componentName extends Component {
  

  render() {
    return (
        <AppContainer />
    );
  }
}
