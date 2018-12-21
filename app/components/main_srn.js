import React, { Component } from 'react';
import {
     View,
     Text,
     FlatList,
     Image,
     StyleSheet,
     Dimensions,
     TouchableOpacity
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
    resetPrintQuantity
} from '../../actions/print_act'
import {
    getPairedDevices
} from '../../actions/connetion_act'
import HoneyWell from '../../NativeModules'
import HeaderBar from './parts/header_bar'



class Main extends Component {

    componentDidMount() {
        HoneyWell.getPairedDevices(devices => {
            this.props.getPairedDevices(devices)
        })
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
        active={false}
         />
   )

}
  

  render() {

    return (
      <View style={{flex: 1}}>
      <HeaderBar navigate={this.props.navigation.replace}/>
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
    return state
}

mapActions = (dispatch) => {
    return bindActionCreators({   
        setCurrentItem,
        getPairedDevices
    }, dispatch)
}

export default connect(mapProps, mapActions)(Main)