import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
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



TouchableOpacity.defaultProps = {
    activeOpacity: 0.7
}

export default ConnectionBar = (props) => {
  return (
      <View style={styles.main}>
          <View style={styles.boxes}>
            <Text style={styles.textSty}>{props.device.name}</Text>
          </View>
          <View style={styles.boxes}>
            <Text style={styles.textSty}>{props.device.address}</Text>
          </View>
          <View style={styles.boxes}>
            <TouchableOpacity style={styles.connect_btn} onPress={() => props.setConnectedDevice(props.device)}>
                <Text style={styles.connect_text}>Connect</Text>

            </TouchableOpacity>
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
    boxes: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'

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