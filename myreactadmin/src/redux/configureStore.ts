import {legacy_createStore as createStore} from 'redux'
import setUserReducer from './reducers/setUserReducer'

const configureStore = () => {
    return createStore(setUserReducer);
}

export default configureStore;