// export const BOOKS_LOADED = 'BOOKS_LOADED';

const iniatialState = {
    books: []
}


const reducer = (state = iniatialState, action) => {

    switch(action.type) {
        case 'BOOKS_LOADED':
            return {
                books: action.payload
            };
        default:
            return state ;   
    }
}



export default reducer;