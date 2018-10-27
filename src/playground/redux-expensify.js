import { createStore, combineReducers  } from 'redux';
import uuid from 'uuid';

// Actions:

// ADD_EXPENSE
const addExpense = ({ 
		description = '', 
		note = '', 
		amount = 0, 
		createdAt = 0
	} = {}) => ({
		type: 'ADD_EXPENSE',
		expense: {
			id: uuid(),
			description,
			note,
			amount,
			createdAt
		}
});

// EDIT_EXPENSE
const editExpense = (id, updates) => ({
	type: 'EDIT_EXPENSE',
	id,
	updates
});

// REMOVE_EXPENSE
const removeExpense = ({ id }) => ({
	type: 'REMOVE_EXPENSE',
	id
});

// SET_TEXT_FILTER
const setTextFilter = (text) => ({
	type: 'SET_TEXT_FILTER',
	text
});

// SORT_BY_DATE
const sortByDate = () => ({
	type: 'SORT_BY_DATE'
});

// SORT_BY_AMOUNT
const sortByAmount = () => ({
	type: 'SORT_BY_AMOUNT'
});

// SET_START_DATE
const setStartDate = (date) => ({
	type: 'SET_START_DATE',
	date
});

// SET_END_DATE
const setEndDate = (date) => ({
	type: 'SET_END_DATE',
	date
});



// Expense reducer

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
	switch (action.type) {
		case 'ADD_EXPENSE':
			return [...state, action.expense];
		case 'REMOVE_EXPENSE':
			return state.filter(({ id }) => id !== action.id);
		case 'EDIT_EXPENSE':
			return state.map((expense) => {
				if (expense.id === action.id) {
					return {
						...expense,
						...action.updates
					}
				} else {
					return expense;
				}
			});
		default:
			return state;
	}
};


// Filters Reducer

const filtersReducerDefaultState = {
	text: '',
	sortBy: 'date',
	startDate: undefined,
	endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
	switch (action.type) {
		case 'SET_TEXT_FILTER':
			return {
				...state,
				text: action.text
			}
		case 'SORT_BY_DATE':
			return {
				...state,
				sortBy: 'date'
			}
		case 'SORT_BY_AMOUNT':
			return {
				...state,
				sortBy: 'amount'
			}
		case 'SET_START_DATE':
			return {
				...state,
				startDate: action.date
			}
		case 'SET_END_DATE':
			return {
				...state,
				endDate: action.date
			}
		default:
			return state;
	}
};


// Get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
	return expenses.filter((expense) => {
		const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
		const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
		const textMatch = !text || expense.description.toLowerCase().includes(text.toLowerCase());

		return startDateMatch && endDateMatch && textMatch;
	}).sort((a, b) => {
		if (sortBy == 'date') {
			return a.createdAt < b.createdAt ? 1 : -1;
		}
		else if (sortBy == 'amount') {
			return a.amount < b.amount ? 1 : -1;
		}
	});
}




// Store creation

const store = createStore(
	combineReducers({
		expenses: expensesReducer,
		filters: filtersReducer
	})
);

store.subscribe(() => {
	const state = store.getState();
	const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
	console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 100, createdAt: -21000 }));
const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 30, createdAt: -1000 }));

// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 300 }));
// store.dispatch(removeExpense({ id: expenseOne.expense.id }));

// store.dispatch(setTextFilter('ee'));

store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(123));
// store.dispatch(setEndDate(1456));

// console.log(store.getState());


const demoState = {
	expenses: [
		{
			id: '1123',
			description: 'January rent',
			note: 'This is note',
			amount: 54500,
			createdAt: 0
		}
	],
	filters: {
		text: 'rent',
		sortBy: 'amount', // date or amount
		startDate: undefined,
		endDate: undefined
	}
}