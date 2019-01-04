import React from 'react';

import { 
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
 } from 'react-native';
import { RIGHTEOUS } from '../../../constants/fonts';
import { connection_text } from '../../../constants/colors';
//import { prependOnceListener } from 'cluster';

import HoneyWell from '../../../NativeModules'

const dataWrite = (amount, reset, id, labelCheckList) => {
    reset()
    console.log({id})
    HoneyWell
        .printImage(parseInt(amount), 1, (printedText) => {
            console.log({printedText})
        })
    // labelCheckList.map((label) => {
    //     if (label.id == id) {
    //         let labelCheckId = parseInt(label.labelCheckId)
    //         console.log({labelCheckId})
    //         HoneyWell.printImage(parseInt(amount), labelCheckId, (printedText) => {
    //             console.log({printedText})
    //         })
    //     }
    // }) 
}
export default GenerateBtn = (props) => {
    return (
        <TouchableOpacity 
            style={[generateBtnSty.main, {backgroundColor: props.color}]}
            onPress={() => dataWrite(props.amount, props.resetPrintQuantity, props.id, props.labelCheckList)}>
            <Image style={generateBtnSty.image} source={props.image} />
            <Text style={generateBtnSty.text}>{props.name}</Text>
        </TouchableOpacity>
    )
}


const generateBtnSty = StyleSheet.create({
    main: {
        backgroundColor: 'red',
        flexDirection: 'row',
        width: 220,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        margin: 10,
        //padding: 10
    },
    image: {
        width: 50,
        height: 50,
    },
    text: {
        fontFamily: RIGHTEOUS,
        fontSize: 30,
        color: connection_text,
        marginLeft: 10
    }

})