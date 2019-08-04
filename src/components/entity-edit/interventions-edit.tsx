import React, { memo, useMemo } from 'react';
import EditWrapper from 'pages/close-summary/edit-wrapper';
import { InterventionEditItem } from './intervention-edit-item';
import { selectInterventionIds } from 'selectors/interventions';
import { useSelector } from 'react-redux';
import { selectCurrentActiveSection } from 'selectors';


if (process.env.NODE_ENV !== 'production') {
    const whyDidYouRender = require('@welldone-software/why-did-you-render');
    whyDidYouRender(React, {
        onlyLogs: true,
        titleColor: 'teal'
    });
}


const InterventionsEdit: React.FC = memo(() => {
    const ids = useSelector(selectInterventionIds);

    console.log('asdasds');
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
