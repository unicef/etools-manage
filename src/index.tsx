

import * as React from 'react';
import { render } from 'react-dom';

import App from './App';


const renderApp = (Component, elementId = 'root'): void => {
    render(<Component />, document.getElementById(elementId));
};

renderApp(App);
