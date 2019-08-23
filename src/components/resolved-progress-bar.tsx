import React, { memo } from 'react';
import Box from './box';
import { LinearProgress, Typography, makeStyles, Theme, createStyles } from '@material-ui/core';
import { lighten } from '@material-ui/core/styles';

const useProgressStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: 10,
            borderRadius: 8,
            backgroundColor: lighten(theme.palette.secondary.main, 0.5)
        },
        bar: {
            borderRadius: 20,
            backgroundColor: theme.palette.secondary.main
        },
        progressBar: {
            margin: `${theme.spacing(3)}px 0 ${theme.spacing(1)}px`
        }
    })
);

const ResolvedProgress: React.FC<{ progress: number }> = memo(({ progress }) => {
    const { progressBar, ...styles } = useProgressStyles();
    return (
        <Box column>
            <LinearProgress
                classes={{ ...styles }}
                className={progressBar}
                variant="determinate"
                color="secondary"
                value={progress}
            />
            <Typography align="center">Resolved items progress {progress}%</Typography>
        </Box>
    );
});

export default ResolvedProgress;
