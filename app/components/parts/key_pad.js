import React, { Component } from 'react';
import { 
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Image,
    TextInput
 } from 'react-native';
import { connection_bar_bg, connected_bg, descript_bg, connection_text, input_bg } from '../../../constants/colors';
import { CABIN_MEDIUM, MYRIAD_REGULAR, RIGHTEOUS } from '../../../constants/fonts';

 const keys = [ {"key": 1}, {"key": 2},
                {"key": 3}, {"key": 4},
                {"key": 5}, {"key": 6},
                {"key": 7}, {"key": 8},
                {"key": 9}, {"key": null},
                {"key": 0}, {"key": 'DEL', "image": require("../../../assets/images/delete_shield.png")}, ]

const renderKeys = (keyObj, props) => {
    let key = null
    if (keyObj.key == 'DEL') {
       return ( <TouchableOpacity style={keySty.main} onPress={() => props.resetPrintQuantity()}>
            <Image style={keySty.image} resizeMode="center" source={keyObj.image} />
        </TouchableOpacity>)
    } else if (keyObj.key == null) {
        return (
            <View style={[keySty.main, {backgroundColor: 'transparent', borderColor: 'transparent'}]}>

            </View>
        )
    } else {
        return (
            <TouchableOpacity style={keySty.main} onPress={() => props.setPrintQuantity(keyObj.key.toString())}>
                <Text style={keySty.text}> {keyObj.key} </Text>
            </TouchableOpacity>
         )
    }
}
 export default KeyPad = (props) => {
     
     return (
         <View style={{flex: 1}}>
         <View style={keySty.text_field}>
             <Text style={[keySty.text, {color: connection_bar_bg, marginRight: 5}]}>{props.value}</Text>
         </View>
         <View style={{height: 400}}>
         <FlatList

            data={keys}
            renderItem={({item}) => renderKeys(item, props)}
            numColumns={3}
            keyExtractor={(item) => item.key + 97}
            />

         </View>

         </View>
     )
   
 }

 const keySty = StyleSheet.create({
     main: {
         backgroundColor: connected_bg,
         borderRadius: 50, 
         width: 90,
         height: 90,
         borderColor: connection_bar_bg,
         borderWidth: 10,
         justifyContent: 'center',
         alignItems: 'center',
         margin: 5

     },
     text: {
         color: connection_text,
         fontSize: 30,
         fontFamily: RIGHTEOUS,
     },
     image: {
         width: 40,
         height: 40,
         marginRight: 5,
     },
     text_field: {
         backgroundColor: input_bg,
         //flex: 1,
         borderRadius: 5,
         width: 280,
         height: 70,
         margin: 5,
         justifyContent: 'center',
         alignItems: 'flex-end'
     },
     
 })