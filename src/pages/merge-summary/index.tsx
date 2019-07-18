import React, { useEffect, useState, useCallback } from 'react';
import { Typography, TableHead, TableRow, TableCell, Table, TableBody, Theme, Paper, TablePagination, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Box from 'components/box';
import { useAppService, useAppDispatch, useAppState } from 'contexts/app';
import { onFetchMergeSummary, onSubmitMergeSections } from 'actions';
import { RouteComponentProps } from 'react-router';
import { keys, prop, map, filter, find, propEq, compose } from 'ramda';
import EntityPropMapping from 'entities/config-map';
import { makeStyles, createStyles } from '@material-ui/styles';
import { usePagination } from 'components/table';
import { EnhancedTableToolbar } from 'components/sections-table';
import clsx from 'clsx';
import { MAX_CELL_WRAP_LENGTH } from 'global-constants';
import { EntityTableHeadProps, EntityTableProps, MergeProps } from './types';
import { MergeSectionsPayload } from 'entities/types';
import { ConfirmButton } from 'components/buttons';
import { SectionBox, ReviewBox } from 'components/section-box';


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
        },
        results: {
            marginTop: theme.spacing(4)
        },
        subtitle: {
            fontWeight: 500,
            fontSize: 12,
            height: 16,
            lineHeight: '20px'
        }
    }));

const MergeSummaryPage: React.FC<RouteComponentProps<MergeProps>> = ({ match }) => {
    const {
        backendService: service,
        sectionsService
    } = useAppService();
    const dispatch = useAppDispatch();
    const { mergedSection } = useAppState();
    const styles = useStyles();

    const { sections: selected, newName } = match.params;

    const [summary, setSummary] = useState();
    useEffect(() => {
        const fetchSummary = async () => {
            const summary = await onFetchMergeSummary(service, selected, dispatch);
            setSummary(summary);
        };
        fetchSummary();
        // use params to call api for summary data
    }, []);

    const selectedSections = selected.split(',').map(Number);

    const onConfirm = async () => {

        const payload: MergeSectionsPayload = {
            /* eslint-disable-next-line */
            new_section_name: newName,
            /* eslint-disable-next-line */
            sections_to_merge: selectedSections
        };

        onSubmitMergeSections(sectionsService, payload, dispatch);

    };

    return (
        <Box column>

            {
                mergedSection ?
                    <Box justify="between">
                        <Box column>
                            <Typography variant="h6" gutterBottom>
                        Merge successful.
                            </Typography>
                            <Box className={styles.results} column >
                                <Typography variant="subtitle1" className={styles.subtitle}>Created section name:</Typography> <SectionBox name={mergedSection.name} />
                            </Box>
                        </Box>
                        <Link to="/"><Button variant="contained">Back to Home</Button></Link>
                    </Box> :

                    <Box justify="between">
                        <Typography variant="h6">
                            Confirm summary of changes
                        </Typography>
                        <Box align="center">
                            <Link to="/"><Button variant="contained">Cancel</Button></Link>
                            <ConfirmButton onClick={onConfirm} text="Confirm" />
                        </Box>
                    </Box>
            }
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


export default MergeSummaryPage;

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


function EntityChangesTable<T>({ entity, list, selectedSections, newSectionName }: EntityTableProps<T>) {
    const styles = useStyles();
    const {
        page,
        rowsPerPage,
        rowsPerPageOptions,
        handleChangePage,
        handleChangeRowsPerPage } = usePagination();

    const { sections } = useAppState();

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, list.length - page * rowsPerPage);

    // TODO: abstract away at a different layer
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
                                                            // @ts-ignore
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


function isArrayOfObjects(xs: any[]) {
    return typeof xs[0] === 'object';
}
