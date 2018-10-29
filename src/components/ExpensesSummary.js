import React from 'react';
import { connect } from 'react-redux';
import getVisibleExpenses from '../selectors/expenses';
import getExpensesTotal from '../selectors/expenses-total.js';
import numeral from 'numeral';

export const ExpensesSummary = ({ expensesCount, expensesTotal }) => (
	<div>
		Viewing {expensesCount} expenses totalling {numeral(expensesTotal / 100).format('$0.00')}
	</div>
);



const mapStateToProps = (state) => {
	const expenses = getVisibleExpenses(state.expenses, state.filters);
	return {
		expensesCount: expenses.length,
		expensesTotal: getExpensesTotal(expenses),
	}
}

export default connect(mapStateToProps)(ExpensesSummary); 