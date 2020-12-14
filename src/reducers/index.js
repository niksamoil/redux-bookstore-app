// export const BOOKS_LOADED = 'BOOKS_LOADED';

const iniatialState = {
    books: [],
    loading: true,
    error: null,
    cartItems: [],
    orderTotal: 220
};
// == How to work with array in Redux
const updateCartItems = (cartItems, item, idx) => {

    //* delete from array
    if(item.count === 0) {
        return [
            ...cartItems.slice(0, idx),
            ...cartItems.slice(idx + 1)
        ];
    }

    //* add new elements in array
    if (idx === - 1) {
        return [
            ...cartItems,
            item
        ];
    }

    //* update current array
    return [
        ...cartItems.slice(0, idx),
        item,
        ...cartItems.slice(idx + 1)
    ];
}

const updateCartItem = (book, item = {}, quantity) => {

    const { id = book.id, count = 0, title = book.title, total = 0} = item;

   return {
       id,
       title, 
       count: count + quantity,
       total: total + quantity * book.price
   }
}

const updadeOrder = (state, bookId, quantity) => {

    const {books, cartItems} = state;
    const book = books.find(({id}) => id === bookId);
    const itemIndex = cartItems.findIndex(({ id }) => id === bookId);
    const item = cartItems[itemIndex];

    const newItem = updateCartItem(book, item, quantity);

    return {
        ...state,
        cartItems: updateCartItems(
            cartItems,
            newItem,
            itemIndex
        ),
    };
}


const reducer = (state = iniatialState, action) => {

    switch (action.type) {
        case 'FETCH_BOOKS_REQUEST':
            return {
                ...state,
                books: [],
                loading: true,
                error: null
            }
        case 'FETCH_BOOKS_SUCCES':
            return {
                ...state,
                books: action.payload,
                loading: false,
                error: null
            };
        case 'FETCH_BOOKS_FAILURE':
            return {
                ...state,
                books: [],
                loading: false,
                error: action.payload
            }
        case 'BOOK_ADDED_TO_CART':
            return updadeOrder(state, action.payload, 1);

        case 'BOOK_REMOVED_FROM_CART':
            return updadeOrder(state, action.payload, -1);

        case 'ALL_BOOKS_REMOVED_FROM_CART':
            const item = state.cartItems.find(({id}) => id === action.payload);
            return updadeOrder(state, action.payload, -item.count);

        default:
            return state;
    }
}



export default reducer;