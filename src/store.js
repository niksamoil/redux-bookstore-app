import { createStore, compose } from 'redux';

import reducer from './reducers';

// enhancer - imbunatațitor
const logEnhancer = (createStore) => (...args) => {
    const store = createStore(...args);
    const originalDispatch = store.dispatch;
    store.dispatch = (action) => {
        console.log(action.type);
        return originalDispatch(action);
    }

    return store;
};

const stringEnhancer = (createStore) => (...args) => {
    const store = createStore(...args);
    const originalDispatch = store.dispatch;
    store.dispatch = (action) => {

        //added 'string' support in dispatch
        if( typeof action === 'string') {
            return originalDispatch({
                type: action
            });
        }

        return originalDispatch(action);
    }

    return store;
};

const store = createStore(reducer, compose(stringEnhancer, logEnhancer));


//testing stringEnhacer
store.dispatch('HELLO_WORLD');

export default store;