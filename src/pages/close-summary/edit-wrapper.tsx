import React, { useEffect } from 'react';
import BackIcon from '@material-ui/icons/ArrowBack';
import Box from 'components/box';
import { IconButton, makeStyles, createStyles, Theme, Paper, Typography, Container } from '@material-ui/core';
import { onSetModuleEditingName } from 'slices/root-store';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        icon: {
            padding: 0,
            marginBottom: theme.spacing(2),
            '&:hover': {
                backgroundColor: 'inherit',
                color: theme.palette.getContrastText('#fff')
            }
        },
        content: {
            padding: theme.spacing(2)
        },
        title: {
            textTransform: 'uppercase',
            fontWeight: 500,
            fontSize: '0.875rem',
            lineHeight: '1rem'
        },
        heading: {
            padding: theme.spacing(2)
            // borderBottom: `1px solid ${theme.palette.divider}`
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
    const onClick = () => dispatch(onSetModuleEditingName(null));

    // reset the module editing name on unmount
    useEffect(
        () => () => {
            dispatch(onSetModuleEditingName(null));
        }, []
    );
    return (
        <Container maxWidth="lg" >
            <IconButton
                className={styles.icon}
                size="medium"
                onClick={onClick}>
                <BackIcon fontSize="large"/>
            </IconButton>
            <Paper >
                <Box className={styles.heading} justify="between">
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
