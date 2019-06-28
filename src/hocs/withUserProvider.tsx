import React from 'react';
import UserProvider from 'contexts/user';

export default function withUserProvider({ children }) {
    return (
        <UserProvider username="marko911">
            {children}
        </UserProvider>
    );

}
