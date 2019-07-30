import React, { useEffect, useState } from 'react';
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

if (process.env.NODE_ENV !== 'production') {
    const whyDidYouRender = require('@welldone-software/why-did-you-render');
    whyDidYouRender(React, {
        onlyLogs: true,
        titleColor: 'teal'
    });
}

export interface CloseParams {id: string}

export const useClosePage = (id: string) => {
    const {
        closeSectionPayload,
        moduleEditingName,
        sections
    } = useAppState();

    const dispatch = useAppDispatch();

    const {
        backendService,
        storageService
    } = useAppService();

    const [director] = useState<DisplayDirector>(new ModuleEntitiesManager());
    const [builders, setBuilders] = useState<Builders>(director.entityBuilders);
    const [modulesData, setModulesData] = useState<SummaryItemProps[]| undefined>();
    const [closeSectionData, setCloseSectionData] = useState<ZippedEntityResults | undefined>();

    const handleEdit = (entityName: keyof ZippedEntityResults) => () => {
        onEditModuleSections(entityName, dispatch);
    };

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

// useClosePage.whyDidYouRender = true;


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
// CloseSummaryPage.whyDidYouRender = true;

export default CloseSummaryPage;


