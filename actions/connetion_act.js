//import Bluetooth from '../NativeModules'
import {
    GET_PAIRED_DEVICES,
    SET_CONNECTED_DEVICE
} from '../constants/action_type'

export const getPairedDevices = (devicesObj) =>  {
    //debugger;
    return {
        type: GET_PAIRED_DEVICES,
        devicesObj
    }
}

export const setConnectedDevice = (connectedDevice) =>  {
    //debugger;
    
    return {
        type: SET_CONNECTED_DEVICE,
        connectedDevice
    }
}