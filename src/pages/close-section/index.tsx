import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import Box from 'components/box';
import { CloseSectionPage } from './close-section-page';
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
import { EditComponentMappings, EditComponentKeys } from 'entities/types';
import { currentActiveSectionChanged } from 'slices/current-active-section';
import SuccessBox from 'components/success-box';
import EngagementEdit from 'components/entity-edit/engagement-edit';
import FMActivityEdit from 'components/entity-edit/fm-activity-edit';
import FMQuestionEdit from 'components/entity-edit/fm-question-edit';

const EDIT_COMPONENT_MODULE_MAPPING: EditComponentMappings = {
    interventions: InterventionsEdit,
    travels: TravelsEdit,
    actionPoints: ActionPointsEdit,
    tpmActivities: TPMActivitiesEdit,
    fmActivities: FMActivityEdit,
    fmQuestions: FMQuestionEdit,
    engagements: EngagementEdit
};

function getEditComponent(name: EditComponentKeys) {
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
                <CloseSectionPage />
            )}
        </Box>
    );
};

export default CloseSummaryPage;
