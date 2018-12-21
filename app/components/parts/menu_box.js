
import React, { Component } from 'react'
import {
    TouchableOpacity,
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions
} from 'react-native'
import  { 
    connection_bar_bg,
    connection_text
} from '../../../constants/colors'
import {
    MYRIAD_REGULAR
} from '../../../constants/fonts'

const navigate = (setItem, item, navigator ) => {
    setItem(item)
    navigator('Print')
}

export default MenuBox = (props) => {
    //const [name, image] = props.item
    return (
        <TouchableOpacity activeOpacity={0.9} 
            style={menuSty.main} 
            disabled={props.active}
            onPress={() => navigate(props.setCurrentItem, props.item, props.navi )}>
                <View style={{flex: 4, justifyContent: 'center'}}>
                    <Image  resizeMode='contain' style={menuSty.img} source={props.image} />
                </View>
                <View style={{flex: 1}}>
                    <Text style={menuSty.text}>{props.name}</Text>
                </View>
        </TouchableOpacity>
    )
}

const menuSty = StyleSheet.create({
    main: {
        backgroundColor: connection_bar_bg,
        margin: 10,
        width: Dimensions.get('window').width / 4 - 20,
        height: 280,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        width: 180,
        margin: 10,
        height: 180,
    },
    text: {
        color: connection_text,
        fontFamily: MYRIAD_REGULAR,
        fontSize: 20
    },
    
})
