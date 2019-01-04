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
  setConnectedDevice,
  closeConnection
} from '../../actions/connetion_act'
import  NavigationBtn from './parts/navigation_btn'
import HeaderBar from './parts/header_bar'

// Sample data which will received the data from system

const deviceObj = {name: 'Printer- E Class Mark III', address: '00:17:AC:16:D7:72'}
const deviceObj1 = {name: 'Printer- E ', address: '00:17:AC:16:D7:72'}

class Setting extends Component {
  

  render() {
    return (
      <View style={{flex: 1}}>
         <HeaderBar  navigate={this.props.navigation.replace} name='Main' img={require('../../assets/images/exit.png')} />
        {/* <Description /> */}
          <View style={{flex: 1, flexDirection: "row"}}>
          

            
            {/* <ScrollView showsVerticalScrollIndicator={false}>
              {
                this.props.connection.devicesObj.map((deviceObj) =>  */}
              
                  <ConnectionBar 
                    //key={deviceObj.name + 97}
                    device={deviceObj}
                    setConnectedDevice={this.props.setConnectedDevice}
                    closeConnection={this.props.closeConnection}
                    isConnecting={this.props.connection.isConnecting}
                    isConnected={this.props.connection.isConnected}
                  />
                
                 
                {/* ) 
              } 
            </ScrollView> */}
            
            <View style={{flex: 1}}>
              <ConnectedBar  device={this.props.connection.connectedDevice} isConnected={this.props.connection.isConnected} />

            </View>
              
          </View>
          
          {/* <NavigationBtn navigate={this.props.navigation.replace}/>
         */}
      </View>
    );
  }
}

const ConnectedBar = props => {
  let connectIcon = require('../../assets/images/connected.png')
  if (props.isConnected) {
    connectIcon = require('../../assets/images/connected_green.png')
  }
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
        <Image  style={{width: 40,height: 40}} source={connectIcon} />
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
    setConnectedDevice,
    closeConnection
  }, dispatch)
}

export default connect(mapStateToProps, mapDisptachToprops)(Setting)