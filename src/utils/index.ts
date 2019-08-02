import { StateSetter } from 'global-types';
import { values, head, compose, keys, flip, prop } from 'ramda';

export const setValueFromEvent: (setter: StateSetter) => (event: React.ChangeEvent<HTMLInputElement>) => void = setter => ({ target: { value } }) => setter(value);
export const firstValue = compose(head, values);
export const firstKey = compose(head, keys);
export const lookup = flip(prop);
