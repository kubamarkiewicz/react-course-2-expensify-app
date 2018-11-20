import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { addExpense, startAddExpense, editExpense, removeExpense } from '../../actions/expenses.js';
import expenses from '../fixtures/expenses.js';
import database from '../../firebase/firebase.js';

const createMockStore = configureMockStore([thunk]);

test('should setup remove expense action object', () => {
	const action = removeExpense({ id: '123abc' });
	expect(action).toEqual({
		type: 'REMOVE_EXPENSE',
		id: '123abc'
	});
});

test('should setup edit expense action object', () => {
	const action = editExpense('123abc', { note: 'lalala' });
	expect(action).toEqual({
		type: 'EDIT_EXPENSE',
		id: '123abc',
		updates: { note: 'lalala' }
	});
});


test('should setup add expense action object with provided values', () => {
	const expenseData = expenses[2];
	const action = addExpense(expenseData);
	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: expenseData
	});
});


/*test('should setup add expense action object with default values', () => {
	const action = addExpense();
	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: {
			id: expect.any(String),
			description: '', 
			note: '', 
			amount: 0, 
			createdAt: 0
		}
	});
});*/


test('should setup add expense to database and store', (done) => {
	const store = createMockStore({});
	const expenseData = {
		description: 'Hello from testing suite',
		amount: 3000,
		note: 'hello',
		createdAt: 1000
	};

	store.dispatch(startAddExpense(expenseData)).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'ADD_EXPENSE',
			expense: {
				id: expect.any(String),
				...expenseData
			}
		});

		return database.ref('expenses/' + actions[0].expense.id).once('value');
	}).then((snapshot) => {
		expect(snapshot.val()).toEqual(expenseData);

		done();
	});

});

test('should setup add expense with defaults  to database and store', () => {
	const store = createMockStore({});
	const expenseData = {
		description: '', 
		note: '', 
		amount: 0, 
		createdAt: 0
	};

	store.dispatch(startAddExpense({})).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'ADD_EXPENSE',
			expense: {
				id: expect.any(String),
				...expenseData
			}
		});

		return database.ref('expenses/' + actions[0].expense.id).once('value');
	}).then((snapshot) => {
		expect(snapshot.val()).toEqual(expenseData);

		done();
	});
});