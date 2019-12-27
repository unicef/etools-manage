import React, { Suspense, lazy } from 'react';
import Box from 'components/box';
import { useSelector, useDispatch } from 'react-redux';
import { selectCloseSectionPayload, selectCurrentActiveSectionName } from 'selectors';
import { keys, prop } from 'ramda';
import { EntitiesAffected, Indicator, AllEntities } from 'entities/types';
import EntityChangesTable from 'components/entity-changes';
import EntityConfigMapping from 'entities/config-map';
import LoadingFallback from 'components/loading-fallback';
import { Button } from '@material-ui/core';
import { onSelectHideReview } from './actions';

const ConnectedConfirmButton = lazy(() => import('components/connected-submit-payload-button'));

const CloseSectionSummary: React.FC = () => {
    const closeSectionPayload = useSelector(selectCloseSectionPayload);
    const oldSectionName = useSelector(selectCurrentActiveSectionName);
    const dispatch = useDispatch();

    const onCancel = () => {
        onSelectHideReview(dispatch);
    };

    const ConfirmBox = () => (
        <Box align="center">
            <Button onClick={onCancel} variant="contained" size="medium">
                Back
            </Button>

            <Suspense fallback={<LoadingFallback />}>
                <ConnectedConfirmButton />
            </Suspense>
        </Box>
    );

    const getNewSections = (item: Exclude<AllEntities, Indicator>, sectionsProp: string) => {
        const entitySection = prop(sectionsProp, item);
        if (Array.isArray(entitySection)) {
            return entitySection.join(',');
        }

        return entitySection;
    };

    return (
        <Box column>
            {keys(closeSectionPayload).map((entity: keyof EntitiesAffected) => (
                <EntityChangesTable
                    key={entity as string}
                    // @ts-ignore
                    config={EntityConfigMapping[entity]}
                    getOldSections={() => oldSectionName}
                    getNewSections={getNewSections}
                    entity={closeSectionPayload[entity]}
                />
            ))}
            <Box justify="end">
                <ConfirmBox />
            </Box>
        </Box>
    );
};

export default CloseSectionSummary;
