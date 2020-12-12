import React, { Component } from "react";
import BookListItem from "../book-list-item";
// import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import { withBookstoreService } from '../hoc';
import { booksLoaded, booksRequested, booksError } from '../../actions';
import { compose } from '../../utils';
import './book-list.css'
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

class BookList extends Component {

	componentDidMount() {
		// 1. receive data
		this.props.fetchBooks();

	}

	render() {
		const { books, loading, error } = this.props;
		if (loading) {
			return <Spinner />
		} 
		if(error) {
			return <ErrorIndicator />
		}

		return (
			<ul className='book-list' >
				{books.map((book) => {
					return (
						<li key={book.id}>
							<BookListItem book={book} />{" "}
						</li>
					);
				})}
			</ul>
		);
	}
}


//== Это функция определяет какие своиства получит компонент из Redux

const mapStateToProps = ({ books, loading, error }) => {
	return { books, loading, error };
};


// == Это фунцкия показывает какие именно действия хочет выполнить наш компонент


const mapDispatchToProps = (dispatch, ownProps) => {
	const { bookstoreService } = ownProps;
	return {
		fetchBooks: () => {
			console.log('feetching books');
			dispatch(booksRequested());
			bookstoreService.getBooks()
				.then((data) => dispatch(booksLoaded(data)) )
				.catch((err) => dispatch(booksError(err)));
		}
	}
}



//* After add compose from folder utils we can rewrite our export
export default compose(
	withBookstoreService(),
	connect(mapStateToProps, mapDispatchToProps)
)(BookList);


