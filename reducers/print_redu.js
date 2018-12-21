import {
    SET_PRINT_QUANTITY,
    RESET_PRINT_QUANTITY,
    SET_CURRENT_ITEM
} from '../constants/action_type'
const initState = { 
    printQuantity: '',
    currentItem: {}
}


export default function(state = initState, action) {
    //debugger;
    switch(action.type) {
        case SET_PRINT_QUANTITY:
            //console.log("call")
            return {
                ...state,
                printQuantity: state.printQuantity + action.key
            }
        case RESET_PRINT_QUANTITY:
            return {
                ...state,
                printQuantity: state.printQuantity.slice(0, -1)
            }
        case SET_CURRENT_ITEM: 
            //console.log(action.itemObj)
            return {
                ...state,
                currentItem: action.itemObj
            }
        default:
            return state
    }
    return state
}