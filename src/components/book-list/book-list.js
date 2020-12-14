import React, { Component } from "react";
import BookListItem from "../book-list-item";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import { withBookstoreService } from '../hoc';
import { fetchBooks, bookAddedToCart } from '../../actions';
import { compose } from '../../utils';
import './book-list.css'
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';


const BookList = ({ books, onAddedToCart }) => {
	return (
		<ul className='book-list' >
			{books.map((book) => {
				return (
					<li key={book.id}>
						<BookListItem book={book} 
						onAddedToCart={() => onAddedToCart(book.id)}/>
					</li>
				);
			})}
		</ul>
	);
}

class BookListContainer extends Component {

	componentDidMount() {
		// 1. receive data
		this.props.fetchBooks();

	}

	render() {
		const { books, loading, error, onAddedToCart } = this.props;
		if (loading) {
			return <Spinner />
		} 
		if(error) {
			return <ErrorIndicator />
		}

		return <BookList books={books} onAddedToCart={onAddedToCart} />
	}
}


//== Это функция определяет какие своиства получит компонент из Redux

const mapStateToProps = ({bookList: { books, loading, error }}) => {
	return { books, loading, error };
};


// == Это фунцкия показывает какие именно действия хочет выполнить наш компонент


const mapDispatchToProps = (dispatch, { bookstoreService }) => {
	return bindActionCreators ({
		fetchBooks: fetchBooks(bookstoreService),
		onAddedToCart: bookAddedToCart
	}, dispatch);
}



//* After add compose from folder utils we can rewrite our export
export default compose(
	withBookstoreService(),
	connect(mapStateToProps, mapDispatchToProps)
)(BookListContainer);


