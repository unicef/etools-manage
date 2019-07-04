import React, { useState, useEffect } from 'react';
import { compose, includes, filter, prop, toLower } from 'ramda';
import MergeIcon from '@material-ui/icons/MergeType';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Modals, useModalsDispatch } from 'contexts/page-modals';
import Box from 'components/box';

// import { onToggleAddModal } from 'actions';

import SectionsTable from 'components/sections-table';
import { useAppState } from 'contexts/app';
import SearchBar from 'components/search-bar';
import { Button, Theme } from '@material-ui/core';


// function ModalToggle() {
//     const dispatch = useModalsDispatch();
//     return <button onClick={() => onToggleAddModal()} >Open</button>;
// }
const useActionStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            margin: theme.spacing(1),
            color: theme.palette.primary.main
        }
    }));

const Page: React.FunctionComponent = () => {
    const styles = useActionStyles({});

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

                <Box justify="between">
                    <SearchBar onChange={handleSearch} />
                    <Button
                        variant="contained"
                        color="secondary"
                        className={styles.button}
                    // disabled={numSelected !== 2}
                        aria-label="Merge">
                            Merge
                        <MergeIcon />
                    </Button>
                </Box>
                <SectionsTable rows={filteredSections}/>
            </Box>
        </Modals>

    );
};

export default Page;
