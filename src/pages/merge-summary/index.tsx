import React, { useEffect } from 'react';
import { Typography } from '@material-ui/core';

import Box from 'components/box';
import { useAppService, useAppDispatch, useAppState } from 'contexts/app';
import { onFetchMergeSummary } from 'actions';
import { RouteComponentProps } from 'react-router';
import Entity, { EntityMap } from 'entities';

export interface MergeProps {
    sections: string;
    newName: string;
}

export function isSectionsParamValid(str: string): boolean {
    if (!str.length) {
        return false;
    }
    const sections = str.split(',');
    const sectionsStringValid = sections.reduce(
        (acc, next): boolean => {
            const sectionIdIsNumber = !isNaN(Number(next));
            return sectionIdIsNumber && acc;
        }, true);
    return sectionsStringValid;
}

const MergeSummaryPage: React.FC<RouteComponentProps<MergeProps>> = ({ match }) => {
    const { backendService: service } = useAppService();
    const dispatch = useAppDispatch();
    // const { loading } = useAppState();

    const { sections, newName } = match.params;
    let entityConfig: EntityMap;
    // const {summary} = useSummary()
    // useEffect(() => {
    //     if (summary) {
    //
    //     }
    // }, [summary]);

    useEffect(() => {
        onFetchMergeSummary(service, sections, dispatch);
        // use params to call api for summary data
    }, []);

    return (
        <Box column>
            <Typography variant="h4">
                Confirm Merge
            </Typography>
            {/* Implement ui here */}
        </Box>
    );
};

// function EntityListWrapper<T>(entity: Entity<T>, list: []T){
// <TableHeader>
//     <TableRow>
//         {Entity.displayProperties.map(
//             property=> (<th>{property}</th>)
//         )}
//     </TableRow>
// </TableHeader>
// }

export default MergeSummaryPage;
