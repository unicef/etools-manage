import React from 'react';
import { AddSectionButton, ConfirmMergeButton, MergeButton } from './buttons';
import Box from 'components/box';
import { StateSetter } from 'global-types';

export interface ControlsBarProps {
    mergeActive: boolean;
    setMergeActive: StateSetter;
}

export default function ControlsBar({ mergeActive, setMergeActive }: ControlsBarProps) {
    const handleToggleMerge = () => {
        setMergeActive(!mergeActive);
    };

    return (
        <Box align="center">
            {mergeActive ? <ConfirmMergeButton /> : <AddSectionButton />}
            <MergeButton
                onClick={handleToggleMerge}
                mergeActive={mergeActive}
                data-testid="merge-button"
            />
        </Box>
    );
}
