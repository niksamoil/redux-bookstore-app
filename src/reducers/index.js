// export const BOOKS_LOADED = 'BOOKS_LOADED';

const iniatialState = {
    bookList: {
        books: [],
        loading: true,
        error: null,
    },
    shoppingCart: {
        cartItems: [],
        orderTotal: 0
    }
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

    const {bookList: {books}, shoppingCart: {cartItems}} = state;

    const book = books.find(({id}) => id === bookId);
    const itemIndex = cartItems.findIndex(({ id }) => id === bookId);
    const item = cartItems[itemIndex];

    const newItem = updateCartItem(book, item, quantity);

    return {
        orderTotal: 0,
        cartItems: updateCartItems(
            cartItems,
            newItem,
            itemIndex
        ),
    };
}

const updateBookList = (state, action) => {
    switch (action.type) {
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
            return state.bookList;    
    }
};

const updateShoppingCart = (state, action) => {
    switch (action.type) {
      
        case 'BOOK_ADDED_TO_CART':
            return updadeOrder(state, action.payload, 1);

        case 'BOOK_REMOVED_FROM_CART':
            return updadeOrder(state, action.payload, -1);

        case 'ALL_BOOKS_REMOVED_FROM_CART':
            const item = state.shoppingCart.cartItems.find(({id}) => id === action.payload);
            return updadeOrder(state, action.payload, -item.count);

        default:
            return state;
    }
}

const reducer = (state = iniatialState, action) => {
    switch (action.type) {
        case 'FETCH_BOOKS_REQUEST':
        case 'FETCH_BOOKS_SUCCES':
        case 'FETCH_BOOKS_FAILURE':
            return {
                ...state,
                bookList: updateBookList(state, action)
            }

        case 'BOOK_ADDED_TO_CART':
        case 'BOOK_REMOVED_FROM_CART':
        case 'ALL_BOOKS_REMOVED_FROM_CART':
            return {
                ...state,
                shoppingCart: updateShoppingCart(state, action)
            }

        default:
            return state    
    }
   
}



export default reducer;