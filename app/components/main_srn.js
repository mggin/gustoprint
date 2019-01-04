import React, { Component } from 'react';
import {
     View,
     Text,
     FlatList,
     Image,
     StyleSheet,
     Dimensions,
     TouchableOpacity,
     AsyncStorage,
} from 'react-native';
import {
    connection_bar_bg, connection_text, connected_bg, descript_bg
} from '../../constants/colors'
import MenuItems from '../../constants/menu_items'
import {  KAUSHAN_SCRIPT } from '../../constants/fonts';
import MenuBox from './parts/menu_box'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import {
    printSome,
    setCurrentItem,
    resetPrintQuantity,
    //setConnectedDevice
} from '../../actions/print_act'
import {
    getPairedDevices,
    setConnectedDevice
} from '../../actions/connetion_act'
import HoneyWell from '../../NativeModules'
import HeaderBar from './parts/header_bar'

const getDeviceAddressFromAsync = async (setConnectedDevice, isConnected) => {
    //console.log('getDeviceAddressFromAsync runs')
    try {
       const keys = ['@deviceName', '@deviceAddress']
       AsyncStorage.multiGet(keys)
           .then((valList) => {
               //console.log(valList)
               if (valList.every(val => val[1] !== null && !isConnected)) {
                   let deviceObj = {name: valList[0][1], address: valList[1][1]}
                   setConnectedDevice(deviceObj)
               } else {
                   //console.log('object is null')
               }
           })
    } catch(error) {
        //console.log()
    }
}


const setDeviceAddressToAsync = async (deviceObj) => {
    try {
       const deviceProperties = [['@deviceName', deviceObj.name], ['@deviceAddress', deviceObj.address]]
       await AsyncStorage.multiSet(deviceProperties)
       //console.log('setDevice')
    } catch(error) {
        //console.log('setDeviceAddressToAsync is error')
    }
} 
class Main extends Component {

    componentWillMount() {
        setDeviceAddressToAsync({name: 'Printer- E Class Mark III', address: '00:17:AC:16:D7:72'})
       // getDeviceAddressFromAsync(this.props.setConnectedDevice)
    }
    componentDidMount() {
        getDeviceAddressFromAsync(this.props.setConnectedDevice, this.props.connection.isConnected)  
    }
    

    _renderItem = ({item}) => {
        
        return (
            <MenuBox 
                name={item.name}
                image={item.image}
                key={item.name + 97} 
                setCurrentItem={this.props.setCurrentItem}
                item={item}
                navi={this.props.navigation.replace}
                active={false} />
        )

    }
  

    render() {
        let naviIcon = require('../../assets/images/connected_red.png')
        //getDeviceAddressFromAsync(this.props.setConnectedDevice)
        if (this.props.connection.isConnected) {
            naviIcon = require('../../assets/images/connected_green.png')
        }

        return (
        <View style={{flex: 1}}>
        <HeaderBar 
            navigate={this.props.navigation.replace} 
            name='Setting'
            img={naviIcon}
            />
            <FlatList
        // style={{flex: 1}}
                data={MenuItems}
                renderItem={this._renderItem}
                numColumns={4}
                keyExtractor={(item) => item.name + 97}
            />
        </View>
        );
    }
}




mapProps = (state) => {
    return {
        connection: state.connection_redu
    }
}

mapActions = (dispatch) => {
    return bindActionCreators({   
        setCurrentItem,
        getPairedDevices,
        setConnectedDevice

    }, dispatch)
}

export default connect(mapProps, mapActions)(Main)