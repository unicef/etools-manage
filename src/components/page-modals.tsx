import React, { useEffect } from 'react';
import MergeModal from './modals/merge-modal';
import AddSectionModal from './modals/add-section-modal';


export default function PageModals() {
    // this will preload after page is finished rendering
    // useEffect(() => {
    //  import('./modals/add-section-modal/add-modal-content');
    // }, []);
    return (
        <>
            <MergeModal />
            <AddSectionModal />
        </>
    );

}
