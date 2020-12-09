// export const BOOKS_LOADED = 'BOOKS_LOADED';

const iniatialState = {
    books: [],
    loading: true
}


const reducer = (state = iniatialState, action) => {

    switch(action.type) {
        case 'BOOKS_LOADED':
            return {
                books: action.payload,
                loading: false
            };
        default:
            return state ;   
    }
}



export default reducer;