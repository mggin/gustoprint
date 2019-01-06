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
import { MENU_WIDTH } from '../../constants/layout';

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

    state = {
        numColumns: 4,
        margin: 0
    }

    componentWillMount() {
        setDeviceAddressToAsync({name: 'Printer- E Class Mark III', address: '00:17:AC:16:D7:72'})
       // getDeviceAddressFromAsync(this.props.setConnectedDevice)
       this.onLayoutChanged()
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
                margin={this.state.margin}
                active={false} />
        )

    }

    // calculate the exact margin for menu box
    calculateMargin = (deviceWidth, numColumns) => {
        let margin = ((deviceWidth - (MENU_WIDTH * numColumns) ) / numColumns) / 2.5
        console.log({margin})
        this.setState({
            numColumns,
            margin
        })
    }


    // this function change the number of Columns for Flatlist according to the Device width
    onLayoutChanged = () => {
        let deviceWidth = Dimensions.get("window").width
        if (deviceWidth <= 300) {
            this.calculateMargin(deviceWidth, 1)
        } else if (deviceWidth <= 500) {
            this.calculateMargin(deviceWidth, 2)
        } else if (deviceWidth <= 800) {
            this.calculateMargin(deviceWidth, 3)
        } else {
            this.calculateMargin(deviceWidth, 4)
        }  
    }
  

    render() {
        let naviIcon = require('../../assets/images/connected_red.png')
        if (this.props.connection.isConnected) {
            naviIcon = require('../../assets/images/connected_green.png')
        }

        return (
        <View style={{flex: 1}} onLayout={this.onLayoutChanged}>
        <HeaderBar 
            navigate={this.props.navigation.replace} 
            name='Setting'
            img={naviIcon}
            />
            <View style={{flex: 1, alignItems: 'center'}}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={MenuItems}
                renderItem={this._renderItem}
                key={this.state.numColumns}
                numColumns={this.state.numColumns}
                keyExtractor={(item) => item.name + 97}
            />
            </View>
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