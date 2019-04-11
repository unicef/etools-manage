

import * as React from 'react';
import { render } from 'react-dom';
import createStore from './lib/create-store';

import App from './App';

const store = createStore();

const renderApp = (Component, elementId = 'root'): void => {
    render(<Component store={store}/>, document.getElementById(elementId));
};

renderApp(App);
