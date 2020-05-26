import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage'
import rootReducer from './reducer/rootReducers'
import logger from 'redux-logger'

const configureStore = () => {

    const persistConfig = {
        key: 'root',
        storage
    }

    const persistedReducer = persistReducer(persistConfig, rootReducer)

    let store = createStore(persistedReducer, applyMiddleware(thunk,logger))

    let persistor = persistStore(store)

    return { store, persistor }
}

export default configureStore;