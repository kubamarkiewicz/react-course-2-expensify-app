import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary.js';
import expenses from '../fixtures/expenses.js';

test('should render ExpensesSummary', () => {
	const wrapper = shallow(<ExpensesSummary expensesCount={12} expensesTotal={300} />)
	expect(wrapper).toMatchSnapshot();
});