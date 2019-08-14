import React, { Suspense, lazy } from 'react';
import Box from 'components/box';
import { useSelector, useDispatch } from 'react-redux';
import { selectCloseSectionPayload, selectCurrentActiveSectionName, selectSections } from 'selectors';
import { keys, prop, propEq } from 'ramda';
import { ModuleEntities, IndicatorEntity, AllEntities } from 'entities/types';
import EntityChangesTable from 'components/entity-changes';
import EntityConfigMapping from 'entities/config-map';
import LoadingFallback from 'components/loading-fallback';
import { Button } from '@material-ui/core';
import { onSelectHideReview } from './actions';

const ConnectedConfirmButton = lazy(() => import('components/connected-submit-payload-button'));


const CloseSectionSummary: React.FC = () => {
    const closeSectionPayload = useSelector(selectCloseSectionPayload);
    const oldSectionName = useSelector(selectCurrentActiveSectionName);
    const sections = useSelector(selectSections);
    const dispatch = useDispatch();

    const onCancel = () => {
        onSelectHideReview(dispatch);
    };

    const ConfirmBox = () => (
        <Box align="center">
            <Button
                onClick={onCancel}
                variant="outlined"
                size="medium">Cancel</Button>

            <Suspense fallback={<LoadingFallback/>}>
                <ConnectedConfirmButton />
            </Suspense>
        </Box>
    );


    const getNewSections = (item: Exclude<AllEntities, IndicatorEntity>, sectionsProp: string) => {
        const entitySection = prop(sectionsProp, item);
        if (Array.isArray(entitySection)) {
            const entitySectionNames = entitySection.map(
                id => prop('name', sections.find(propEq('id', id)))
            );
            return entitySectionNames.join(',');
        }

        return prop('name', sections.find(propEq('id', entitySection)));
    };

    return (
        <Box column>
            <ConfirmBox />
            {keys(closeSectionPayload).map(
                (entity: keyof ModuleEntities) => (
                    <EntityChangesTable
                        key={entity as string}
                            // @ts-ignore
                        config={EntityConfigMapping[entity]} //TODO: fix this typing
                        getOldSections={() => oldSectionName}
                        getNewSections={getNewSections}
                        entity={closeSectionPayload[entity]}
                    />
                )
            )}
        </Box>
    );
};

export default CloseSectionSummary;
