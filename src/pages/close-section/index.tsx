import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import Box from 'components/box';
import { KeyToEntityMap } from 'entities/types';
import { CloseSectionsPage } from './close-section-page';
import InterventionsEdit from 'components/entity-edit/interventions-edit';
import TravelsEdit from 'components/entity-edit/travels-edit';
import ActionPointsEdit from 'components/entity-edit/action-points-edit';
import TPMActivitiesEdit from 'components/entity-edit/tpm-edit';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectModuleEditingName,
    selectClosedSectionSuccess,
    selectCurrentActiveSectionName
} from 'selectors';
import { onFetchDataCloseSection } from './actions';
import { useAppService } from 'contexts/app';
import { selectUserProfile } from 'selectors/user';
import { MatchParams } from 'global-types';
import { currentActiveSectionChanged } from 'slices/current-active-section';
import SuccessBox from 'components/success-box';
import { updateCloseSectionPayload } from 'slices/close-section-payload';

type ModuleKeys = keyof Omit<KeyToEntityMap, 'indicators'>;

export type EditComponentMappings = { [key in ModuleKeys]: React.FC };

const EDIT_COMPONENT_MODULE_MAPPING: EditComponentMappings = {
    interventions: InterventionsEdit,
    travels: TravelsEdit,
    actionPoints: ActionPointsEdit,
    tpmActivities: TPMActivitiesEdit
};

function getEditComponent(name: keyof EditComponentMappings | '') {
    if (name) {
        return EDIT_COMPONENT_MODULE_MAPPING[name];
    }
    return null;
}

const CloseSummaryPage: React.FC<RouteComponentProps<MatchParams>> = ({ match }) => {
    const { id } = match.params;
    const dispatch = useDispatch();

    const { backendService, storageService } = useAppService();
    const user = useSelector(selectUserProfile);

    useEffect(() => {
        if (user) {
            dispatch(currentActiveSectionChanged(Number(id)));

            const { name: countryName } = user.country;

            dispatch(updateCloseSectionPayload(null));
            dispatch(
                onFetchDataCloseSection({ backendService, storageService }, { id, countryName })
            );
        }
    }, [id, user]);

    return <CloseSectionRender />;
};

export const CloseSectionRender: React.FC = () => {
    const moduleEditingName = useSelector(selectModuleEditingName);
    const EditComponent = getEditComponent(moduleEditingName);
    const closedSectionSuccess = useSelector(selectClosedSectionSuccess);
    const sectionName = useSelector(selectCurrentActiveSectionName);

    const successProps = {
        title: 'Success',
        message: `Section ${sectionName} successfully closed.`
    };

    return (
        <Box column align="center">
            {moduleEditingName && EditComponent ? (
                <EditComponent />
            ) : closedSectionSuccess ? (
                <SuccessBox {...successProps} />
            ) : (
                <CloseSectionsPage />
            )}
        </Box>
    );
};

export default CloseSummaryPage;
