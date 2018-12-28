/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, NativeModules} from 'react-native';
//import HoneyWell from './NativeModules';
import Setting from './app/components/setting_srn'
//import { getPairedDevices } from './actions/connetion_act'
import {
  Provider,
} from 'react-redux'
import {
  createStore,
  applyMiddleware
} from 'redux'
import allReducers from './reducers'
import {
  getPairedDevices
} from './actions/connetion_act'
import Main from './app/components/main_srn'
import Print from './app/components/print_srn'
import Route from './route'
import thunk from 'redux-thunk'
import HoneyWell from './NativeModules'

const store = createStore(allReducers, applyMiddleware(thunk))

export default class App extends Component {

  componentWillMount() {
    HoneyWell.decodeImage((val) => {
      console.log(val)
    })
  }


  render() {
    //console.log(store.getState())
    return (
      <Provider store={store}>
        <Route />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    //backgroundColor: '#F5FCFF',
  }
});

