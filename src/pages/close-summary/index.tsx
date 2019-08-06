import React from 'react';
import { RouteComponentProps } from 'react-router';
import Box from 'components/box';
import { KeyToEntityMap } from 'entities/types';
import { CloseSectionsSummary } from './summary-container';
import InterventionsEdit from 'components/entity-edit/interventions-edit';
import TravelsEdit from 'components/entity-edit/travels-edit';
import ActionPointsEdit from 'components/entity-edit/action-points-edit';
import TPMActivitiesEdit from 'components/entity-edit/tpm-edit';
import { useSelector } from 'react-redux';
import { selectModuleEditingName } from 'selectors';

export interface CloseParams {id: string}

type ModuleKeys = keyof Omit<KeyToEntityMap, 'indicators'>

export type EditComponentMappings = {[key in ModuleKeys]: React.FC}

const EDIT_COMPONENT_MODULE_MAPPING: EditComponentMappings = {
    interventions: InterventionsEdit,
    travels: TravelsEdit,
    actionPoints: ActionPointsEdit,
    tpmActivities: TPMActivitiesEdit
};

function getEditComponent(name: keyof EditComponentMappings | null) {

    if (name) {
        return EDIT_COMPONENT_MODULE_MAPPING[name];
    }
    return null;
}

const CloseSummaryPage: React.FC<RouteComponentProps<CloseParams>> = ({ match }) => {
    const { id } = match.params;
    const moduleEditingName = useSelector(selectModuleEditingName);
    const EditComponent = getEditComponent(moduleEditingName);
    return (
        <Box column align="center">
            {
                moduleEditingName && EditComponent ? <EditComponent /> : <CloseSectionsSummary sectionId={id}/>

            }
        </Box>
    );
};


export default CloseSummaryPage;


