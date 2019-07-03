import React from 'react';
import { Modals, useModalsDispatch } from 'contexts/page-modals';
import Box from 'components/box';

// import { onToggleAddModal } from 'actions';
import SectionsTable from 'components/sections-table';

// function ModalToggle() {
//     const dispatch = useModalsDispatch();
//     return <button onClick={() => dispatch(onToggleAddModal)} >Open</button>;
// }

const Page: React.FunctionComponent = () => {

    return (
        <Modals>
            {/* <ModalToggle/> */}
            <Box column>
                <section>
                    <SectionsTable/>
                </section>
            </Box>
        </Modals>

    );
};

export default Page;
