import React, { useContext } from 'react';
import { PageOneProps } from '../types';
import { UserContext } from 'contexts/user';
import Typography from '@material-ui/core/Typography';

const Page: React.FunctionComponent<PageOneProps> = ({ prop2 }) => {
    const userData = useContext(UserContext);
    return (
        <div>

            {userData && <section>
                <Typography variant="h3">{userData.name} </Typography>
                <Typography variant="subtitle1">
                Bio
                </Typography>
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

        </div>
    );
};

export default Page;
