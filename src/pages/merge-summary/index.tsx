import React, { useEffect, useState, useCallback } from 'react';
import { Typography, TableHead, TableRow, TableCell, Table, TableBody, Theme, Paper, TablePagination, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import queryString, { ParsedQuery } from 'query-string';
import Box from 'components/box';
import { useAppService, useAppDispatch, useAppState } from 'contexts/app';
import { onFetchMergeSummary, onSubmitMergeSections } from 'actions';
import { keys, prop, map, filter, find, propEq, compose, isEmpty } from 'ramda';
import EntityConfigMapping from 'entities/config-map';
import { makeStyles, createStyles } from '@material-ui/styles';
import { usePagination } from 'components/table';
import { EnhancedTableToolbar } from 'components/sections-table';
import clsx from 'clsx';
import { MAX_CELL_WRAP_LENGTH } from 'global-constants';
import { EntityTableHeadProps, EntityTableProps, MergeProps } from './types';
import { MergeSectionsPayload } from 'entities/types';
import { ConfirmButton } from 'components/buttons';
import { SectionBox } from 'components/section-box';


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

interface QueryParam {
    sections: string;
    newName: string;
}
// TODO: lazy load on route
const MergeSummaryPage: React.FC = () => {
    const {
        sections: selected,
        newName
    } = queryString.parse(location.search);

    const {
        backendService: service,
        sectionsService
    } = useAppService();

    const dispatch = useAppDispatch();
    const { mergedSection } = useAppState();
    const [summary, setSummary] = useState();

    const styles = useStyles();

    useEffect(() => {
        const fetchSummary = async () => {
            const summary = await onFetchMergeSummary(service, selected as string, dispatch);
            setSummary(summary);
        };
        fetchSummary();
    }, []);

    const showSummaryList = summary && !mergedSection;
    const selectedSections = (selected as string).split(',').map(Number);

    const onConfirm = async () => {

        const payload: MergeSectionsPayload = {
            /* eslint-disable-next-line */
            new_section_name: newName as string,
            /* eslint-disable-next-line */
            sections_to_merge: selectedSections
        };

        onSubmitMergeSections(sectionsService, payload, dispatch);

    };
    // TODO: Aesthetic
    const ConfirmBox = () => (
        <Box justify="between" align="center">
            <Typography variant="h6">
                {isEmpty(summary) ? 'Merge does not affect other entities. Confirm to complete merge.' : 'Confirm summary of changes'}
            </Typography>
            <Box align="center">
                <Link to="/"><Button variant="contained">Cancel</Button></Link>
                <ConfirmButton onClick={onConfirm} text="Confirm" />
            </Box>
        </Box>);

    const SuccessBox = () => (
        <Box justify="between">
            <Box column>
                <Typography variant="h6" gutterBottom>
                     Merge successful.
                </Typography>
                <Box className={styles.results} column >
                    <Typography variant="subtitle1" className={styles.subtitle}>Created section name:</Typography> {mergedSection && <SectionBox name={mergedSection.name} />}
                </Box>
            </Box>
            <Link to="/"><Button variant="contained">Back to Home</Button></Link>
        </Box>
    );


    return (
        <Box column>
            { mergedSection ?
                <SuccessBox /> :
                <ConfirmBox />
            }
            {showSummaryList && keys(summary).map(
                (entity: string) => {
                    return (
                        <EntityChangesTable
                            selectedSections={selectedSections}
                            key={entity as string}
                            newSectionName={newName as string}
                            config={EntityConfigMapping[entity]}
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


function EntityChangesTable<T>({ config, list, selectedSections, newSectionName }: EntityTableProps<T>) {
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
            const { sectionsProp } = config;
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
            <EnhancedTableToolbar title={config.title} />
            <Table
                aria-labelledby="tableTitle"
                size="medium">

                <EntityTableHead entity={config} />
                <TableBody>
                    {
                        list
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((item, idx) => {
                                const changingSections = getCorrespondingSection(item);
                                return (
                                    <TableRow
                                        key={`entityRow${idx}`}>
                                        {config.displayProperties.map(
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
