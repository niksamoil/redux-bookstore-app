// export const BOOKS_LOADED = 'BOOKS_LOADED';

const iniatialState = {
    books: [],
    loading: true,
    error: null
}


const reducer = (state = iniatialState, action) => {

    switch(action.type) {
        case 'FETCH_BOOKS_REQUEST':
            return {
                books: [],
                loading: true,
                error: null
            }
        case 'FETCH_BOOKS_SUCCES':
            return {
                books: action.payload,
                loading: false,
                error: null
            };
        case 'FETCH_BOOKS_FAILURE':
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