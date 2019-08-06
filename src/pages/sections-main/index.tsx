import React, { useState, useEffect, useCallback } from 'react';
import { compose, includes, filter, prop, toLower } from 'ramda';
import { useModalsDispatch } from 'contexts/page-modals';
import Box from 'components/box';
import SectionsTable from 'components/sections-table';
import SearchBar from 'components/search-bar';
import ControlsBar from 'components/controls-bar';
import PageModals from 'components/page-modals';
import { SectionEntity } from 'entities/types';
import { onSelectForMerge } from 'slices/modals';
import { useSelector } from 'react-redux';
import { selectSections } from 'selectors';


const SectionsMainPage: React.FunctionComponent = () => {

    const sections = useSelector(selectSections);
    const [filteredSections, setFilteredSections] = useState([] as SectionEntity[]);
    const [mergeActive, setMergeActive] = useState<boolean>(false);

    const dispatch = useModalsDispatch();

    const handleSearch = useCallback((str: string) => {
        const matching = filter(compose(includes(str.toLowerCase()), toLower, prop('name')));
        setFilteredSections(matching(sections));
    }, [sections]);

    useEffect(() => {
        setFilteredSections(sections);
    }, [sections]);


    const onChangeSelected = useCallback((selected: string[]) => dispatch(onSelectForMerge(selected)), []);

    const tableProps = {
        rows: filteredSections,
        mergeActive,
        onChangeSelected
    };

    return (
        <Box column>
            <Box justify="between">
                <SearchBar onChange={handleSearch} />
                <ControlsBar mergeActive={mergeActive} setMergeActive={setMergeActive} />
            </Box>

            <SectionsTable {...tableProps}/>

            <PageModals />
        </Box>
    );
};

export default SectionsMainPage;
