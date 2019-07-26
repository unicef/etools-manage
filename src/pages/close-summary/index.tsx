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

export const useClosePage = (id: string) => {
    const {
        currentInProgressEntitiesData,
        moduleEditingName,
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

    const handleEdit = (entityName: keyof ZippedEntityResults) => () => {

        onEditModuleSections(entityName, dispatch);
    };

    useEffect(() => {
        onFetchModulesEntities({ backendService, storageService }, id, dispatch);
    }, []);

    useEffect(() => {
        if (currentInProgressEntitiesData) {
            director.initialize(currentInProgressEntitiesData);
            setBuilders(director.entityBuilders);
        }
    }, [currentInProgressEntitiesData]);

    useEffect(() => {
        if (notEmpty(builders) && currentInProgressEntitiesData) {
            setModulesData(
                keys(currentInProgressEntitiesData).map(
                    (entityName: keyof ZippedEntityResults): SummaryItemProps => ({
                        name: EntityConfigMapping[entityName].moduleName,
                        itemsResolved: builders[entityName].numItemsResolved(currentInProgressEntitiesData[entityName], Number(id)),
                        onEdit: handleEdit(entityName)
                    })
                )
            );
        }
    }, [builders]);

    const getEditComponent = (name: keyof ZippedEntityResults | null) => {
        if (name) {
            return builders[name].Component;
        }

        return null;
    };

    return {
        currentInProgressEntitiesData,
        modulesData,
        sections,
        moduleEditingName,
        getEditComponent

    };

};


const CloseSummaryPage: React.FC<RouteComponentProps<CloseParams>> = ({ match, ...props }) => {
    const { id } = match.params;

    const {
        modulesData,
        moduleEditingName,
        sections,
        getEditComponent,
        currentInProgressEntitiesData
    } = useClosePage(id);


    const closeSectionName = prop('name', find(propEq('id', Number(id)), sections));
    const EditComponent = getEditComponent(moduleEditingName);

    return modulesData && currentInProgressEntitiesData ? (
        <Box column>
            {
                moduleEditingName ?
                    <EditComponent
                        list={currentInProgressEntitiesData[moduleEditingName]}
                    />
                    :
                    <CloseSectionsSummary
                        modulesData={modulesData}
                        closingSection={closeSectionName}
                    />
            }
        </Box>
    ) : null;

};

export default CloseSummaryPage;


