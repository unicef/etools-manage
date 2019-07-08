import React, { useState, useEffect } from 'react';
import { compose, includes, filter, prop, toLower } from 'ramda';
import { useModalsDispatch } from 'contexts/page-modals';
import Box from 'components/box';


import SectionsTable from 'components/sections-table';
import { useAppState } from 'contexts/app';
import SearchBar from 'components/search-bar';
import { onSelectForMerge } from 'actions';
import ControlsBar from 'components/controls-bar';
import PageModals from 'components/page-modals';


const SectionsMainPage: React.FunctionComponent = () => {

    const { sections } = useAppState();

    const [filteredSections, setFilteredSections] = useState([]);
    const [mergeActive, setMergeActive] = useState<boolean>(false);
    const dispatch = useModalsDispatch();

    const handleSearch = (str: string) => {
        const matching = filter(compose(includes(str), toLower, prop('name')));
        setFilteredSections(matching(sections));
    };


    useEffect(() => {
        setFilteredSections(sections);
    }, [sections]);

    const onChangeSelected = (selected: string[]) => dispatch(onSelectForMerge(selected));

    return (
        <Box column>
            <Box justify="between">
                <SearchBar onChange={handleSearch} />
                <ControlsBar mergeActive={mergeActive} setMergeActive={setMergeActive} />
            </Box>
            <SectionsTable rows={filteredSections} mergeActive={mergeActive} onChangeSelected={onChangeSelected}/>
            <PageModals />

        </Box>

    );
};

export default SectionsMainPage;
