import {
    SET_PRINT_QUANTITY,
    RESET_PRINT_QUANTITY,
    SET_CURRENT_ITEM
} from '../constants/action_type'

export const setPrintQuantity = (key) => {
    return {
        type: SET_PRINT_QUANTITY,
        key
    }
}

export const resetPrintQuantity = () => {
    return {
        type: RESET_PRINT_QUANTITY,
    }
}

export const setCurrentItem = (itemObj) => {
    //console.log('hello')
    return {
        type: SET_CURRENT_ITEM,
        itemObj
    }
}

