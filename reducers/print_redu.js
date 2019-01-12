import {
    SET_PRINT_QUANTITY,
    RESET_PRINT_QUANTITY,
    REDUCE_PRINT_QUANTITY,
    SET_CURRENT_ITEM,
    PUSH_LABEL_INDEX
} from '../constants/action_type'
const initState = { 
    printQuantity: '',
    currentItem: {},
    labelCheckList: [],

}


export default function(state = initState, action) {
    //debugger;
    switch(action.type) {
        case SET_PRINT_QUANTITY:
            //console.log("call")
            if (state.printQuantity.length > 9) {
                return state
            } else {
                return {
                    ...state,
                    printQuantity: state.printQuantity + action.key
                }
            }
        case REDUCE_PRINT_QUANTITY:
            return {
                ...state,
                printQuantity: state.printQuantity.slice(0, -1)
            }
        case RESET_PRINT_QUANTITY:
            return {
                ...state,
                printQuantity: ''
            }
        case SET_CURRENT_ITEM: 
            //console.log(action.itemObj)
            return {
                ...state,
                currentItem: action.itemObj
            }
        case PUSH_LABEL_INDEX:
            //console.log(action.labelObj)
            let labelCheckList = state.labelCheckList
            labelCheckList.push(action.labelID)
            return {
                ...state,
                labelCheckList
            }
        default:
            return state
    }
    return state
}