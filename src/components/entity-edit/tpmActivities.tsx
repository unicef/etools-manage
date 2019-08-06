import React from 'react';
import { TPMActivityEntity } from 'entities/types';
import Box from 'components/box';
import { EditProps } from 'entities';

type TPMEditProps = EditProps<TPMActivityEntity>
const TPMActivitiesEdit: React.FC = props => {

    return <Box>
        TPM Edit Box
    </Box>;
};

export default TPMActivitiesEdit;
