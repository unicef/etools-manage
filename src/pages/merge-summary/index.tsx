import React, { useEffect, useState } from 'react';
import { Typography, TableHead, TableRow, TableCell, Table, TableBody } from '@material-ui/core';

import Box from 'components/box';
import { useAppService, useAppDispatch, useAppState } from 'contexts/app';
import { onFetchMergeSummary } from 'actions';
import { RouteComponentProps } from 'react-router';
import EntityConfig from 'entities';
import { NonEmptyEntityResults } from 'services/backend';
import { keys } from 'ramda';
import EntityPropMapping from 'entities/config-map';

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
    const [summary, setSummary] = useState();

    useEffect(() => {
        const fetchSummary = async () => {
            const summary = await onFetchMergeSummary(service, sections, dispatch);
            setSummary(summary);
        };
        fetchSummary();
        // use params to call api for summary data
    }, []);
    console.log('TCL: summary', summary);
    return (
        <Box column>
            <Typography variant="h4">
                Confirm Merge
            </Typography>
            {summary && keys(summary).map(
                entity => {
                    return (
                        <EntityListWrapper
                            key={entity as string}
                            entity={EntityPropMapping[entity]}
                            list={summary[entity]} />
                    );
                }
            )}
        </Box>
    );
};

// TODO:memo this

export interface EntityListProps<T> {
    entity: EntityConfig<T>;
    list: T[];
}

function EntityListWrapper<T>({ entity, list }: EntityListProps<T>) {
    return (
        <>
        <Typography variant="h3">{entity.title}</Typography>
        <Table>
            <TableHead>
                <TableRow>
                    {entity.displayProperties.map((prop, idx) => (
                        <TableCell
                            key={idx}
                            align="left"
                            padding="default"
                        >
                            {prop}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {list.map(
                    (item, idx) => (
                        <TableRow key={idx}>
                            {entity.displayProperties.map(
                                (displayProp, i) => (
                                    <TableCell
                                        key={displayProp as string}
                                        align="left"
                                    >
                                        {item[displayProp]}
                                    </TableCell>
                                )
                            )}
                        </TableRow>
                    )
                )}
            </TableBody>
        </Table>
</>
    );
}

export default MergeSummaryPage;
