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
import { selectModuleEditingName, selectClosedSectionSuccess } from 'selectors';
import CloseSectionSuccess from './close-success';
import { onResetCloseSectionPayload, onFetchDataCloseSection } from './actions';
import { useAppService } from 'contexts/app';
import { selectUserProfile } from 'selectors/user';
import { MatchParams } from 'global-types';
import { onCurrentActiveSection } from 'reducers/current-active-section';

type ModuleKeys = keyof Omit<KeyToEntityMap, 'indicators'>;

export type EditComponentMappings = { [key in ModuleKeys]: React.FC };

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

const CloseSummaryPage: React.FC<RouteComponentProps<MatchParams>> = ({
    match
}) => {
    const { id } = match.params;
    const dispatch = useDispatch();

    const { backendService, storageService } = useAppService();
    const user = useSelector(selectUserProfile);

    useEffect(() => {
        if (user) {
            dispatch(onCurrentActiveSection(Number(id)));

            const { name: countryName } = user.country;

            onResetCloseSectionPayload(dispatch);
            onFetchDataCloseSection(
                { backendService, storageService },
                { id, countryName },
                dispatch
            );
        }
    }, [id, user]);

    return <CloseSectionRender id={id}/>;
};

export const CloseSectionRender: React.FC<MatchParams> = ({ id }) => {
    const moduleEditingName = useSelector(selectModuleEditingName);
    const EditComponent = getEditComponent(moduleEditingName);
    const closedSectionSuccess = useSelector(selectClosedSectionSuccess);

    return (
        <Box column align="center">
            {moduleEditingName && EditComponent ? (
                <EditComponent />
            ) : closedSectionSuccess ? (
                <CloseSectionSuccess />
            ) : (
                <CloseSectionsPage />
            )}
        </Box>
    );
};

export default CloseSummaryPage;
