import React from 'react';
import { BackIconButton } from 'components/buttons';
import Box from 'components/box';
import { Button } from '@material-ui/core';
import { useSummaryStyles } from '../summary-styles';


export default function ActionBarDisabled() {
    const styles = useSummaryStyles();
    return (
        <Box className={styles.section} justify="between">
            <BackIconButton />
            <Button variant="outlined" disabled>Confirm</Button>
        </Box>
    );
}
