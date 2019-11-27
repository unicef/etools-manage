import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import sinon from 'sinon';
import SearchBar from '../index';

describe('SearchBar', () => {
    const stub = sinon.stub();
    test('renders', () => {
        render(<SearchBar onChange={stub} />);
    });

    test('mounts', () => {
        const { container } = render(<SearchBar onChange={stub} />);
        expect(container).toMatchSnapshot();
    });

    test('changes input value correctly', () => {
        const { getByTestId } = render(<SearchBar onChange={stub} />);
        const input = getByTestId('search');
        fireEvent.change(input, { target: { value: 'one' } });
        expect(input.value).toBe('one');
    });

    test('fires onChange when input changes', () => {
        const spy = sinon.spy();
        const { getByTestId } = render(<SearchBar onChange={spy} />);
        const input = getByTestId('search');
        fireEvent.change(input, { target: { value: 'spy212' } });
        expect(spy.calledOnce).toBe(true);
        expect(spy.getCall(0).args[0]).toBe('spy212');
    });
});
