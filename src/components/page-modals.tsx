import React from 'react';
import MergeModal from './modals/merge-modal';
import AddSectionModal from './modals/add-section-modal';
import SplitSectionModal from './modals/split-section-modal';

export default function PageModals() {
    return (
        <>
            <SplitSectionModal />
            <MergeModal />
            <AddSectionModal />
        </>
    );
}
