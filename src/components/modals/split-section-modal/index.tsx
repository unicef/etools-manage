import React, { Suspense, lazy } from 'react';

import { useModalsState } from 'contexts/page-modals';
import LoadingFallback from 'components/loading-fallback';
const SplitModalContent = lazy(() => import('./split-modal-content'));


const SplitSectionModal: React.FC = () => {
    const { splitModalOpen } = useModalsState();

    return splitModalOpen ?

        <Suspense fallback={<LoadingFallback/> }>
            <SplitModalContent />
        </Suspense>
        : null;

};
export default SplitSectionModal;
