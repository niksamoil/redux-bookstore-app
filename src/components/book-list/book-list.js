import React, { Component } from "react";
import BookListItem from "../book-list-item";
// import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import { withBookstoreService } from '../hoc';
import { booksLoaded } from '../../actions';
import { compose } from '../../utils';
import './book-list.css'
import Spinner from '../spinner';

class BookList extends Component {

	componentDidMount() {
		// 1. receive data
		const { bookstoreService, booksLoaded } = this.props;
		bookstoreService.getBooks()
			.then((data) => booksLoaded(data) )

		// 2. dispatch action to store
		//! was changed
	}

	render() {
		const { books, loading } = this.props;
		if (loading) {
			return <Spinner />
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

const mapStateToProps = ({ books, loading }) => {
	return { books, loading };
};


// == Это фунцкия показывает какие именно действия хочет выполнить наш компонент
// const mapDispatchToProps = (dispatch) => {
	
 	// =! method with bindActionsCreators
// 	return bindActionCreators({
// 		booksLoaded
// 	}, dispatch );

// 	//! old method
// 	return {
// 		booksLoaded: (newBooks) => {
// 			dispatch(booksLoaded(newBooks));
// 		}
// 	}
	
// }

//* alternative method which send automat an object instead function
const mapDispatchToProps = {
	booksLoaded //* >> this object equal with bindActionsCreators above
};


// export default withBookstoreService()(
// 	connect(mapStateToProps, mapDispatchToProps)(BookList)
// );

//* After add compose from folder utils we can rewrite our export
export default compose(
	withBookstoreService(),
	connect(mapStateToProps, mapDispatchToProps)
)(BookList);


