import React, { useState, useEffect } from 'react';
import { compose, includes, filter, prop, toLower } from 'ramda';
import { Modals } from 'contexts/page-modals';
import Box from 'components/box';

// import { onToggleAddModal } from 'actions';

import SectionsTable from 'components/sections-table';
import { useAppState } from 'contexts/app';
import SearchBar from 'components/search-bar';
import { MergeButton, ConfirmMergeButton } from 'components/controls';


const Page: React.FunctionComponent = () => {

    const { sections } = useAppState();

    const [filteredSections, setFilteredSections] = useState([]);
    const [mergeActive, setMergeActive] = useState<boolean>(false);
    const [selected, setSelected] = useState([]);

    const handleSearch = (str: string) => {
        const matching = filter(compose(includes(str), toLower, prop('name')));
        setFilteredSections(matching(sections));
    };

    const handleToggleMerge = () => {
        setMergeActive(!mergeActive);
    };

    useEffect(() => {
        setFilteredSections(sections);
    }, [sections]);


    return (
        <Modals>
            <Box column>
                <Box justify="between">
                    <SearchBar onChange={handleSearch} />
                    <Box>
                        { mergeActive &&
                            <ConfirmMergeButton disabled={selected.length !== 2} />
                        }
                        <MergeButton onClick={handleToggleMerge} mergeActive={mergeActive} />
                    </Box>
                </Box>
                <SectionsTable rows={filteredSections} mergeActive={mergeActive} onChangeSelected={setSelected}/>
            </Box>
        </Modals>

    );
};

export default Page;
