import React from 'react';
import Box from './box';
import { makeStyles, createStyles, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            left: 0,
            top: 0,
            width: '100vw',
            height: '100vh',
            position: 'fixed',
            backgroundColor: 'rgba(255,255,255,0.7)',
            transition: 'all 0.3s ease',
            zIndex: 100
        },
        text: {
            textTransform: 'uppercase',
            fontWeight: 500,
            fontSize: 18,
            marginTop: 10
        }
    })
);

export default function Loader() {
    const styles = useStyles({});
    return (
        <Box justify="center" align="center" className={styles.root} data-testid="loader-full">
            <Box column justify="center" align="center">
                <CircularProgress color="secondary" />
            </Box>
        </Box>
    );
}

export const Spinner = () => (
    <Box column justify="center" align="center">
        <CircularProgress color="secondary" />
    </Box>
);
