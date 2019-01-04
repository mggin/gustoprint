import {
    SET_PRINT_QUANTITY,
    RESET_PRINT_QUANTITY,
    REDUCE_PRINT_QUANTITY,
    SET_CURRENT_ITEM,
    PUSH_LABEL_OBJ
} from '../constants/action_type'

export const setPrintQuantity = (key) => {
    return {
        type: SET_PRINT_QUANTITY,
        key
    }
}

export const renameImage = (name) => {
    let regex = / /gi
    // console.log({name})
    return name.toLowerCase().replace(regex, '_') + ".png"
}

export const reducePrintQuantity = () => {
    return {
        type: REDUCE_PRINT_QUANTITY,
    }
}

export const resetPrintQuantity = () => {
    return {
        type: RESET_PRINT_QUANTITY
    }
}

export const setCurrentItem = (itemObj) => {
    //console.log('hello')
    return {
        type: SET_CURRENT_ITEM,
        itemObj
    }
}

export const pushLabelObj = (labelObj) => {
    return {
        type: PUSH_LABEL_OBJ,
        labelObj
    }
}

