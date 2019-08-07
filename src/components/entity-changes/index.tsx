
import React, { useCallback } from 'react';
import { TableHead, TableRow, TableCell, Table, TableBody, Paper, TablePagination } from '@material-ui/core';
import { keys, prop, map, filter, find, propEq, compose } from 'ramda';
import { usePagination } from 'components/table';
import { EnhancedTableToolbar } from 'components/sections-table';
import clsx from 'clsx';
import { MAX_CELL_WRAP_LENGTH } from 'global-constants';
import { selectSections } from 'selectors';
import { EntityTableHeadProps, EntityChangesTableProps } from 'pages/merge-summary/types';
import { useReviewTableStyles } from 'components/modals/styles';
import { useSelector } from 'react-redux';
import { isArrayOfObjects } from 'utils/helpers';


function EntityTableHead<T>({ entityConfig }: EntityTableHeadProps<T>) {

    return <TableHead>
        <TableRow>
            {entityConfig.displayProperties.map(({ label }, idx) => (
                <TableCell
                    key={idx}
                    align="left"
                    padding="default"
                >
                    <span>{label}</span>
                </TableCell>
            ))}
            <TableCell align="right">
                Old Section(s)
            </TableCell>
            <TableCell align="right">
                New Section(s)
            </TableCell>
        </TableRow>
    </TableHead>;
}


export default function EntityChangesTable<T>({ config, entity, getOldSections, getNewSections }: EntityChangesTableProps<T>) {
    const styles = useReviewTableStyles();
    const {
        page,
        rowsPerPage,
        rowsPerPageOptions,
        handleChangePage,
        handleChangeRowsPerPage } = usePagination();

    // const sections = useSelector(selectSections);
    const entityIds = keys(entity);
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, entityIds.length - page * rowsPerPage);

    // TODO: put inside selectors
    // const getCorrespondingSection = useCallback(
    //     item => {
    //         console.log(item);
    //         const { sectionsProp } = config;
    //         const sectionsOfEntity = item[sectionsProp];
    //         if (Array.isArray(sectionsOfEntity) && isArrayOfObjects(sectionsOfEntity)) {
    //             return map(prop('name'), sectionsOfEntity.filter(({ id }) => selectedSections.includes(id)));
    //         } else if (Array.isArray(sectionsOfEntity)) {
    //             const idsOfSectionsChanging = filter((id: number) => selectedSections.includes(id), sectionsOfEntity);
    //             return sections.filter(({ id }: {id: string}) => idsOfSectionsChanging.includes(id)).map(prop('name')).join(',');
    //         } else if (typeof sectionsOfEntity === 'object') {
    //             return sectionsOfEntity.name;
    //         }
    //         const sectionChangingName = compose(prop('name'), find(propEq('id', sectionsOfEntity)))(sections);

    //         return sectionChangingName;
    //     },
    //     [sections],
    // );

    return (
        <Paper className={styles.container}>
            <EnhancedTableToolbar title={config.title} />
            <Table
                aria-labelledby="tableTitle"
                size="medium">

                <EntityTableHead entityConfig={config} />
                <TableBody>
                    {
                        entityIds
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((id: string, idx: number) => {
                                const item = entity[id];

                                const changingSections = getOldSections(item, config.sectionsProp);
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
                                        >{changingSections}</TableCell>
                                        <TableCell
                                            align="right"
                                            classes={{ body: clsx(styles.cellStyle, styles.noWrap) }}
                                        >{getNewSections(item)}</TableCell>
                                    </TableRow>
                                );
                            }
                            )
                    }
                    {emptyRows > 0 && page > 1 && (
                        <TableRow style={{ height: 49 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>

            </Table>
            { entityIds.length > 5 &&
             <TablePagination
                 rowsPerPageOptions={rowsPerPageOptions}
                 component="div"
                 count={entityIds.length}
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
