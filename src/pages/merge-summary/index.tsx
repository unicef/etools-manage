import React, { useEffect } from 'react';
import { Typography } from '@material-ui/core';

import Box from 'components/box';
import { RouteProps } from 'components/router';
import { useAppService, useAppDispatch, useAppState } from 'contexts/app';
import { onFetchMergeSummary } from 'actions';


const MergeSummaryPage: React.FunctionComponent<RouteProps> = ({ match }) => {
    const { backendService: service } = useAppService();
    const dispatch = useAppDispatch();
    const { loading } = useAppState();
    console.log('TCL: loading', loading);

    const { sections, newName } = match.params;

    useEffect(() => {
        onFetchMergeSummary(service, sections, dispatch);
        // use params to call api for summary data
    }, []);

    return (
        <Box column>
            <Typography variant="h4">
                Confirm Merge
            </Typography>
            {/* Implement ui here */}
        </Box>
    );
};


export default MergeSummaryPage;
