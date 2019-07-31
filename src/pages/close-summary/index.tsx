import React, { useEffect, useState, useCallback } from 'react';
import { RouteComponentProps } from 'react-router';
import { useAppState, useAppService, useAppDispatch } from 'contexts/app';
import { onFetchDataCloseSection, onEditModuleSections } from './actions';
import { ModuleEntitiesManager, DisplayDirector, Builders, EditProps, ValueOf } from 'entities';
import Box from 'components/box';
import { keys, propEq, find, prop } from 'ramda';
import { ZippedEntityResults, KeyToEntityMap, AllEntities, ModuleEntities, CloseSectionPayload } from 'entities/types';
import { notEmpty } from 'utils/helpers';
import EntityConfigMapping from 'entities/config-map';
import { SummaryItemProps, CloseSectionsSummary } from './summary-container';
import { firstValue } from 'utils';
import InterventionsEdit from 'components/entity-edit/interventions';
import TravelsEdit from 'components/entity-edit/travels';
import ActionPointsEdit from 'components/entity-edit/action-points';
import TPMActivitiesEdit from 'components/entity-edit/tpmActivities';
import { selectCloseSectionPayload } from 'selectors';

export interface CloseParams {id: string}

export type EditComponentMappings = {[key in keyof Omit<KeyToEntityMap, 'indicators'>]: React.FC<EditProps>}


const EDIT_COMPONENT_MODULE_MAPPING: EditComponentMappings = {
    interventions: InterventionsEdit,
    travels: TravelsEdit,
    actionPoints: ActionPointsEdit,
    tpmActivities: TPMActivitiesEdit
};


export const useClosePage = (id: string) => {

    const {
        // closeSectionPayload,
        moduleEditingName,
        sections
    } = useAppState();

    const closeSectionPayload = selectCloseSectionPayload(useAppState());
    console.log('TCL: useClosePage -> closeSectionPayload', closeSectionPayload);
    // const numResolved = getNumResolvedInterventions(useAppState());

    const dispatch = useAppDispatch();

    const {
        backendService,
        storageService
    } = useAppService();

    // const [director] = useState<DisplayDirector>(new ModuleEntitiesManager());
    // const [builders, setBuilders] = useState<Builders>(director.entityBuilders);
    const [modulesData, setModulesData] = useState<SummaryItemProps[]| undefined>();
    // const [closeSectionData, setCloseSectionData] = useState<ModuleEntities | undefined>();

    // const handleEdit = useCallback((entityName: keyof ModuleEntities) => () => {
    //     onEditModuleSections(entityName, dispatch);
    // }, []);

    useEffect(() => {
        onFetchDataCloseSection({ backendService, storageService }, id, dispatch);
    }, []);

    // useEffect(() => {
    //     if (closeSectionPayload) {
    //         setCloseSectionData(firstValue(closeSectionPayload));
    //         director.entitiesData = firstValue(closeSectionPayload);
    //         setBuilders(director.entityBuilders);
    //     }
    // }, [closeSectionPayload]);

    useEffect(() => {
        if (closeSectionPayload) {
            setModulesData(
                keys(closeSectionPayload).map(
                    (entityName: keyof ModuleEntities): SummaryItemProps => ({
                        name: entityName,
                        itemsResolved: '0/0',
                        onEdit: () => onEditModuleSections(entityName, dispatch)
                    })
                )
            );
        }
    }, [closeSectionPayload]);

    function getEditComponent(name: keyof EditComponentMappings | null): React.FC<EditProps>| null {
        if (name) {
            return EDIT_COMPONENT_MODULE_MAPPING[name];
        }

        return null;
    }

    return {
        // closeSectionData,
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
    const list = moduleEditingName && closeSectionPayload[moduleEditingName] || undefined;
    const EditComponent = getEditComponent(moduleEditingName);
    return modulesData && closeSectionPayload ? (
        <Box column>
            {
                moduleEditingName && EditComponent ?
                    <EditComponent
                        closeSectionPayloadKey={id}
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


