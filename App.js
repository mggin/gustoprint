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
import RNFS from 'react-native-fs'
import  menuItems  from './constants/menu_items'
import {  LABEL_IMAGES_PATH, LABEL_IMAGES_FOLDER_PATH } from './constants/action_type';
import { renameImage } from './actions/print_act';



const store = createStore(allReducers, applyMiddleware(thunk))

export default class App extends Component {

  componentWillMount() {
    // HoneyWell.decodeImage(RNFS.DocumentDirectoryPath + '/roll.png', (val) => {
    //   console.log({val})
    // })
    RNFS.readDir(RNFS.ExternalDirectoryPath)
      .then((dirs) => {
        let dirsList = dirs.filter(dir => dir.isDirectory())
        if (dirsList.length == 0) {
            RNFS.mkdir(LABEL_IMAGES_PATH)
        } else {
          RNFS.exists(LABEL_IMAGES_FOLDER_PATH)
            .then((isFolderExist) => {
              // console.log({isFolderExist})
              if (isFolderExist) {
            
                menuItems.map(label => {
                  let fileName = renameImage(label.name)
                  // console.log({fileName})
                  let desPath = LABEL_IMAGES_PATH + fileName
                  let filePath = 'images/' + fileName
                  RNFS.existsAssets(filePath)
                    .then((isExist) => {
                        if (isExist) {
                          RNFS.copyFileAssets(filePath, desPath)
                        }
                    }) 
                })
              }
            })
        }    
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

