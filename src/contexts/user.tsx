import React from 'react';
import { useFetch } from '../lib/fetch';
import { User } from 'global-types';

export const UserContext = React.createContext<User>(null);

export default function UserProvider({ username, children }: {username: string; children: React.ReactElement }) {
    // method 1 for data fetching: using a hook inside react component,
    // good for smaller apps and top level context providers where data doesn't need to go to store

    const { data, error } = useFetch(`https://api.github.com/users/${username}`);
    console.log('TCL: UserProvider -> error', error);
    const value = data || {
        name: 'Markucho Offlineovic',
        bio: 'I do stuff on the computer'
    };
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>);
}

