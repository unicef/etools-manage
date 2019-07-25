import React, { useEffect, useState, useCallback } from 'react';
import { RouteComponentProps } from 'react-router';
import { useAppState, useAppService, useAppDispatch } from 'contexts/app';
import { onFetchModulesEntities, onEditModuleSections } from './actions';
import { ModuleEntitiesManager, DisplayDirector, Builders } from 'entities';
import Box from 'components/box';
import { keys, propEq, find, prop } from 'ramda';
import { ZippedEntityResults } from 'entities/types';
import { notEmpty } from 'utils/helpers';
import EntityConfigMapping from 'entities/config-map';
import { SummaryItemProps, CloseSectionsSummary } from './summary-container';

export interface CloseParams {id: string}

const CloseSummaryPage: React.FC<RouteComponentProps<CloseParams>> = ({ match, ...props }) => {
    const { id } = match.params;
    // const { state } = props.location;

    const {
        currentEntitiesData,
        // entityEditPage,
        sections
    } = useAppState();
    const dispatch = useAppDispatch();
    const {
        backendService,
        storageService
    } = useAppService();

    const director: DisplayDirector = new ModuleEntitiesManager();
    const [builders, setBuilders] = useState<Builders>(director.entityBuilders);

    const [modulesData, setModulesData] = useState<SummaryItemProps[]| undefined>();

    useEffect(() => {
        onFetchModulesEntities({ backendService, storageService }, id, dispatch);
    }, []);

    useEffect(() => {
        if (currentEntitiesData) {
            director.initialize(currentEntitiesData);
            setBuilders(director.entityBuilders);
        }
    }, [currentEntitiesData]);

    useEffect(() => {
        if (notEmpty(builders) && currentEntitiesData) {
            setModulesData(
                keys(currentEntitiesData).map(
                    (entityName: keyof ZippedEntityResults): SummaryItemProps => ({
                        name: EntityConfigMapping[entityName].moduleName,
                        itemsResolved: builders[entityName].numItemsResolved(currentEntitiesData[entityName], Number(id)),
                        onEdit: handleEdit(entityName)
                    })
                )
            );

        }
    }, [builders]);

    const handleEdit = (entityName: keyof ZippedEntityResults) => () => onEditModuleSections(entityName, dispatch);
    const closeSection = prop('name', find(propEq('id', Number(id)), sections));
    return (
        <div>
            HI, I found you {id && id},
            <Box column>
                {
                    modulesData ? <CloseSectionsSummary modulesData={modulesData} closingSection={closeSection}/> : null
                }

                {/* { currentEntitiesData && notEmpty(builders) ? keys(currentEntitiesData).map(
                    (entityName: keyof ZippedEntityResults) => {
                        const { Component } = builders[entityName];

                        return (
                            <Component
                                key={entityName}
                                onChange={() => console.log('onChange', entityName)}
                                list={currentEntitiesData[entityName]} />
                        );
                    }
                ) : null} */}
            </Box>
        </div>
    );
};

export default CloseSummaryPage;
