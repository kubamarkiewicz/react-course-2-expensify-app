import React from 'react';
import ExpenseForm from './ExpenseForm.js';
import { connect } from 'react-redux';
import { addExpense } from '../actions/expenses.js';

export class AddExpensePage extends React.Component {
    addExpense = (expense) => {
        this.props.addExpense(expense);
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
				<h1>Add expense</h1>
				<ExpenseForm
					onSubmit={this.addExpense}
					/>
			</div>
        )
    }
}



const mapDispatchToProps = (dispatch) => ({
    addExpense: (expense) => dispatch(addExpense(expense))
});

export default connect(undefined, mapDispatchToProps)(AddExpensePage);