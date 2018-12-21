
import React, { Component } from 'react'
import {
    Image,
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import {
    connection_connect_btn
} from '../../../constants/colors'
import { Actions } from 'react-native-router-flux';

export default NavigationBtn = props => {
    return ( 
        <View style={styles.main} >
            <TouchableOpacity style={styles.touch_area} onPress={() => props.navigate('Main')}>
                <Image resizeMode="center" source={require('../../../assets/images/back_btn.png')}/>       
            </TouchableOpacity>   
        </View>
    )
}


const styles = StyleSheet.create({
    main: {
        height: 80,
        justifyContent: 'center',
        margin: 10,
        //alignItems: 'center'
    },
    touch_area: {
        width: 120,
        height: 70,
        borderRadius: 50,
        backgroundColor: connection_connect_btn,
        justifyContent: 'center',
        alignItems: 'center'
    }
})