import React, { useState, useEffect } from 'react';
import { Modals, useModalsDispatch } from 'contexts/page-modals';
import Box from 'components/box';

// import { onToggleAddModal } from 'actions';
import SectionsTable from 'components/sections-table';
import { useAppState } from 'contexts/app';

// function ModalToggle() {
//     const dispatch = useModalsDispatch();
//     return <button onClick={() => onToggleAddModal()} >Open</button>;
// }


const Page: React.FunctionComponent = () => {
    const { sections } = useAppState();
    const [filteredSections, setFilteredSections] = useState([]);

    useEffect(() => {
        setFilteredSections(sections);
    }, [sections]);


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
