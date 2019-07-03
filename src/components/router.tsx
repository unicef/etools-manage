
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Main from 'pages/one';


export default function AppRouter() {
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <Route exact path="/" component={Main} />
        </Router>
    );
}
