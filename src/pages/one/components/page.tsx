import React, { useContext } from 'react';
import { PageOneProps } from '../types';
import { UserContext } from 'contexts/user';
import Typography from '@material-ui/core/Typography';

const Page: React.FunctionComponent<PageOneProps> = ({ hasBack, prop2 }) => {
    const userData = useContext(UserContext);
    return (
        <div>
            {hasBack && <button>back</button>}

            {userData && <section>
                <h2>{userData.name} </h2>
                <Typography variant="subheading">
                Bio
                </Typography>
                <Typography variant="body1">
                    {userData.bio}
                </Typography>
                <Typography variant="h5">
                    Props redux store sasd
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
