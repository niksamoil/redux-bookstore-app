import React, { Component } from "react";
import BookListItem from "../book-list-item";
// import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import { withBookstoreService } from '../hoc';
import { booksLoaded } from '../../actions';
import { compose } from '../../utils';
import './book-list.css'

class BookList extends Component {

	componentDidMount() {
		// 1. receive data
		const { bookstoreService } = this.props;
		const data = bookstoreService.getBooks();
		console.log(data);

		// 2. dispatch action to store
		this.props.booksLoaded(data);
	}

	render() {
		const { books } = this.props;

		return (
			<ul>
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

const mapStateToProps = ({ books }) => {
	return { books };
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


