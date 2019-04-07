import React, { useEffect } from 'react';
import { isEmpty } from 'ramda';
import Box from 'components/box';

import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';


const useStyles = makeStyles({
    loader: {
        flex: 1
    },
    title: {
        margin: '0.8em 0'
    }

});


const Loader = (): JSX.Element => {
    const classes = useStyles();
    return (
        <Box align="center" justify="center" className={classes.loader}>
            <CircularProgress />
        </Box>
    );
};


export default function Page({ userData, userRepos, onInitFetch }) {
    // const classes = useStyles();
    useEffect(
        () => {
            onInitFetch();
        }, []
    );
    console.log('user', userData);
    console.log('repos', userRepos);

    return (
        <Box column>
            <Typography variant="h3">{`${userData.name}'s Repos`}</Typography>
            {isEmpty(userData) || isEmpty(userRepos) ? <Loader /> :
                <Box column>
                    {userRepos.map(repo => (
                        <Typography key={repo.name}>{repo.name}</Typography>
                    ))}
                </Box>
            }
        </Box>
    );
}
