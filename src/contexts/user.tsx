import React from 'react';
import { useFetch } from '../lib/fetch';
import { User } from 'global-types';

export const UserContext = React.createContext<User>(null);

export default function UserProvider({ children }: {children: React.ReactElement }) {

    const { data, error } = useFetch(process.env.REACT_APP_USER_PROFILE_ENDPOINT);

    return (
        <UserContext.Provider value={data}>
            {children}
        </UserContext.Provider>);
}

