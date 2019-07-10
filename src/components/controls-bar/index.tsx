import React from 'react';
import { AddSectionButton, ConfirmMergeButton, MergeButton } from './buttons';
import { useModalsDispatch } from 'contexts/page-modals';
import Box from 'components/box';


export default function ControlsBar({ mergeActive, setMergeActive }) {
    // const dispatch = useModalsDispatch();

    const handleToggleMerge = () => {
        setMergeActive(!mergeActive);
    };

    return (
        <Box align="center">
            { mergeActive ?
                <ConfirmMergeButton /> :
                <AddSectionButton />
            }
            <MergeButton onClick={handleToggleMerge} mergeActive={mergeActive} />
        </Box>
    );
}
