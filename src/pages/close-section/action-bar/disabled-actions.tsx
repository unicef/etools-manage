import React from 'react';
import { BackIconButton, useButtonStyles } from 'components/buttons';
import Box from 'components/box';
import { Button } from '@material-ui/core';
import CancelSectionActionButton from './cancel-button';
import { useSummaryStyles } from '../summary-styles';


function ActionBarDisabled() {
    const styles = useSummaryStyles();
    const btnStyles = useButtonStyles();
    return (
        <Box className={styles.section} justify="between">
            <BackIconButton />
            <Box>
                <CancelSectionActionButton />
                <Button variant="outlined" disabled className={btnStyles.button}>Confirm</Button>
            </Box>
        </Box>
    );
}

export default ActionBarDisabled;
