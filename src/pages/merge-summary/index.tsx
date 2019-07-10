import React, { useEffect } from 'react';
import { Typography } from '@material-ui/core';

import Box from 'components/box';
import { RouteProps } from 'components/router';


const MergeSummaryPage: React.FunctionComponent<RouteProps> = ({ match }) => {

    const { sections, newName } = match.params;

    useEffect(() => {
        // use params to call api for summary data
    }, []);

    return (
        <Box>
            <Typography variant="h4">
                Confirm Merge
            </Typography>
            {/* Implement ui here */}
        </Box>
    );
};


export default MergeSummaryPage;
