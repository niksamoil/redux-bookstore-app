// export const BOOKS_LOADED = 'BOOKS_LOADED';

const iniatialState = {
    books: [],
    loading: true,
    error: null
}


const reducer = (state = iniatialState, action) => {

    switch(action.type) {
        case 'BOOKS_REQUESTED':
            return {
                books: [],
                loading: true,
                error: null
            }
        case 'BOOKS_LOADED':
            return {
                books: action.payload,
                loading: false,
                error: null
            };
        case 'BOOKS_ERROR':
            return {
                books: [],
                loading: false,
                error: action.payload
            }    
        default:
            return state ;   
    }
}



export default reducer;