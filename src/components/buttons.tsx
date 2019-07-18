import React from 'react';
import { makeStyles, Theme, createStyles, Button } from '@material-ui/core';
import { amber } from '@material-ui/core/colors';


export const useButtonStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            margin: theme.spacing(1),
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
    onClick: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
    text: React.ReactNode;
}

export const ConfirmButton: React.FC<ConfirmBtnProps> = ({ onClick, text }) => {
    const styles = useButtonStyles();

    return (
        <Button onClick={onClick}
            color="secondary"
            variant="contained"
            className={styles.button}
        >
            {text}
        </Button>);
};
