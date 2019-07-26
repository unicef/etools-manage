import React from 'react';
import { ChildrenProps } from 'global-types';
import { useAppDispatch } from 'contexts/app';
import { onSetModuleEditingName } from './actions';
import BackIcon from '@material-ui/icons/Close';
import Box from 'components/box';
import { IconButton, makeStyles, createStyles, Theme, Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        icon: {
            padding: 0,
            '&:hover': {
                backgroundColor: 'inherit',
                color: theme.palette.getContrastText('#fff')
            }
        },
        paper: {
            padding: theme.spacing(2)
        },
        title: {
            textTransform: 'uppercase',
            fontWeight: 500,
            fontSize: '0.875rem'
        }
    })
);

interface WrapperProps {
    children: React.ReactNode;
    title: string;
}

const EditWrapper: React.FC<WrapperProps> = ({ children, title }) => {
    const dispatch = useAppDispatch();
    const styles = useStyles();
    const onClick = () => dispatch(onSetModuleEditingName(null));
    return (
        <Paper className={styles.paper} >
            <Box align="center" justify="between">
                <Typography className={styles.title} variant="subtitle1">{title} </Typography>
                <IconButton
                    className={styles.icon}
                    size="medium"
                    onClick={onClick}>
                    <BackIcon />
                </IconButton></Box>
            {children}
        </Paper>
    );
};


export default EditWrapper;
