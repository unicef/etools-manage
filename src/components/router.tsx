
import React from 'react';
import { Location } from 'history';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from 'pages/sections-main';
import MergeSummaryPage from 'pages/merge-summary';
import CloseSummaryPage from 'pages/close-section';
import SplitSectionPage from 'pages/split-section';
import { CLOSE_SECTION_PATH, SPLIT_SECTION_PATH } from 'global-constants';

// export type RouteProps = ReturnType<typeof Route>

export default function AppRouter() {
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/merge/" component={MergeSummaryPage} />
                <Route path={`${CLOSE_SECTION_PATH}:id?`}component={CloseSummaryPage} />
                <Route path={`${SPLIT_SECTION_PATH}:id?`} component={SplitSectionPage} />

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
