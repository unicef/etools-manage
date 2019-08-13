import React, { useState, useEffect, useCallback, useRef } from 'react';
import { compose, includes, filter, prop, toLower } from 'ramda';
import { useModalsDispatch } from 'contexts/page-modals';
import Box from 'components/box';
import SectionsTable from 'components/sections-table';
import SearchBar from 'components/search-bar';
import ControlsBar from 'components/controls-bar';
import PageModals from 'components/page-modals';
import { SectionEntity } from 'entities/types';
import { onSelectForMerge } from 'reducers/modals';
import { useSelector } from 'react-redux';
import { selectSections } from 'selectors';


if (process.env.NODE_ENV !== 'production') {
    const whyDidYouRender = require('@welldone-software/why-did-you-render');
    whyDidYouRender(React, {
        onlyLogs: true,
        titleColor: 'teal'
    });
}

const SectionsMainPage: React.FunctionComponent = () => {

    const sections = useSelector(selectSections);
    const [filteredSections, setFilteredSections] = useState([] as SectionEntity[]);
    const [mergeActive, setMergeActive] = useState<boolean>(false);

    const modalsDispatch = useModalsDispatch();


    const handleSearch = useCallback((str: string) => {
        const matching = filter(compose(includes(str.toLowerCase()), toLower, prop('name')));
        setFilteredSections(matching(sections));
    }, [sections]);

    useEffect(() => {
        setFilteredSections(sections);
    }, [sections]);

    const onChangeSelected = useCallback((selected: string[]) => modalsDispatch(onSelectForMerge(selected)), []);

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

// @ts-ignore
SectionsMainPage.whyDidYouRender = true;

export default SectionsMainPage;
