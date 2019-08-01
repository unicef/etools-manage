import React, { useEffect, useState, useCallback } from 'react';
import { RouteComponentProps } from 'react-router';
import { useAppState, useAppService, useAppDispatch } from 'contexts/app';
import { onFetchDataCloseSection, onEditModuleSections } from './actions';
import { EditProps } from 'entities';
import Box from 'components/box';
import { keys, propEq, find, prop } from 'ramda';
import { KeyToEntityMap, ModuleEntities } from 'entities/types';
import { SummaryItemProps, CloseSectionsSummary } from './summary-container';
import InterventionsEdit from 'components/entity-edit/interventions';
import TravelsEdit from 'components/entity-edit/travels';
import ActionPointsEdit from 'components/entity-edit/action-points';
import TPMActivitiesEdit from 'components/entity-edit/tpmActivities';
import { selectCloseSectionPayload } from 'selectors';
import EntityConfigMapping from 'entities/config-map';
import { selectNumItemsResolved } from 'selectors/num-items-resolved';

export interface CloseParams {id: string}

type ModuleKeys = keyof Omit<KeyToEntityMap, 'indicators'>

export type EditComponentMappings = {[key in ModuleKeys]: React.FC<EditProps<KeyToEntityMap[key]>>}

const EDIT_COMPONENT_MODULE_MAPPING: EditComponentMappings = {
    interventions: InterventionsEdit,
    travels: TravelsEdit,
    actionPoints: ActionPointsEdit,
    tpmActivities: TPMActivitiesEdit
};

export const useClosePage = (id: string) => {
    const state = useAppState();

    const {
        moduleEditingName,
        sections
    } = state;

    const closeSectionPayload = selectCloseSectionPayload(state);
    const numResolvedByModule = selectNumItemsResolved(state);

    const dispatch = useAppDispatch();

    const {
        backendService,
        storageService
    } = useAppService();

    const [modulesData, setModulesData] = useState<SummaryItemProps[]| undefined>();

    useEffect(() => {
        onFetchDataCloseSection({ backendService, storageService }, id, dispatch);
    }, []);

    useEffect(() => {
        if (closeSectionPayload) {
            setModulesData(
                keys(closeSectionPayload).map(
                    (entityName: keyof ModuleEntities): SummaryItemProps => ({
                        name: EntityConfigMapping[entityName].moduleName,
                        itemsResolved: numResolvedByModule[entityName],
                        onEdit: () => onEditModuleSections(entityName, dispatch)
                    })
                )
            );
        }
    }, [closeSectionPayload]);

    function getEditComponent(name: keyof EditComponentMappings | null) {

        if (name) {
            return EDIT_COMPONENT_MODULE_MAPPING[name];
        }
        return null;
    }

    return {
        closeSectionPayload,
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
        closeSectionPayload
    } = useClosePage(id);

    const closeSectionName = prop('name', find(propEq('id', Number(id)), sections));
    const list = moduleEditingName && closeSectionPayload[moduleEditingName];
    const EditComponent = getEditComponent(moduleEditingName);
    return modulesData && closeSectionPayload ? (
        <Box column align="center">
            {
                moduleEditingName && EditComponent ?
                    <EditComponent
                        closeSectionPayloadKey={id}
                        // @ts-ignore
                        list={list}
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


export default CloseSummaryPage;


