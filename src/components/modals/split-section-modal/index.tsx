import React, { Suspense } from 'react';

import { useModalsState } from 'contexts/page-modals';
import LoadingFallback from 'components/loading-fallback';


const SplitModal: React.FC = () => {
    const { splitModalOpen } = useModalsState();

    return splitModalOpen ?

        <Suspense fallback={<LoadingFallback/> }>
            {/* <SplitModalContent /> */}
        </Suspense>
        : null;

};
