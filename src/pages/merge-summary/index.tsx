import React, { useEffect, useState, useCallback } from 'react';
import { Typography, TableHead, TableRow, TableCell, Table, TableBody, Theme, Paper, TablePagination } from '@material-ui/core';

import Box from 'components/box';
import { useAppService, useAppDispatch, useAppState } from 'contexts/app';
import { onFetchMergeSummary, onSetLoading } from 'actions';
import { RouteComponentProps } from 'react-router';
import EntityConfig from 'entities';
import { keys, prop, map, filter, find, propEq, compose } from 'ramda';
import EntityPropMapping from 'entities/config-map';
import { makeStyles, createStyles } from '@material-ui/styles';
import { usePagination } from 'components/table';
import { EnhancedTableToolbar } from 'components/sections-table';
import clsx from 'clsx';
import { MAX_CELL_WRAP_LENGTH } from 'global-constants';

export interface MergeProps {
    sections: string;
    newName: string;
}


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        tableRoot: {
            margin: `${theme.spacing(3)}px 0`
        },
        tableBody: {
            height: 328,
            overflow: 'scroll'
        },
        cellStyle: {
            fontSize: '0.75rem'

        },
        wrapLong: {
            whiteSpace: 'normal'
        },
        noWrap: {
            whiteSpace: 'nowrap'
        }
    }));

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

    const { sections: selected, newName } = match.params;
    const [summary, setSummary] = useState();
    const searchParams = location.search;

    useEffect(() => {
        const fetchSummary = async () => {
            const summary = await onFetchMergeSummary(service, selected, dispatch);
            console.log('returns');
            setSummary(summary);
        };
        fetchSummary();
        // use params to call api for summary data
    }, []);
    console.log('TCL: searchParams', searchParams);

    const selectedSections = selected.split(',').map(Number);


    console.log('TCL: summary', summary);
    return (
        <Box column>
            <Typography variant="h4">
                Confirm Merge
            </Typography>
            {summary && keys(summary).map(
                (entity: string) => {
                    return (
                        <EntityChangesTable
                            selectedSections={selectedSections}
                            key={entity as string}
                            newSectionName={newName}
                            entity={EntityPropMapping[entity]}
                            list={summary[entity]} />
                    );
                }
            )}
        </Box>
    );
};


const isArrayOfObjects = (xs: any[]) => typeof xs[0] === 'object';

export default MergeSummaryPage;

interface EntityTableHeadProps<T> {
    entity: EntityConfig<T>;

}
function EntityTableHead<T>({ entity }: EntityTableHeadProps<T>) {

    return <TableHead>
        <TableRow>
            {entity.displayProperties.map(({ label }, idx) => (
                <TableCell
                    key={idx}
                    align="left"
                    padding="default"
                >
                    {label}
                </TableCell>
            ))}
            <TableCell align="right">
                        Pending changes
            </TableCell>
        </TableRow>
    </TableHead>;
}


export interface EntityTableProps<T> {
    entity: EntityConfig<T>;
    list: T[];
    selectedSections: number[];
    newSectionName: string;
}


function EntityChangesTable<T>({ entity, list, selectedSections, newSectionName }: EntityTableProps<T>) {
    console.log('TCL: list', list);
    const styles = useStyles();
    const {
        page,
        rowsPerPage,
        rowsPerPageOptions,
        handleChangePage,
        handleChangeRowsPerPage } = usePagination();

    const { sections } = useAppState();


    const emptyRows = rowsPerPage - Math.min(rowsPerPage, list.length - page * rowsPerPage);

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
            const sectionChangingName = compose(prop('name'), find(propEq('id', sectionsOfEntity)))(sections);
            return sectionChangingName;

        },
        [sections],
    );

    return (
        <Paper className={styles.tableRoot}>
            <EnhancedTableToolbar title={entity.title} />
            <Table
                aria-labelledby="tableTitle"
                size="medium">
                <EntityTableHead entity={entity} />
                <TableBody>

                    {
                        list
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((item, idx) => {
                                const changingSections = getCorrespondingSection(item);
                                return (
                                    <TableRow
                                        key={`entityRow${idx}`}>
                                        {entity.displayProperties.map(
                                            ({ label, propName }) => (
                                                <TableCell
                                                    size="small"
                                                    // classes={{ body: styles.cellStyle }}
                                                    className={
                                                        clsx(styles.cellStyle,
                                                            item[propName].length > MAX_CELL_WRAP_LENGTH ?
                                                                styles.wrapLong : styles.noWrap)}
                                                    key={label}
                                                    align="left"
                                                >
                                                    {item[propName]}
                                                </TableCell>
                                            )
                                        )}
                                        <TableCell
                                            align="right"
                                            classes={{ body: clsx(styles.cellStyle, styles.noWrap) }}
                                        >Section(s) <i>{changingSections}</i> will change to <i>{newSectionName}</i></TableCell>
                                    </TableRow>
                                );
                            }
                            )
                    }
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 49 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>

            </Table>
            { list.length > 5 &&
             <TablePagination
                 rowsPerPageOptions={rowsPerPageOptions}
                 component="div"
                 count={list.length}
                 rowsPerPage={rowsPerPage}
                 page={page}
                 backIconButtonProps={{
                     'aria-label': 'Previous Page'
                 }}
                 nextIconButtonProps={{
                     'aria-label': 'Next Page'
                 }}
                 onChangePage={handleChangePage}
                 onChangeRowsPerPage={handleChangeRowsPerPage}
             /> }
        </Paper>
    );
}
