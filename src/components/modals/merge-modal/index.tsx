import React, { lazy, Suspense } from 'react';
import { filter, includes } from 'ramda';
import { useModalsState, useModalsDispatch } from 'contexts/page-modals';
import LoadingFallback from 'components/loading-fallback';
import { useSelector } from 'react-redux';
import { selectSections } from 'selectors';

const MergeModalContent = lazy(() => import('./merge-modal-content'));

export const useMergeState = () => {
    const sections = useSelector(selectSections);
    const { mergeModalOpen, selectedForMerge } = useModalsState();
    const dispatch = useModalsDispatch();

    const matchingSection = ({ id }: { id: number }) => includes(id, selectedForMerge);
    const selectedSectionsFromCollection = filter(matchingSection, sections);

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

    return mergeModalOpen ? (
        <Suspense fallback={<LoadingFallback />}>
            <MergeModalContent />
        </Suspense>
    ) : null;
};

export default MergeModal;
