import React, { useContext } from 'react';
import { PageOneProps } from '../types';
import { UserContext } from 'contexts/user';

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Box from 'components/box';

const Page: React.FunctionComponent = () => {

    const userData = useContext(UserContext);
    const prop2 = ['Item 1', 'Item 2'];
    return (
        <Box column>
            {userData && <section>
                <Typography variant="h3">{userData.name} </Typography>
                <Divider component="h1" />
                <Typography variant="body1">
                    {userData.bio}
                </Typography>
                <Typography variant="h5">
                    Props from redux store
                </Typography>
                <ul>
                    {prop2.map(
                        el => <li key={el}>{el}</li>
                    )}
                </ul>
            </section> }

        </Box>
    );
};

export default Page;
