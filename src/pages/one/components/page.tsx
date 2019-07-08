import React, { useState, useEffect } from 'react';
import { compose, includes, filter, prop, toLower } from 'ramda';
import { Modals, useModalsDispatch, useModalsState } from 'contexts/page-modals';
import Box from 'components/box';

// import { onToggleAddModal } from 'actions';

import SectionsTable from 'components/sections-table';
import { useAppState } from 'contexts/app';
import SearchBar from 'components/search-bar';
import { MergeButton, ConfirmMergeButton } from 'components/controls';
import { onSelectForMerge } from 'actions';


const Page: React.FunctionComponent = () => {

    const { sections } = useAppState();

    const [filteredSections, setFilteredSections] = useState([]);
    const [mergeActive, setMergeActive] = useState<boolean>(false);
    const dispatch = useModalsDispatch();

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

    const onChangeSelected = (selected: string[]) => dispatch(onSelectForMerge(selected));

    return (
        <Box column>
            <Box justify="between">
                <SearchBar onChange={handleSearch} />
                <Box>
                    { mergeActive &&
                            <ConfirmMergeButton />
                    }
                    <MergeButton onClick={handleToggleMerge} mergeActive={mergeActive} />
                </Box>
            </Box>
            <SectionsTable rows={filteredSections} mergeActive={mergeActive} onChangeSelected={onChangeSelected}/>
        </Box>

    );
};

export default Page;
