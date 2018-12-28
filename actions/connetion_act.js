//import Bluetooth from '../NativeModules'
import {
    GET_PAIRED_DEVICES,
    SET_CONNECTED_DEVICE,
    SET_CONNECTING_INDICATOR
} from '../constants/action_type'
import HoneyWell from '../NativeModules'

export const getPairedDevices = (devicesObj) =>  {
    //debugger;
    return {
        type: GET_PAIRED_DEVICES,
        devicesObj
    }
}

export const setConnectedDevice = (connectedDevice) =>  {
    //debugger;
    
    return dispatch => {
        dispatch({type: SET_CONNECTING_INDICATOR})
        setTimeout(() => {
            HoneyWell.connectToPrinter(connectedDevice.address, (conn) => {
                dispatch({type: SET_CONNECTED_DEVICE, connectedDevice})
            })
        }, 1000)
        
    }
}

export const setInitialDevice = () => {
    return {
        type: SET_INITIAL_DEVICE
    }
}