import React, { useContext } from 'react';
import { UserContext } from 'contexts/user';
import Typography from '@material-ui/core/Typography';
import { Modals, useModalsDispatch } from 'contexts/page-modals';
import Box from 'components/box';

import { onToggleAddModal } from 'actions';

function ModalToggle() {
    const dispatch = useModalsDispatch();
    return <button onClick={() => dispatch(onToggleAddModal)} >Open</button>;
}
const Page: React.FunctionComponent = () => {

    const userData = useContext(UserContext);
    const prop2 = ['Item 1', 'Item 2'];
    return (
        <Modals>
            <ModalToggle/>
            <Box column>
                {userData && <section>
                    <Typography variant="h3" color="textSecondary">{userData.name} </Typography>
                    <Typography variant="body1">
                        {userData.bio}
                    </Typography>
                    <ul>
                        {prop2.map(
                            el => <li key={el}>{el}</li>
                        )}
                    </ul>
                </section> }

            </Box>
        </Modals>

    );
};

export default Page;
