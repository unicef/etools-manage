import React from 'react';
import { Container } from '@material-ui/core';
import { useSelector } from 'react-redux';
import CloseSectionSummary from './close-section-summary';

import { selectCloseSectionActionBar, selectViewCloseSummary } from 'selectors/ui';

import { ActionBarMapping } from './action-bar/config';
import { ModulesSummary, useModulesSummary } from './modules-summary';

export const CloseSectionPage: React.FC = () => {
    const { modulesData } = useModulesSummary();

    const actionBar = useSelector(selectCloseSectionActionBar);

    const viewCloseSummary = useSelector(selectViewCloseSummary);

    const ActionBar = ActionBarMapping[actionBar];

    return (
        <Container maxWidth="md">
            {ActionBar ? <ActionBar /> : null}
            {viewCloseSummary ? (
                <CloseSectionSummary />
            ) : (
                <ModulesSummary modulesData={modulesData} />
            )}
        </Container>
    );
};
