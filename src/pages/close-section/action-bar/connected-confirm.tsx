import React, { Suspense } from 'react';
import { BackIconButton } from 'components/buttons';
import Box from 'components/box';
import LoadingFallback from 'components/loading-fallback';
import CancelSectionActionButton from './cancel-button';
import ConnectedConfirmButton from 'components/connected-submit-payload-button';
import { useSummaryStyles } from '../summary-styles';

export default function ActionBarConnectedConfirm() {
    const styles = useSummaryStyles();

    return (
        <Box
            className={styles.section}
            justify="between"
            align="center"
            data-testid="actionbar-confirm"
        >
            <BackIconButton />
            <Box>
                <CancelSectionActionButton />

                <Suspense fallback={<LoadingFallback />}>
                    <ConnectedConfirmButton />
                </Suspense>
            </Box>
        </Box>
    );
}
