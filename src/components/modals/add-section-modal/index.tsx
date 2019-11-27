import React, { lazy, Suspense } from 'react';

import { useModalsState } from 'contexts/page-modals';
import LoadingFallback from 'components/loading-fallback';

const AddSectionModalContent = lazy(() => import('./add-modal-content'));


const AddSectionModal: React.FC = () => {
    const { addModalOpen } = useModalsState();
    return addModalOpen ?
        <Suspense fallback={ <LoadingFallback/> }>
            <AddSectionModalContent />
        </Suspense>
        : null;
};

export default AddSectionModal;
