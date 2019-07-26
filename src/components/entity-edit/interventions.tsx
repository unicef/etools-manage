import React from 'react';
import { InterventionEntity } from 'entities/types';
import Box from 'components/box';
import { EditProps } from 'entities';
import { Paper, Typography } from '@material-ui/core';
import EditWrapper from 'pages/close-summary/edit-wrapper';

type InterventionsEditProps = EditProps<InterventionEntity>

const InterventionsEdit: React.FC<InterventionsEditProps> = ({ list }) => {

    return (
        <EditWrapper title="Partnership Management Portal">
            {list && list.map(
                ({ number,
                    title,
                    sections,
                    indicators }) => (
                    <Box>
                        {number} and {title}
                    </Box>
                )
            )}
        </EditWrapper>

    );
};


export default InterventionsEdit;
