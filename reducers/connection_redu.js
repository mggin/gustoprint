import {
    GET_PAIRED_DEVICES, SET_CONNECTED_DEVICE
} from '../constants/action_type'
const initState = { 
    devicesObj: [],
    connectedDevice: {}
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
        case SET_CONNECTED_DEVICE: 
            return {
                ...state,
                connectedDevice: action.connectedDevice
            }
        default:
            return state
    }
    return state
}