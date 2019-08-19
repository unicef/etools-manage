import React from 'react';
import { Container, Paper, Typography, makeStyles, Theme, createStyles } from '@material-ui/core';
import { BackToMainButton } from './buttons';
import Box from './box';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`
        },
        title: {
            fontWeight: 500
        },
        msg: {
            fontSize: '1rem'
        },
        boxItem: {
            marginBottom: theme.spacing(2)
        }

    })
);

export interface SuccessBoxProps {
    message: string;
    title: string;
}


const SuccessBox: React.FC<SuccessBoxProps> = ({ message, title }) => {
    const styles = useStyles();

    return (
        <Container maxWidth="md">
            <Paper className={styles.paper}>
                <Typography className={clsx(styles.title, styles.boxItem)} variant="h5" >{title}</Typography>

                <Typography className={clsx(styles.msg, styles.boxItem)}>
                    {message}
                </Typography>

                <Box justify="center" >
                    <BackToMainButton >Close</BackToMainButton>
                </Box>
            </Paper>
        </Container>);
};

export default SuccessBox;
