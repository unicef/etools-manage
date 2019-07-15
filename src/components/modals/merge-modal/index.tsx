import React, { lazy, Suspense } from 'react';
import {
    filter
} from 'ramda';
import { useModalsState, useModalsDispatch } from 'contexts/page-modals';
import { useAppState } from 'contexts/app';
import LoadingFallback from 'components/loading-fallback';

const MergeModalContent = lazy(() => import('./merge-modal-content'));

export const useMergeState = () => {
    const { sections } = useAppState();
    const { mergeModalOpen, selectedForMerge } = useModalsState();
    const matchingSection = ({ id }: {id: number}) => id === selectedForMerge[0] || id === selectedForMerge[1];
    const selectedSectionsFromCollection = filter(matchingSection, sections);
    const dispatch = useModalsDispatch();
    return {
        dispatch,
        mergeModalOpen,
        sections,
        selectedForMerge,
        selectedSectionsFromCollection
    };
};


// Content components created for lazy loading modal content
const MergeModal: React.FC = () => {
    const { mergeModalOpen } = useMergeState();

    return mergeModalOpen ?
        <Suspense fallback={ <LoadingFallback/> }>
            <MergeModalContent />
        </Suspense> : null;
};

export default MergeModal;

