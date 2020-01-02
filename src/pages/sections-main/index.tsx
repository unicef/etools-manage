import React, { useState, useEffect, useCallback } from 'react';
import { compose, includes, filter, prop, toLower, propEq } from 'ramda';
import { useModalsDispatch } from 'contexts/page-modals';
import Box from 'components/box';
import SectionsTable from 'components/sections-table';
import SearchBar from 'components/search-bar';
import ControlsBar from 'components/controls-bar';
import PageModals from 'components/page-modals';
import { Section } from 'entities/types';
import { onSelectForMerge, onToggleSplitModal } from 'slices/modals';
import { useSelector, useDispatch } from 'react-redux';
import { selectSections, selectAllSections } from 'selectors';
import Switch from '@material-ui/core/Switch';
import { Container, Typography } from '@material-ui/core';
import { useTableStyles } from 'components/table/styles';
import { renderSectionsList } from 'actions/action-constants';
import InProgressTable from 'components/in-progress-table';
import { selectInProgress } from 'selectors/in-progress-items';
import { currentActiveSectionChanged } from 'slices/current-active-section';
import { RouteComponentProps } from 'react-router';
import { Maybe } from 'helpers';
import ErrorsSnackbar from 'components/errors-snackbar';
import { INVALID_SECTION_MESSAGE } from 'global-constants';

const SectionsMainPage: React.FC<Maybe<RouteComponentProps>> = ({ location, history }) => {
    const sections = useSelector(selectSections);
    const sectionsWithInactive = useSelector(selectAllSections);

    const [filteredSections, setFilteredSections] = useState([] as Section[]);
    const [mergeActive, setMergeActive] = useState<boolean>(false);
    const [showInactive, setShowInactive] = useState<boolean>(false);

    const inProgress = useSelector(selectInProgress);

    const modalsDispatch = useModalsDispatch();
    const dispatch = useDispatch();

    const [errorSnackbarOpen, setErrorSnackbarOpen] = useState<boolean>(false);
    const [errorSnackbarMsg, setErrorSnackbarMsg] = useState<string>('');

    function handleToggleInactive(event: React.ChangeEvent<HTMLInputElement>) {
        const { checked } = event.target;

        setShowInactive(checked);
        if (checked) {
            setFilteredSections(sectionsWithInactive);
        } else {
            setFilteredSections(sections);
        }
    }

    const handleSearch = useCallback(
        (str: string) => {
            const matching = filter(
                compose(
                    includes(str.toLowerCase()),
                    toLower,
                    prop('name')
                )
            );
            setFilteredSections(matching(sections));
        },
        [sections]
    );

    const handleCloseSnackbar = () => {
        history.replace('', null);
        setErrorSnackbarOpen(false);
    };

    useEffect(() => {
        setFilteredSections(sections);
    }, [sections]);

    useEffect(() => {
        dispatch(renderSectionsList());
    });

    // Pops up the split section modal if user attempts to
    // enter a section id in url param for section which has no new names saved- location comes from
    // the <Redirect/>
    useEffect(() => {
        if (prop('state', location)) {
            const { splitId } = location.state;
            const correspondingSection = sections.find(propEq('id', splitId));
            if (!correspondingSection) {
                setErrorSnackbarMsg(INVALID_SECTION_MESSAGE);
                setErrorSnackbarOpen(true);
                return;
            }
            dispatch(currentActiveSectionChanged(Number(splitId)));
            modalsDispatch(onToggleSplitModal);
        }
    }, [location]);

    const onChangeSelected = useCallback(
        (selected: string[]) => modalsDispatch(onSelectForMerge(selected)),
        []
    );

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
                <Switch
                    checked={showInactive}
                    onChange={handleToggleInactive}
                    aria-label="Show inactive switch"
                />
                <Typography>Show inactive</Typography>
            </Box>

            <SectionsTable {...tableProps} />

            {inProgress.length ? <InProgressTable /> : null}

            <PageModals />
            <ErrorsSnackbar
                open={errorSnackbarOpen}
                handleClose={handleCloseSnackbar}
                errorMessage={errorSnackbarMsg}
            ></ErrorsSnackbar>
        </Container>
    );
};

export default SectionsMainPage;
