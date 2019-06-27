import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useFetch } from '../lib/fetch';
import { User } from 'global-types';

export const UserContext = React.createContext<User>(null);

export default function UserProvider({ username, children }: {username: string; children: React.ReactElement }) {
    // method 1 for data fetching: using a hook inside react component,
    // good for smaller apps and top level context providers where data doesn't need to go to store

    const { fetching, data, error } = useFetch(`https://api.github.com/users/${username}`);

    return error ? (
        <Paper>
            <Typography component="p">There was an error loading the data for user: {username}</Typography>
            <pre>{JSON.stringify(error, null, 2)}</pre>
        </Paper>
    ) : fetching ? children :
        <UserContext.Provider value={data}>
            {children}
        </UserContext.Provider>;
}

