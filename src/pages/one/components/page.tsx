import React, { useContext } from 'react';
import { Theme, makeStyles, useTheme } from '@material-ui/core/styles';
import { UserContext } from 'contexts/user';

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Box from 'components/box';


const useStyles = makeStyles(theme => ({
    title: {
        color: '#202124'
    }
}));

const Page: React.FunctionComponent = () => {

    const userData = useContext(UserContext);
    const prop2 = ['Item 1', 'Item 2'];
    const styles = useStyles();

    return (
        <Box column>
            {userData && <section>
                <Typography variant="h3" className={styles.title}>{userData.name} </Typography>
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
