import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import Box from 'components/box';
import { KeyToEntityMap } from 'entities/types';
import InterventionsEdit from 'components/entity-edit/interventions-edit';
import TravelsEdit from 'components/entity-edit/travels-edit';
import ActionPointsEdit from 'components/entity-edit/action-points-edit';
import TPMActivitiesEdit from 'components/entity-edit/tpm-edit';
import { useSelector, useDispatch } from 'react-redux';
import { selectModuleEditingName, selectClosedSectionSuccess } from 'selectors';
import { onFetchDataSplitSection } from './actions';
import { useAppService } from 'contexts/app';
import { selectUserProfile } from 'selectors/user';
import { MatchParams } from 'global-types';
import { CloseSectionRender } from 'pages/close-section';
import { onCurrentActiveSection } from 'reducers/current-active-section';
import { onResetCloseSectionPayload } from 'pages/close-section/actions';


const SplitSectionPage: React.FC<RouteComponentProps<MatchParams>> = ({ match }) => {

    const { id } = match.params;
    const dispatch = useDispatch();

    const {
        backendService,
        storageService
    } = useAppService();

    const user = useSelector(selectUserProfile);

    useEffect(() => {
        if (user) {
            dispatch(onCurrentActiveSection(Number(id)));

            const { name: countryName } = user.country;

            onResetCloseSectionPayload(dispatch);

            onFetchDataSplitSection(
                { backendService, storageService },
                { id, countryName },
                dispatch
            );
        }
    }, [id, user]);

    return <CloseSectionRender />;
};

export default SplitSectionPage;
