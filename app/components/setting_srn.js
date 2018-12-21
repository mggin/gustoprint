import React, { Component } from 'react';
import { 
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image
  } from 'react-native';
import ConnectionBar from './parts/connection_bar'
import {
  descript_bg, connection_text, connected_bg
} from '../../constants/colors'
import { CABIN_MEDIUM } from '../../constants/fonts';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { 
  getPairedDevices,
  setConnectedDevice
} from '../../actions/connetion_act'
import  NavigationBtn from './parts/navigation_btn'
import HeaderBar from './parts/header_bar'

// Sample data which will received the data from system

class Setting extends Component {
  

  render() {
    return (
      <View style={{flex: 1}}>
        <HeaderBar />
        {/* <Description /> */}
          <View style={{flex: 1, flexDirection: "row"}}>
          <View style={{flex: 1.5}}>

            
            <ScrollView>
              {
                this.props.connection.devicesObj.map((deviceObj) => 
                  <ConnectionBar 
                    key={deviceObj.name + 97}
                    device={deviceObj}
                    setConnectedDevice={this.props.setConnectedDevice}
                     />
                ) 
              }
            </ScrollView>
            </View>
            <View style={{flex: 1}}>
              <ConnectedBar  device={this.props.connection.connectedDevice} />

            </View>
              
          </View>
          
          <NavigationBtn navigate={this.props.navigation.replace}/>
        
      </View>
    );
  }
}

const ConnectedBar = props => {
  return (
    <View style={connectSty.main}>
      <View style={connectSty.side}> 
      <Image  style={{width: 70,height: 70}} source={require('../../assets/images/print.png')}/>
      </View>
      <View style={connectSty.center}>
        <Text style={connectSty.text}>{props.device.name}</Text>
        <Text style={connectSty.text}>{props.device.address}</Text>

      </View>
      <View style={connectSty.side}>
        <Image  style={{width: 40,height: 40}} source={require('../../assets/images/connected.png')} />
      </View>
      
    </View>
  )
}

const connectSty = StyleSheet.create({
  main: {
    height: 100,
    margin: 5,
    display: "flex",
    flexDirection: "row",
    backgroundColor: connected_bg,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
    
  },
  side: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  center: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-start'

  },
  text: {
    fontSize: 20,
    fontFamily: CABIN_MEDIUM,
    color: connection_text
  }
})


const Description = () => {
  return (
    <View style={descriptSty.main}>
      <Text style={descriptSty.text}>PAIRED DEVICES</Text>
    </View>
  )
}

const descriptSty = StyleSheet.create({
  main: {
    marginVertical: 5,
    marginHorizontal: 10,
    width: 200,
    height: 50,
    borderRadius: 5,
    backgroundColor: descript_bg,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontFamily: CABIN_MEDIUM,
    fontSize: 20,
    color: connection_text,
  }
})


mapStateToProps = state => {
  return {
    connection: state.connection_redu
  }
}

mapDisptachToprops = dispatch => {
  return bindActionCreators({
    getPairedDevices,
    setConnectedDevice
  }, dispatch)
}

export default connect(mapStateToProps, mapDisptachToprops)(Setting)