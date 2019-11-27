import React, { useEffect } from 'react';
import BackIcon from '@material-ui/icons/ArrowBack';
import Box from 'components/box';
import { IconButton, makeStyles, createStyles, Theme, Paper, Typography, Container } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useIconButtonStyles } from 'components/table/styles';
import { onSetModuleEditingName } from 'slices/module-editing-name';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        content: {
            padding: theme.spacing(2)
        },
        title: {
            textTransform: 'uppercase',
            fontWeight: 500,
            fontSize: '0.875rem',
            lineHeight: '1rem'
        },
        section: {
            marginBottom: theme.spacing(2)
        }

    })
);

interface WrapperProps {
    children: React.ReactNode;
    title: string;
    resolved: string;
}

const EditWrapper: React.FC<WrapperProps> = ({ children, title, resolved }) => {
    const dispatch = useDispatch();
    const styles = useStyles();
    const iconStyles = useIconButtonStyles();
    const onClick = () => dispatch(onSetModuleEditingName(null));

    // reset the module editing name on unmount
    useEffect(
        () => () => {
            dispatch(onSetModuleEditingName(null));
        }, []
    );
    return (
        <Container maxWidth="lg" >
            <Box className={styles.section}>
                <IconButton
                    className={iconStyles.icon}
                    size="medium"
                    onClick={onClick}>
                    <BackIcon fontSize="large"/>
                </IconButton></Box>
            <Paper >
                <Box className={styles.content} justify="between">
                    <Typography className={styles.title} variant="subtitle1">{title} </Typography>
                    <Typography color="textPrimary" variant="body2">Items resolved: {resolved}</Typography>

                </Box>

                <Box column className={styles.content}>
                    {children}
                </Box>
            </Paper>
        </Container>
    );
};


export default EditWrapper;
