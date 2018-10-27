import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage.js';
import expenses from '../fixtures/expenses.js';


let editExpense, removeExpense, history, wrapper;

beforeEach(() => {
	editExpense = jest.fn();
	removeExpense = jest.fn();
	history = { push: jest.fn() };
	wrapper = shallow(<EditExpensePage 
		editExpense={editExpense} 
		removeExpense={removeExpense} 
		history={history} 
		expense={expenses[1]}
	/>);
});


test('should render EditExpensePage', () => {
	expect(wrapper).toMatchSnapshot();
});


test('should handle EditExpense', () => {
	wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
	expect(history.push).toHaveBeenLastCalledWith('/');
	expect(editExpense).toHaveBeenLastCalledWith(expenses[1].id, expenses[1]);
});


test('should handle RemoveExpense', () => {
	wrapper.find('button').simulate('click');
	expect(history.push).toHaveBeenLastCalledWith('/');
	expect(removeExpense).toHaveBeenLastCalledWith({
		id: expenses[1].id
	});
});