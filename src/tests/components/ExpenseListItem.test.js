import React from 'react';
import { shallow } from 'enzyme';
import ExpenseListItem from '../../components/ExpenseListItem.js';
import expenses from '../fixtures/expenses.js';

test('should render ExpenseListItem with expense', () => {
	const wrapper = shallow(<ExpenseListItem {...expenses[0]} />)
	expect(wrapper).toMatchSnapshot();
});