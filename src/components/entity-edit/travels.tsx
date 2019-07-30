import React from 'react';
import { TravelEntity } from 'entities/types';
import Box from 'components/box';
import { EditProps } from 'entities';

type TravelsEditProps = EditProps<TravelEntity>
const TravelsEdit: React.FC = props => {

    return <Box>
        Travel Edit Box
    </Box>;
};

export default TravelsEdit;
