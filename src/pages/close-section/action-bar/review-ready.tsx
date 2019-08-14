import React from 'react';
import Box from 'components/box';
import { BackIconButton, ConfirmButton } from 'components/buttons';
import { useSummaryStyles } from '../summary-styles';
import { useDispatch } from 'react-redux';
import { onSelectShowReview } from '../actions';


export default function ActionBarReviewReady() {
    const dispatch = useDispatch();
    const styles = useSummaryStyles();

    const onClick = () => {
        onSelectShowReview(dispatch);
    };

    return (
        <Box className={styles.section} justify="between" align="center">
            <BackIconButton />
            <ConfirmButton onClick={onClick}>Review and Confirm</ConfirmButton>
        </Box>
    );

}
