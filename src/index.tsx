import * as React from 'react';
import { render } from 'react-dom';
import createStore from './lib/create-store';
import App from './App';

const store = createStore();

const renderApp = (Component, elementId = 'logojoy-root') => {
    render(<Component store={store}/>, document.getElementById(elementId));
};

renderApp(App);
const root = document.createElement('div');
document.body.appendChild(root);

render(<App />, root);
