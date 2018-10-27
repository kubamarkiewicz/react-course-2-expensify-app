import React from 'react';
import { shallow } from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm.js';
import expenses from '../fixtures/expenses.js';
import moment from 'moment';

test('should render ExpenseForm', () => {
	const wrapper = shallow(<ExpenseForm />);
	expect(wrapper).toMatchSnapshot();
});


test('should render ExpenseForm with data', () => {
	const wrapper = shallow(<ExpenseForm expense={expenses[0]} />);
	expect(wrapper).toMatchSnapshot();
});


test('should render en error for invalid submition', () => {
	const wrapper = shallow(<ExpenseForm />);
	expect(wrapper).toMatchSnapshot();
	wrapper.find('form').simulate('submit', { 
		preventDefault: () => {} 
	});
	expect(wrapper.state('error').length).toBeGreaterThan(0);
	expect(wrapper).toMatchSnapshot();
});


test('should change description on input change', () => {
	const value = 'new description';
	const wrapper = shallow(<ExpenseForm />);
	wrapper.find('input').at(0).simulate('change', { 
		target: { value } 
	});
	expect(wrapper.state('description')).toBe(value);
});


test('should change note on textarea change', () => {
	const value = 'new note';
	const wrapper = shallow(<ExpenseForm />);
	wrapper.find('textarea').at(0).simulate('change', { 
		target: { value } 
	});
	expect(wrapper.state('note')).toBe(value);
});


test('should set amount if valid input', () => {
	const value = '12.34';
	const wrapper = shallow(<ExpenseForm />);
	wrapper.find('input').at(1).simulate('change', { 
		target: { value } 
	});
	expect(wrapper.state('amount')).toBe(value);
});


test('should not set amount if invalid input', () => {
	const value = '12.345';
	const wrapper = shallow(<ExpenseForm />);
	wrapper.find('input').at(1).simulate('change', { 
		target: { value } 
	});
	expect(wrapper.state('amount')).toBe('');
});


test('should call onSubmit prop for valid form submission', () => {
	const onSubmitSpy = jest.fn();
	const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />);
	wrapper.find('form').simulate('submit', { 
		preventDefault: () => {} 
	});
	expect(wrapper.state('error')).toBe('');
	expect(onSubmitSpy).toHaveBeenCalledWith({
		description: expenses[0].description,
		note: expenses[0].note,
		amount: expenses[0].amount,
		createdAt: expenses[0].createdAt
	});
});


test('should set date on date change', () => {
	const now = moment();
	const wrapper = shallow(<ExpenseForm />);
	expect(wrapper).toMatchSnapshot();
	wrapper.find('withStyles(SingleDatePicker)').prop('onDateChange')(now);
	expect(wrapper.state('createdAt')).toEqual(now);
});


test('should set calendarFocused on focus', () => {
	const focused = true;
	const wrapper = shallow(<ExpenseForm />);
	wrapper.find('withStyles(SingleDatePicker)').prop('onFocusChange')({ focused });
	expect(wrapper.state('calendarFocused')).toBe(focused);
});