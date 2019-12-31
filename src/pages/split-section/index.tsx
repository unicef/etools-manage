import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { onFetchDataSplitSection } from './actions';
import { useAppService } from 'contexts/app';
import { selectUserProfile } from 'selectors/user';
import { MatchParams } from 'global-types';
import { CloseSectionRender } from 'pages/close-section';
import { currentActiveSectionChanged } from 'slices/current-active-section';

const SplitSectionPage: React.FC<RouteComponentProps<MatchParams>> = ({ match }) => {
    const { id } = match.params;
    const dispatch = useDispatch();

    const { backendService, storageService } = useAppService();

    const user = useSelector(selectUserProfile);

    useEffect(() => {
        if (user) {
            dispatch(currentActiveSectionChanged(Number(id)));

            const { name: countryName } = user.country;

            dispatch(
                onFetchDataSplitSection({ backendService, storageService }, { id, countryName })
            );
        }
    }, [id, user]);

    return <CloseSectionRender />;
};

export default SplitSectionPage;
