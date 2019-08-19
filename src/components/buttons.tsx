import React from 'react';
import { makeStyles, Theme, createStyles, Button, IconButton } from '@material-ui/core';
import { amber } from '@material-ui/core/colors';
import BackIcon from '@material-ui/icons/ArrowBack';

import { withRouter } from 'react-router';
import { useIconButtonStyles } from './table/styles';
import { useDispatch } from 'react-redux';
import { onSuccessCloseSection } from 'reducers/closed-section-success';
import { refreshSectionsList } from 'actions/action-constants';


export const useButtonStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            marginLeft: theme.spacing(1),
            color: theme.palette.primary.main
        },
        btnConfirm: {
            backgroundColor: amber[500]
        },
        icon: {
            marginLeft: theme.spacing(1)
        }
    }));


export interface ConfirmBtnProps {
    onClick?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
    children: React.ReactNode;
    color?: 'inherit' | 'primary' | 'secondary' | 'default';
    disabled?: boolean;
}

export const ConfirmButton: React.FC<ConfirmBtnProps> = ({ onClick, color = 'secondary', children, ...props }) => {
    const styles = useButtonStyles();

    return (
        <Button onClick={onClick}
            color={color}
            variant="contained"
            className={styles.button}
            {...props}
        >
            {children}
        </Button>);
};


export const BackIconButton = withRouter(({ history }) => {
    const iconStyles = useIconButtonStyles();

    const handleClick = () => {
        history.push('/');
    };
    return (
        <IconButton
            className={iconStyles.icon}
            size="medium"
            onClick={handleClick}>
            <BackIcon fontSize="large"/>
        </IconButton>
    );
});


export const BackToMainButton = withRouter(({ history, children }) => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(refreshSectionsList());
        dispatch(onSuccessCloseSection(false));
        history.push('/');
    };
    return (
        <Button
            variant="outlined"
            size="medium"
            onClick={handleClick}>
            {children}
        </Button>
    );
});


