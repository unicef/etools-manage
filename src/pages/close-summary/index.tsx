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
import { firstValue } from 'utils';
import { selectCloseSectionPayload, selectModuleEditingName, selectSections } from 'selectors';
import { Typography } from '@material-ui/core';

if (process.env.NODE_ENV !== 'production') {
    const whyDidYouRender = require('@welldone-software/why-did-you-render');
    whyDidYouRender(React, {
        onlyLogs: true,
        titleColor: 'teal'
    });
}

export interface CloseParams {id: string}
const useStateSelectors = () => {

    const state = useAppState();

    return {
        closeSectionPayload: selectCloseSectionPayload(state),
        moduleEditingName: selectModuleEditingName(state) as keyof ZippedEntityResults,
        sections: selectSections(state)
    };
};

export const useClosePage = (id: string) => {

    const {
        closeSectionPayload,
        moduleEditingName,
        sections
    } = useStateSelectors();

    // const closeSectionPayload = selectCloseSectionPayload(useAppState());

    const dispatch = useAppDispatch();

    const {
        backendService,
        storageService
    } = useAppService();

    const [director] = useState<DisplayDirector>(new ModuleEntitiesManager());
    const [builders, setBuilders] = useState<Builders>(director.entityBuilders);
    const [modulesData, setModulesData] = useState<SummaryItemProps[]| undefined>();
    const [closeSectionData, setCloseSectionData] = useState<ZippedEntityResults | undefined>();

    const handleEdit = useCallback((entityName: keyof ZippedEntityResults) => () => {
        onEditModuleSections(entityName, dispatch);
    }, []);

    useEffect(() => {
        onFetchModulesEntities({ backendService, storageService }, id, dispatch);
    }, []);

    useEffect(() => {
        if (closeSectionPayload) {
            setCloseSectionData(firstValue(closeSectionPayload));
            director.entitiesData = firstValue(closeSectionPayload);
            setBuilders(director.entityBuilders);
        }
    }, [closeSectionPayload]);

    useEffect(() => {
        if (notEmpty(builders) && closeSectionData) {
            setModulesData(
                keys(closeSectionData).map(
                    (entityName: keyof ZippedEntityResults): SummaryItemProps => ({
                        name: EntityConfigMapping[entityName].moduleName,
                        itemsResolved: builders[entityName].numItemsResolved(closeSectionData[entityName], Number(id)),
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
        closeSectionData,
        modulesData,
        sections,
        moduleEditingName,
        getEditComponent
    };
};


const CloseSummaryPage: React.FC<RouteComponentProps<CloseParams>> = ({ match }) => {
    const { id } = match.params;
    const {
        modulesData,
        moduleEditingName,
        sections,
        getEditComponent,
        closeSectionData
    } = useClosePage(id);

    const closeSectionName = prop('name', find(propEq('id', Number(id)), sections));
    const EditComponent = getEditComponent(moduleEditingName);

    return modulesData && closeSectionData ? (
        <Box column>
            {
                moduleEditingName ?
                    <EditComponent
                        closeSectionPayloadKey={id}
                        list={closeSectionData[moduleEditingName]}
                    />
                    // <Typography>Check</Typography>
                    :
                    <CloseSectionsSummary
                        modulesData={modulesData}
                        closingSection={closeSectionName}
                    />
            }
        </Box>
    ) : null;

};

// @ts-ignore
CloseSummaryPage.whyDidYouRender = true;

export default CloseSummaryPage;


