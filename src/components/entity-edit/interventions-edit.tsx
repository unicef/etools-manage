import React, { memo, useCallback, useMemo } from 'react';
import { InterventionEntity, CloseSectionPayload, InterventionSectionPayload } from 'entities/types';
import { useAppState, useAppDispatch, useAppService } from 'contexts/app';
import { selectCurrentActiveSection } from 'selectors';
import { always, lensPath, over } from 'ramda';
import { onUpdateStorage, onUpdateInterventionSection } from 'pages/close-summary/actions';
import EditWrapper from 'pages/close-summary/edit-wrapper';
import { InterventionEditItem } from './intervention-edit-item';
import { selectInterventionsFromPayload } from 'selectors/interventions';


if (process.env.NODE_ENV !== 'production') {
    const whyDidYouRender = require('@welldone-software/why-did-you-render');
    whyDidYouRender(React, {
        onlyLogs: true,
        titleColor: 'teal'
    });
}


const InterventionsEdit: React.FC = memo(() => {
    const state = useAppState();
    const { closeSectionPayload } = state;
    console.log('TCL: InterventionsEdit:React.FC -> closeSectionPayload', closeSectionPayload);
    const list = selectInterventionsFromPayload(state);

    return (
        <EditWrapper title="Partnership Management Portal">

            {list.slice(0, 25).map(
                (intervention: InterventionEntity, idx: number) => (
                    <InterventionEditItem
                        idx={idx}
                        key={intervention.number} />
                )
            )}
        </EditWrapper>

    );
});

// @ts-ignore
InterventionsEdit.whyDidYouRender = true;

export default (InterventionsEdit);
