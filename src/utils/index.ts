import { StateSetter } from 'global-types';
import { values, head, compose, curry, assoc, reduce, keys } from 'ramda';

export const setValueFromEvent: (setter: StateSetter) => (event: React.ChangeEvent<HTMLInputElement>) => void = setter => ({ target: { value } }) => setter(value);
export const firstValue = compose(head, values);
