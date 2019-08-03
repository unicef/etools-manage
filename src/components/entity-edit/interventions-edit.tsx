import React, { memo, useMemo } from 'react';
import { useAppState } from 'contexts/app';
import EditWrapper from 'pages/close-summary/edit-wrapper';
import { InterventionEditItem } from './intervention-edit-item';
import { selectInterventionIds } from 'selectors/interventions';


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
                (id: number) => useMemo(
                    () => (
                        <InterventionEditItem
                            id={id}
                            key={id} />
                    ), [id]
                )
            )}
        </EditWrapper>

    );
});

// @ts-ignore
InterventionsEdit.whyDidYouRender = true;

export default (InterventionsEdit);
