import moment from 'moment';
import expensesReducer from '../../reducers/expenses.js';
import expenses from '../fixtures/expenses.js';


test('should set default state', () => {
	const state = expensesReducer(undefined, { type: '@@INIT' });
	expect(state).toEqual([]);
});


test('should remove expense by id', () => {
	const action = {
		type: 'REMOVE_EXPENSE',
		id: expenses[1].id
	};
	const state = expensesReducer(expenses, action); 
	expect(state).toEqual([
		expenses[0],
		expenses[2]
	]);
});


test('should not remove expense if id not found', () => {
	const action = {
		type: 'REMOVE_EXPENSE',
		id: -1
	};
	const state = expensesReducer(expenses, action); 
	expect(state).toEqual(expenses);
});


test('should add an expense', () => {
	const expense = {
		id: '123',
		description: 'New',
		note: 'hello',
		amount: 100,
		createdAt: 123
	};
	const action = {
		type: 'ADD_EXPENSE',
		expense
	};
	const state = expensesReducer(expenses, action);
	expect(state).toEqual([
		...expenses,
		expense
	]);
});


test('should edit an expense', () => {
	const id = expenses[1].id
	const amount = 444;
	const action = {
		type: 'EDIT_EXPENSE',
		id,
		updates: { amount }
	};
	const state = expensesReducer(expenses, action);
	expect(state[1].amount).toBe(amount);
});


test('should not edit an expense if expense not found', () => {
	const id = -100
	const updates = {
		description: 'Rentooo',
		note: 'ooo',
		amount: 666,
		createdAt: -321
	}
	const action = {
		type: 'EDIT_EXPENSE',
		id,
		updates
	}
	const state = expensesReducer(expenses, action);
	expect(state).toEqual(expenses);
});