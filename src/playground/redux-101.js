import { createStore } from 'redux';

// Action generators - functions that return action objects

const incrementCount = ({ incrementBy = 1 } = {}) => {
	return {
		type: 'INCREMENT',
		incrementBy
	}
}

const decrementCount = ({ decrementBy = 1} = {}) => {
	return {
		type: 'DECREMENT',
		decrementBy
	}
}

const resetCount = () => {
	return {
		type: 'RESET'
	}
}

const setCount = (count) => {
	return {
		type: 'SET',
		count
	}
}


// Reducers
// 1. Reducers are pure functions
// 2. Never change state or action

const countReducer = (state = { count: 0 }, action) => {
	switch (action.type) {
		case 'INCREMENT':
			return {
				count: state.count + action.incrementBy
			}
		case 'DECREMENT':
			return {
				count: state.count - action.decrementBy
			}
		case 'RESET':
			return {
				count: 0
			}
		case 'SET':
			return {
				count: action.count
			}
		default:
			return state;
	}
};



const store = createStore(countReducer);


store.subscribe(() => {
	console.log(store.getState());
});


store.dispatch(incrementCount({ incrementBy: 5 }));
store.dispatch(incrementCount());
store.dispatch(resetCount());
store.dispatch(decrementCount({ decrementBy: 10 }));
store.dispatch(setCount(101));