import {combineReducers} from 'redux'
import connection_redu from './connection_redu';
import print_redu from './print_redu'


const allReducers = combineReducers({
    connection_redu,
    print_redu,
    
})

export default allReducers;