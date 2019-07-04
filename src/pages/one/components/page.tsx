import React, { useState } from 'react';
import { Modals, useModalsDispatch } from 'contexts/page-modals';
import Box from 'components/box';

// import { onToggleAddModal } from 'actions';
import SectionsTable from 'components/sections-table';
import { useAppState } from 'contexts/app';

// function ModalToggle() {
//     const dispatch = useModalsDispatch();
//     return <button onClick={() => dispatch(onToggleAddModal)} >Open</button>;
// }

const Page: React.FunctionComponent = () => {
    const [filteredSections, setFilteredSections] = useState(useAppState().sections);

    return (
        <Modals>
            {/* <ModalToggle/> */}
            <Box column>
                <SectionsTable rows={filteredSections}/>
            </Box>
        </Modals>

    );
};

export default Page;
