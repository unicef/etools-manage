import React, { useEffect } from 'react';
import { useAppDispatch } from 'contexts/app';
import BackIcon from '@material-ui/icons/ArrowBack';
import Box from 'components/box';
import { IconButton, makeStyles, createStyles, Theme, Paper, Typography } from '@material-ui/core';
import { onSetModuleEditingName } from 'slices/root-store';

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
}

const EditWrapper: React.FC<WrapperProps> = ({ children, title }) => {
    const dispatch = useAppDispatch();
    const styles = useStyles();
    const onClick = () => dispatch(onSetModuleEditingName(null));

    // reset the module editing name on unmount
    useEffect(() => () => dispatch(onSetModuleEditingName(null)), []);

    return (
        <div >
            <IconButton
                className={styles.icon}
                size="medium"
                onClick={onClick}>
                <BackIcon fontSize="large"/>
            </IconButton>
            <Paper >
                <Box className={styles.heading}>
                    <Typography className={styles.title} variant="subtitle1">{title} </Typography>
                </Box>

                <Box column className={styles.content}>
                    {children}
                </Box>
            </Paper>
        </div>
    );
};


export default EditWrapper;
