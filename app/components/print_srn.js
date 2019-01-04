import React, { Component } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import MenuBox from './parts/menu_box'
import Navi from './parts/navigation_btn'
import KeyPad from './parts/key_pad'
import  GenerateBtn  from './parts/generate_btns';
import { print_btn, connection_bar_bg } from '../../constants/colors';
import NavigationBtn from './parts/navigation_btn';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import {
    setPrintQuantity,
    resetPrintQuantity,
    reducePrintQuantity,
    renameImage,
    pushLabelObj
} from '../../actions/print_act'
import HeaderBar from './parts/header_bar'
import HoneyWell from '../../NativeModules'
import { LABEL_IMAGES_PATH } from '../../constants/action_type';





class Print extends Component {

  componentWillMount() {
    // let labelIdList = this.props.printRedu.labelCheckList.map(label => label.id)
    // let labelCheckList = this.props.printRedu.labelCheckList

    let filePath = renameImage(this.props.printRedu.currentItem.name)
    HoneyWell.decodeImage(filePath, (MSG) => {
        console.log({MSG})
        // resolve()
    })

    // check the image to make sure it's decode,
    // if (!labelIdList.includes(this.props.printRedu.currentItem.id)) {
    //     let DecodeImage = new Promise((resolve, reject) => {
    //         let filePath = LABEL_IMAGES_PATH + renameImage(this.props.printRedu.currentItem.name)
    //         HoneyWell.decodeImage(filePath, (MSG) => {
    //             console.log({MSG})
    //             resolve()
    //         })
    //     })
    //     DecodeImage
    //         .then(() => {
    //             let labelCheckObj = {id: this.props.printRedu.currentItem.id, labelCheckId: this.props.printRedu.counter}
    //             this.props.pushLabelObj(labelCheckObj)
    //         })
        
    // }
    // let labelCheckList = this.props.printRedu.labelCheckList
    // console.log({labelCheckList})
  }
  
  render() {
    return (
      <View style={{flex: 1}}>
        <HeaderBar  navigate={this.props.navigation.replace} name='Main' img={require('../../assets/images/exit.png')} />
            <View style={printSty.main}>
                <View style={printSty.side}>
                    <MenuBox 
                        name={this.props.printRedu.currentItem.name} 
                        image={this.props.printRedu.currentItem.image} 
                        active={true}/>
                    {/* <NavigationBtn navigate={this.props.navigation.replace} /> */}
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
                        //id='print'
                        id={this.props.printRedu.currentItem.id}
                        labelCheckList={this.props.printRedu.labelCheckList}
                        resetPrintQuantity={this.props.resetPrintQuantity} />
                    {/* <GenerateBtn 
                        name={'Cancel'} 
                        image={require('../../assets/images/cancel.png')} 
                        color={connection_bar_bg} /> */}
                </View>
            </View>
      </View>
    );
  }
}


const printSty = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: 'row',
    },
    side: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 80
        // backgroundColor: 'red'
    },
    center: {
        flex: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 80,
    }
})

mapPropsToState = (state) => {
    return {
        printRedu: state.print_redu
    }
}

mapActions = (dispatch) => {
    return bindActionCreators({
        setPrintQuantity,
        resetPrintQuantity,
        reducePrintQuantity,
        pushLabelObj
    }, dispatch)
}

export default connect(mapPropsToState, mapActions)(Print)