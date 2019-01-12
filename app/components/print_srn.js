import React, { Component } from 'react';
import { View, Text, StyleSheet, AlertAndroid, Dimensions} from 'react-native';
import MenuBox from './parts/menu_box'
import Navi from './parts/navigation_btn'
import KeyPad from './parts/key_pad'
import  GenerateBtn  from './parts/generate_btns';
import { print_btn, connection_bar_bg } from '../../constants/colors';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import {
    setPrintQuantity,
    resetPrintQuantity,
    reducePrintQuantity,
    renameImage,
    pushLabelID
} from '../../actions/print_act'
import HeaderBar from './parts/header_bar'
import HoneyWell from '../../NativeModules'
import { LABEL_IMAGES_PATH } from '../../constants/action_type';
import { ScrollView } from 'react-native-gesture-handler';





class Print extends Component {
   

  state = {
      flexDirection: 'row',
      isColumn: false,

  }

  componentWillMount() {
    this.props.resetPrintQuantity()
    this.onLayoutChanged()
    //let labelIdList = this.props.printRedu.labelCheckList.map(label => label.id)
    let labelCheckList = this.props.printRedu.labelCheckList

    //check the image to make sure it's decode,
    if (!labelCheckList.includes(this.props.printRedu.currentItem.id)) {
        
        // Promise is used in DecodeImage 
        let DecodeImage = new Promise((resolve, reject) => {
            let index = parseInt(this.props.printRedu.currentItem.id)
            let filePath = LABEL_IMAGES_PATH + renameImage(this.props.printRedu.currentItem.name)
            HoneyWell.decodeImage(filePath, index, (MSG) => {
                console.log({MSG})
                resolve()
            })
        })
        // after decoding the image, labelID is pushed to labelCheckList.
        DecodeImage
            .then(() => {
                this.props.pushLabelID(this.props.printRedu.currentItem.id)
                console.log({id: this.props.printRedu.currentItem.id})
            })
        
    }
  }

  // responsive layout function 
  onLayoutChanged = () => {

    let deviceWidth = Dimensions.get("window").width
    console.log({deviceWidth})
    if (deviceWidth <= 800) {
        this.setState({flexDirection: 'column', isColumn: true})
    } else {
        this.setState({flexDirection: 'row', isColumn: false})
    }
  }
  
  render() {
    return (
      <View style={{flex: 1}} onLayout={this.onLayoutChanged}>
        <HeaderBar  navigate={this.props.navigation.replace} name='Main' img={require('../../assets/images/exit.png')} />
        <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
            <View style={[printSty.main, {flexDirection: this.state.flexDirection}]}>
                <View style={printSty.side}>
                    {
                        !this.state.isColumn ? 
                        <MenuBox 
                        name={this.props.printRedu.currentItem.name} 
                        image={this.props.printRedu.currentItem.image} 
                        active={true}/> : null
                    }
                
                </View>
                <View style={printSty.center}>
                    <KeyPad 
                        value={this.props.printRedu.printQuantity}
                        setPrintQuantity={this.props.setPrintQuantity}
                        reducePrintQuantity={this.props.reducePrintQuantity}
                        />
                </View>
                <View style={printSty.side}>
                    <GenerateBtn 
                        name={'Print'} 
                        image={require('../../assets/images/print_btn.png')}
                        color={print_btn} 
                        amount={this.props.printRedu.printQuantity} 
                        isConnected={this.props.connection.isConnected}
                        index={this.props.printRedu.currentItem.id}
                        resetPrintQuantity={this.props.resetPrintQuantity} />
                    {/* <GenerateBtn 
                        name={'Cancel'} 
                        image={require('../../assets/images/cancel.png')} 
                        color={connection_bar_bg} /> */}
                </View>
            </View>
            </ScrollView>
      </View>
    );
  }
}


const printSty = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'space-evenly',
       
    },
    side: {
        //flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 80,
    },
    center: {
        //flex: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 80,
    }
})

mapPropsToState = (state) => {
    return {
        printRedu: state.print_redu,
        connection: state.connection_redu
    }
}

mapActions = (dispatch) => {
    return bindActionCreators({
        setPrintQuantity,
        resetPrintQuantity,
        reducePrintQuantity,
        pushLabelID
    }, dispatch)
}

export default connect(mapPropsToState, mapActions)(Print)