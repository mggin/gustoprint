import {
    GET_PAIRED_DEVICES, SET_CONNECTED_DEVICE, SET_CONNECTING_INDICATOR,RESET_CONNECTION
} from '../constants/action_type'
const initState = { 
    devicesObj: [],
    connectedDevice: {},
    isConnecting: false,
    isConnected: false,
}


export default function(state = initState, action) {
    //debugger;
    switch(action.type) {
        
        case GET_PAIRED_DEVICES:
            console.log(action.devicesObj)
            return {
                ...state,
                devicesObj: action.devicesObj
            }
        case SET_CONNECTING_INDICATOR:
            return {
                ...state,
                isConnecting: true
            }
        case SET_CONNECTED_DEVICE: 
            return {
                ...state,
                isConnecting: false,
                isConnected: true,
                connectedDevice: action.connectedDevice
            }
        case RESET_CONNECTION: 
            return {
                ...state,
                isConnected: false,
                isConnecting: false
            }
        default:
            return state
    }
    return state
}