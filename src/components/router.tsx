import React, { useEffect, useState } from 'react';
import { Location } from 'history';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
    RouteComponentProps,
    RouteProps
} from 'react-router-dom';
import Main from 'pages/sections-main';
import MergeSummaryPage from 'pages/merge-summary';
import CloseSummaryPage from 'pages/close-section';
import SplitSectionPage from 'pages/split-section';
import { CLOSE_SECTION_PATH, SPLIT_SECTION_PATH } from 'global-constants';
import { useAppService } from 'contexts/app';
import { useSelector } from 'react-redux';
import { selectUserProfile } from 'selectors/user';
import { getSplitSectionPrefixKey } from 'lib/sections';
import { NewSectionFromSplitPayload } from 'entities/types';
import { MatchParams } from 'global-types';

function NoMatch({ location }: { location: Location }) {
    return (
        <div>
            <h3>
                No match for <code>{location.pathname}</code>
            </h3>
        </div>
    );
}

export default function AppRouter() {
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/merge/" component={MergeSummaryPage} />
                <Route path={`${CLOSE_SECTION_PATH}:id?`} component={CloseSummaryPage} />
                <Route path={`${SPLIT_SECTION_PATH}:id?`} component={ProtectedRouteSplitSection} />
                <Route component={NoMatch} />
            </Switch>
        </Router>
    );
}

export function ProtectedRouteSplitSection(props: RouteComponentProps<MatchParams> & RouteProps) {
    const user = useSelector(selectUserProfile);
    const { id } = props.match.params;

    const { storageService } = useAppService();

    const [newNamesFromSplit, setNames] = useState<NewSectionFromSplitPayload[] | null>([]);

    useEffect(() => {
        if (user) {
            const { name: countryName } = user.country;
            const splitKey = getSplitSectionPrefixKey({ id, countryName });
            setNames(storageService.getStoredEntitiesData<NewSectionFromSplitPayload[]>(splitKey));
        }
    }, [user]);

    return newNamesFromSplit === null ? (
        <Redirect
            to={{
                pathname: '/',
                state: {
                    splitId: id
                }
            }}
        />
    ) : newNamesFromSplit && newNamesFromSplit.length ? (
        <SplitSectionPage {...props} />
    ) : null;
}
