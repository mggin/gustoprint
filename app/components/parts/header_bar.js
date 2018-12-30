import React, { Component } from 'react';
import { 
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    AsyncStorage
 } from 'react-native';
 import {
     KAUSHAN_SCRIPT
 } from '../../../constants/fonts'

import { 
    connection_text,
    connected_bg
 } from '../../../constants/colors';





export default HeaderBar = props => {
    //getDeviceAddressFromAsync()
    return (
        <View style={headerSty.main}>
        <Text style={headerSty.text}>Gusto Print</Text>
            <TouchableOpacity style={headerSty.btn} onPress={() => props.navigate(props.name)}>
                <Image style={headerSty.img} source={props.img} />
                
            </TouchableOpacity>
            
            
        </View>
    )
}
const headerSty = StyleSheet.create({
    main: {
        backgroundColor: connected_bg,
        height: 90,
        flexDirection: "row",
        justifyContent: 'space-between',
        
        alignItems: 'center',
        //marginRight: 10,
    },
    btn: {
        //flex: 1,
        backgroundColor: 'white',
        borderRadius: 50,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 25,
        paddingVertical: 5,
        marginRight: 10,
    },
    img: {
        width: 40,
        height: 40,
    },
    text: {
        //flex: 1,
        marginLeft: 10,
    
        fontFamily: KAUSHAN_SCRIPT,
        fontSize: 30,
        color: connection_text
    }
})