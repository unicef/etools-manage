import React, { memo } from 'react';
import { InterventionEntity } from 'entities/types';
import { useAppState } from 'contexts/app';
import EditWrapper from 'pages/close-summary/edit-wrapper';
import { InterventionEditItem } from './intervention-edit-item';
import { selectInterventionIds } from 'selectors/interventions';
import { keys } from 'ramda';


if (process.env.NODE_ENV !== 'production') {
    const whyDidYouRender = require('@welldone-software/why-did-you-render');
    whyDidYouRender(React, {
        onlyLogs: true,
        titleColor: 'teal'
    });
}


const InterventionsEdit: React.FC = memo(() => {
    const state = useAppState();
    const ids = selectInterventionIds(state);

    return (
        <EditWrapper title="Partnership Management Portal">

            {ids.map(
                (id: number) => (
                    <InterventionEditItem
                        id={id}
                        key={id} />
                )
            )}
        </EditWrapper>

    );
});

// @ts-ignore
InterventionsEdit.whyDidYouRender = true;

export default (InterventionsEdit);
