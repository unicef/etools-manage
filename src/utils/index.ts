import { StateSetter } from 'global-types';

export const setValueFromEvent: (setter: StateSetter) => (event: React.ChangeEvent<HTMLInputElement>) => void = setter => ({ target: { value } }) => setter(value);
