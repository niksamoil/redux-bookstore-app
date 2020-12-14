import { createStore, applyMiddleware } from 'redux';

import reducer from './reducers';


// middleware changes only dispatch method in object store, not all object (next === dispatch)
const logMiddleware = ({getState}) => (next) => (action) => {
    console.log(action.type, getState());
    return next(action);
};
// action - return new version of dispatch
// dispatch - get current dispatch from store
// store - used to get access to store's functions


const stringMiddleware = () => (next) => (action) => {
    if( typeof action === 'string') {
        return next({
            type: action
        });
    }

    return next(action);
}




const store = createStore(reducer, applyMiddleware(stringMiddleware, logMiddleware));


//testing stringEnhacer
store.dispatch('HELLO_WORLD');

export default store;