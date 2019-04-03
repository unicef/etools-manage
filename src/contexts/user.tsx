import React, { useState, useContext } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useFetch } from '../lib/fetch';
import { GithubUser } from 'global-types';

export const UserContext = React.createContext<GithubUser>({ id: null, name: '', location: '', bio: '' });

export default function UserProvider({ username, children }) {
    const { fetching, data, error } = useFetch(`https://api.github.com/users/${username}`);

    return error ? (
        <Paper>
            <Typography component="p">There was an error loading the data for user: {username}</Typography>
            <pre>{JSON.stringify(error, null, 2)}</pre>
        </Paper>
    ) : fetching ? (
        <Typography component="p">Loading data for {username}  </Typography>) : (
        <UserContext.Provider value={data}>
            {children}
        </UserContext.Provider>
    );
}

