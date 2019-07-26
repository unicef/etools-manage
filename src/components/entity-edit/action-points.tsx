import React from 'react';
import { ActionPointEntity } from 'entities/types';
import Box from 'components/box';
import { EditProps } from 'entities';

type ActionPointsEditProps = EditProps<ActionPointEntity>
const ActionPointsEdit: React.FC = props => {

    return <Box>
        TPM Edit Box
    </Box>;
};

export default ActionPointsEdit;
