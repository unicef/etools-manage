import React, { useState, useEffect } from 'react';
import { compose, includes, filter, prop, toLower } from 'ramda';
import { Modals, useModalsDispatch } from 'contexts/page-modals';
import Box from 'components/box';

// import { onToggleAddModal } from 'actions';

import SectionsTable from 'components/sections-table';
import { useAppState } from 'contexts/app';
import SearchBar from 'components/search-bar';


// function ModalToggle() {
//     const dispatch = useModalsDispatch();
//     return <button onClick={() => onToggleAddModal()} >Open</button>;
// }


const Page: React.FunctionComponent = () => {

    const { sections } = useAppState();
    const [filteredSections, setFilteredSections] = useState([]);

    const handleSearch = (str: string) => {
        const matching = filter(compose(includes(str), toLower, prop('name')));
        setFilteredSections(matching(sections));
    };

    useEffect(() => {
        setFilteredSections(sections);
    }, [sections]);


    return (
        <Modals>
            {/* <ModalToggle/> */}
            <Box column>
                <SearchBar onChange={handleSearch} />
                <SectionsTable rows={filteredSections}/>
            </Box>
        </Modals>

    );
};

export default Page;
