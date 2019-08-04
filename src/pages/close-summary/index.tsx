import React, { useEffect, useState, useCallback, useRef } from 'react';
import { RouteComponentProps } from 'react-router';
import { useAppService } from 'contexts/app';
import Box from 'components/box';
import { KeyToEntityMap, ModuleEntities } from 'entities/types';
import { SummaryItemProps, CloseSectionsSummary } from './summary-container';
import InterventionsEdit from 'components/entity-edit/interventions-edit';
import TravelsEdit from 'components/entity-edit/travels';
import ActionPointsEdit from 'components/entity-edit/action-points';
import TPMActivitiesEdit from 'components/entity-edit/tpmActivities';
import { useSelector } from 'react-redux';
import { selectModuleEditingName } from 'selectors';

if (process.env.NODE_ENV !== 'production') {
    const whyDidYouRender = require('@welldone-software/why-did-you-render');
    whyDidYouRender(React, {
        onlyLogs: true,
        titleColor: 'teal'
    });
}


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

// @ts-ignore
CloseSummaryPage.whyDidYouRender = true;


export default CloseSummaryPage;


