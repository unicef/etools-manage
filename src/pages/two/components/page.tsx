import React, { useEffect } from 'react';
import { isEmpty } from 'ramda';
import Box from 'components/box';

export default function Page({ userData, userRepos, onInitFetch }) {
    useEffect(
        () => {
            onInitFetch();
        }, []
    );
    console.log('user', userData);
    console.log('repos', userRepos);

    return (
        <Box >
            {isEmpty(userData) || isEmpty(userRepos) ? <Loader/> :
                <Box>
                    {}
                </Box>
            }
            <h2>PAGE 2</h2>
        </Box>
    );
}
