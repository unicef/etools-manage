import React, { useEffect, useState, useCallback } from 'react';
import { Typography, TableHead, TableRow, TableCell, Table, TableBody } from '@material-ui/core';

import Box from 'components/box';
import { useAppService, useAppDispatch, useAppState } from 'contexts/app';
import { onFetchMergeSummary } from 'actions';
import { RouteComponentProps } from 'react-router';
import EntityConfig from 'entities';
import { NonEmptyEntityResults } from 'services/backend';
import { keys, prop, map, filter } from 'ramda';
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
    const selectedSections = sections.split(',').map(Number);
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
                (entity: string) => {
                    console.log('NEXT ENTITY: ', entity);
                    return (
                        <EntityListWrapper
                            selectedSections={selectedSections}
                            key={entity as string}
                            entity={EntityPropMapping[entity]}
                            list={summary[entity]} />
                    );
                }
            )}
        </Box>
    );
};

export interface EntityRowProps<T> {
    item: T;
    entity: EntityConfig<T>;
    changingSections: string;
}

function EntityRowItem<T>({ item, entity, changingSections }: EntityRowProps<T>) {
    console.log('TCL: changingSection', changingSections);
    return (
        <TableRow>
            {entity.displayProperties.map(
                displayProp => (
                    <TableCell
                        key={displayProp as string}
                        align="left"
                    >
                        {item[displayProp]}
                    </TableCell>
                )
            )}
            <TableCell>Changing section:{changingSections}</TableCell>
        </TableRow>);
}
export interface EntityListProps<T> {
    entity: EntityConfig<T>;
    list: T[];
    selectedSections: number[];
}

const isArrayOfObjects = (xs: any[]) => typeof xs[0] === 'object';

function EntityListWrapper<T>({ entity, list, selectedSections }: EntityListProps<T>) {
    const { sections } = useAppState();

    // TODO: create cleaner abstraction
    const getCorrespondingSection = useCallback(
        item => {
            const { sectionsProp } = entity;
            const sectionsOfEntity = item[sectionsProp];
            if (Array.isArray(sectionsOfEntity) && isArrayOfObjects(sectionsOfEntity)) {
                return map(prop('name'), sectionsOfEntity.filter(({ id }) => selectedSections.includes(id)));
            } else if (Array.isArray(sectionsOfEntity)) {
                const idsOfSectionsChanging = filter((id: number) => selectedSections.includes(id), sectionsOfEntity);
                return sections.filter(({ id }) => idsOfSectionsChanging.includes(id)).map(prop('name')).join(',');
            } else if (typeof sectionsOfEntity === 'object') {
                return sectionsOfEntity.name;
            }
        },
        [sections],
    );

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
                        <EntityRowItem item={item} key={idx} entity={entity} changingSections={getCorrespondingSection(item)} />
                    )
                )}
            </TableBody>
        </Table>
</>
    );
}

export default MergeSummaryPage;
