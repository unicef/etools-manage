import React, { useState, useEffect, useCallback } from 'react';
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
import { selectSections, selectSectionsWithInactive } from 'selectors';
import Switch from '@material-ui/core/Switch';
import { Container, FormControlLabel, FormGroup, Typography } from '@material-ui/core';
import { useTableStyles } from 'components/table/styles';


if (process.env.NODE_ENV !== 'production') {
    const whyDidYouRender = require('@welldone-software/why-did-you-render');
    whyDidYouRender(React, {
        onlyLogs: true,
        titleColor: 'teal'
    });
}

const SectionsMainPage: React.FunctionComponent = () => {

    const sections = useSelector(selectSections);
    const sectionsWithInactive = useSelector(selectSectionsWithInactive);

    const [filteredSections, setFilteredSections] = useState([] as SectionEntity[]);
    const [mergeActive, setMergeActive] = useState<boolean>(false);
    const [showInactive, setShowInactive] = useState<boolean>(false);
    const modalsDispatch = useModalsDispatch();

    function handleToggleInactive(event: React.ChangeEvent<HTMLInputElement>) {
        const { checked } = event.target;

        setShowInactive(checked);
        if (checked) {
            setFilteredSections(sectionsWithInactive);
        } else {
            setFilteredSections(sections);
        }
    }

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
        onChangeSelected,
        showInactive
    };

    const tableStyles = useTableStyles();

    return (
        <Container maxWidth="md">
            <Box justify="between">
                <SearchBar onChange={handleSearch} />
                <ControlsBar mergeActive={mergeActive} setMergeActive={setMergeActive} />
            </Box>
            <Box className={tableStyles.toggleRow} align="center">
                <Switch checked={showInactive} onChange={handleToggleInactive} aria-label="Show inactive switch" />
                <Typography>Show inactive</Typography>
            </Box>
            <SectionsTable {...tableProps}/>

            <PageModals />
        </Container>
    );
};

// @ts-ignore
SectionsMainPage.whyDidYouRender = true;

export default SectionsMainPage;
