import React from 'react';
import './shopping-cart-table.css';

const ShoppingCartTable = () => {
    return (
        <div className='shopping-cart-table' >
            <h2>Your Order</h2>
            <table className="table">
                <thead>
                    <tr>
                        <td>#</td>
                        <td>Item</td>
                        <td>Count</td>
                        <td>Price</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Side Reability Engineering</td>
                        <td>2</td>
                        <td>40</td>
                        <td>
                            <button
                                className="btn btn-outline-danger btn-sm float-right">
                                <i className="fa fa-trash-o" />
                            </button>
                            <button
                                className="btn btn-outline-success btn-sm float-right">
                                <i className="fa fa-plus-circle" />
                            </button>
                            <button
                                className="btn btn-outline-warning btn-sm float-right">
                                <i className="fa fa-minus-circle" />
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className="total">
                Total: $201
            </div>
        </div>
    )
}

export default ShoppingCartTable; 