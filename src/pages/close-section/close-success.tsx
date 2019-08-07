import React from 'react';
import { Container, Paper, Typography } from '@material-ui/core';
import { useSummaryStyles } from './summary-styles';
import { useSelector } from 'react-redux';
import { selectCurrentActiveSection, selectSections } from 'selectors';
import { prop, propEq } from 'ramda';
import { BackToMainButton } from 'components/buttons';
import Box from 'components/box';


const CloseSectionSuccess: React.FC = () => {

    const styles = useSummaryStyles();
    const sections = useSelector(selectSections);
    const sectionId = useSelector(selectCurrentActiveSection);
    const sectionName = prop('name', sections.find(propEq('id', sectionId)));

    return (
        <Container maxWidth="md">
            <Paper>
                <Typography className={styles.infoMsg}>Section {sectionName} successfully closed. </Typography>
                <Box className={styles.itemSpacing} justify="center" >
                    <BackToMainButton >Close</BackToMainButton>
                </Box>
            </Paper>
        </Container>
    );
};

export default CloseSectionSuccess;
