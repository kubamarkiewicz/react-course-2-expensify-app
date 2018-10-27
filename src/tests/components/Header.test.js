import React from 'react';
// import ReactShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';
import Header from '../../components/Header.js';


/*test('should render header', () => {
	const renderer = new ReactShallowRenderer();
	renderer.render(<Header />);
	expect(renderer.getRenderOutput()).toMatchSnapshot();
});*/

test('should render header', () => {
	const wrapper = shallow(<Header />);
	expect(wrapper).toMatchSnapshot();
});