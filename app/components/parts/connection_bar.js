import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    AsyncStorage
} from 'react-native'
import React, { Component } from 'react'
import { 
    connection_bar_bg,
    connection_text,
    connection_connect_btn,
} from '../../../constants/colors'
import {
    CABIN_MEDIUM
} from '../../../constants/fonts'
import HoneyWell from '../../../NativeModules'



TouchableOpacity.defaultProps = {
    activeOpacity: 0.7
}

const connectDevice = (setConnectedDevice, closeConnection, deviceObj, isConnected) => {
    //const args = 'arguments'
    let connectDevicePromise = new Promise((resolve, reject,) => {
        console.log({isConnected})
        if (isConnected) {
            closeConnection()
            console.log({isConnected})
        }
        setConnectedDevice(deviceObj)
        resolve()
    })
    connectDevicePromise.then(() => {
        setDeviceAddressToAsync(deviceObj)
        //console.log('setDeviceAddressToAsync')
    })
    
}


const setDeviceAddressToAsync = async (deviceObj) => {
    try {
       const deviceProperties = [['@deviceName', deviceObj.name], ['@deviceAddress', deviceObj.address]]
       await AsyncStorage.multiSet(deviceProperties)
       console.log('setDevice')
    } catch(error) {
        console.log('setDeviceAddressToAsync is error')
    }
} 

export default ConnectionBar = (props) => {
 let connectedBtn = 
    <TouchableOpacity 
        style={styles.connect_btn} 
        onPress={() => connectDevice(props.setConnectedDevice, props.closeConnection, props.device, props.isConnected)}>
         <Text style={styles.connect_text}>Connect</Text>
    </TouchableOpacity> 
 if (props.isConnecting) {
     connectedBtn = <ActivityIndicator size="large" color={connection_text} />
 } 
  return (
      <View style={styles.main}>
          <View style={styles.box_1}>
            <Text style={styles.textSty}>{props.device.name}</Text>
          {/* </View> */}
          {/* <View style={styles.boxes}> */}
            <Text style={styles.textSty}>{props.device.address}</Text>
          </View>
          <View style={styles.box_2}>
            {
                connectedBtn
            }
          </View>
      </View>
  )
};


const styles = StyleSheet.create({
    main: {
        borderRadius: 10,
        height: 100,
        flex: 1,
        flexDirection: "row",
        backgroundColor: connection_bar_bg,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
    },
    box_1: {
        flex: 1,
        marginLeft: 50,
        //justifyContent: 'center',
        //alignItems: 'center',
        //backgroundColor: 'blue'

    },
    box_2: {
        marginRight: 40,
    },
    textSty: {
        fontFamily: CABIN_MEDIUM,
        fontSize: 18,
        color: connection_text
    },
    connect_btn: {
        width: 100,
        height: 50,
        borderRadius: 50,
        backgroundColor: connection_connect_btn,
        alignItems: 'center',
        justifyContent: 'center',
    },
    connect_text: {
        fontFamily: CABIN_MEDIUM,
        fontSize: 18,
        padding: 10,
        color: connection_text
    }
})