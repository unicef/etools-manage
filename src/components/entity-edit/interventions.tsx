import React from 'react';
import { InterventionEntity } from 'entities/types';
import Box from 'components/box';
import { EditProps } from 'entities';

type InterventionsEditProps = EditProps<InterventionEntity>
const InterventionsEdit: React.FC<InterventionsEditProps> = props => {

    return <Box>
        Interventions Box
    </Box>;
};

export default InterventionsEdit;
