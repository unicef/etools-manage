
import React from 'react';
import { Location } from 'history';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from 'pages/sections-main';
import MergeSummaryPage from 'pages/merge-summary';


export default function AppRouter() {
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/merge/sections=:sections&newName=:newName" component={MergeSummaryPage} />
                <Route component={NoMatch} />
            </Switch>
        </Router>
    );
}


function NoMatch({ location }: {location: Location}) {
    return (
        <div>
            <h3>
          No match for <code>{location.pathname}</code>
            </h3>
        </div>
    );
}
