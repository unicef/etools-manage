import React from 'react';
import MergeModal from './modals/merge-modal';
import AddSectionModal from './modals/add-section-modal';
import { Aux } from './aux';


export default function PageModals() {
    return (
        <Aux>
            <MergeModal />
            <AddSectionModal />
        </Aux>
    );

}
