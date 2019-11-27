

import React from 'react';
import { render } from 'react-dom';

import App from './App';

const renderApp = (Component: React.FC, elementId: string = 'root'): void => {
    render(<Component />, document.getElementById(elementId));
};

renderApp(App);
