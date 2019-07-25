import React from 'react';
import { makeStyles, Theme, createStyles, Button } from '@material-ui/core';
import { amber } from '@material-ui/core/colors';


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
    onClick: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
    children: React.ReactNode;
    color?: 'inherit' | 'primary' | 'secondary' | 'default';
}

export const ConfirmButton: React.FC<ConfirmBtnProps> = ({ onClick, color = 'secondary', children }) => {
    const styles = useButtonStyles();

    return (
        <Button onClick={onClick}
            color={color}
            variant="contained"
            className={styles.button}
        >
            {children}
        </Button>);
};
