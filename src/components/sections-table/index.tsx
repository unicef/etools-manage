import React, { useEffect, memo } from 'react';
import clsx from 'clsx';
import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

import { Order, EnhancedTableHeadProps, TableToolbarProps, HeadRow } from '../table/table';
import { Section } from 'entities/types';
import { usePagination } from 'components/table/use-paginator';
import { stableSort, getSorting } from 'components/table/table-utils';
import { useTableStyles } from 'components/table/styles';
import MoreActionsMenu from './more-actions-menu';
import { useSelector } from 'react-redux';
import { deriveRowsFromInProgress } from 'selectors/in-progress-items';

const useToolbarStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(1)
        },
        highlight:
            theme.palette.type === 'light'
                ? {
                      color: theme.palette.secondary.main,
                      backgroundColor: lighten(theme.palette.secondary.light, 0.85)
                  }
                : {
                      color: theme.palette.text.primary,
                      backgroundColor: theme.palette.secondary.dark
                  },
        spacer: {
            flex: '1 1 100%'
        },
        actions: {
            color: theme.palette.text.secondary
        },
        title: {
            flex: '0 0 auto'
        }
    })
);

export const EnhancedTableToolbar = ({ title, children, className }: TableToolbarProps) => {
    const styles = useToolbarStyles({});

    return (
        <Toolbar className={clsx(styles.root, className)}>
            <div className={styles.title}>
                <Typography variant="h6" id="tableTitle">
                    {title}
                </Typography>
            </div>
            <div className={styles.spacer} />
            <div className={styles.actions}>{children}</div>
        </Toolbar>
    );
};

const headRows: HeadRow<SectionOrderby>[] = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Name' }
];

export function EnhancedTableHead<SectionOrderby>(props: EnhancedTableHeadProps<SectionOrderby>) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property: keyof SectionOrderby) => (
        event: React.MouseEvent<unknown>
    ) => {
        onRequestSort(event, property);
    };
    const styles = useTableStyles({});

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox" />
                {headRows.map(row => (
                    <TableCell
                        key={row.id}
                        className={styles.tuck}
                        align={row.numeric ? 'right' : 'left'}
                        padding={row.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === row.id ? order : false}
                    >
                        <TableSortLabel
                            // @ts-ignore
                            onClick={createSortHandler(row.id)}
                            active={orderBy === row.id}
                            direction={order}
                        >
                            {row.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
                <TableCell align="right" classes={{ root: styles.actionCell }}>
                    <MoreActionsMenu rowId={2001} />
                </TableCell>
            </TableRow>
        </TableHead>
    );
}

export interface SectionTableProps {
    rows: Section[];
    mergeActive: boolean;
    showInactive: boolean;
    onChangeSelected: (selected: string[]) => void;
}
type SectionOrderby = Omit<Section, 'active'>;

const SectionTable: React.FC<SectionTableProps> = memo(
    ({ rows, mergeActive, onChangeSelected }) => {
        const styles = useTableStyles({});
        const [order, setOrder] = React.useState<Order>('asc');

        const [orderBy, setOrderBy] = React.useState<keyof SectionOrderby>('name');
        const [selected, setSelected] = React.useState<string[]>([]);

        const {
            page,
            rowsPerPage,
            handleChangePage,
            handleChangeRowsPerPage,
            rowsPerPageOptions,
            maybeResetPage
        } = usePagination(10);

        const inProgressItems = useSelector(deriveRowsFromInProgress);

        maybeResetPage(rows);

        function handleRequestSort(
            event: React.MouseEvent<unknown>,
            property: keyof SectionOrderby
        ) {
            const isDesc = orderBy === property && order === 'desc';
            setOrder(isDesc ? 'asc' : 'desc');
            setOrderBy(property);
        }

        useEffect(() => {
            if (!mergeActive) {
                setSelected([]);
                onChangeSelected([]);
            }
        }, [mergeActive]);

        function handleClick(name: string) {
            return () => {
                if (!mergeActive) {
                    return;
                }
                const selectedIndex = selected.indexOf(name);
                let newSelected: string[] = [];

                if (selectedIndex === -1) {
                    newSelected = newSelected.concat(selected, name);
                } else if (selectedIndex === 0) {
                    newSelected = newSelected.concat(selected.slice(1));
                } else if (selectedIndex === selected.length - 1) {
                    newSelected = newSelected.concat(selected.slice(0, -1));
                } else if (selectedIndex > 0) {
                    newSelected = newSelected.concat(
                        selected.slice(0, selectedIndex),
                        selected.slice(selectedIndex + 1)
                    );
                }

                setSelected(newSelected);
                onChangeSelected(newSelected);
            };
        }

        const isSelected = (id: string) => selected.indexOf(id) !== -1;

        const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

        return (
            <Paper className={clsx(styles.paper)}>
                <div className={styles.tableWrapper}>
                    <EnhancedTableToolbar title="Sections" />
                    <Table className={styles.table} aria-labelledby="tableTitle" size="small">
                        <EnhancedTableHead
                            orderBy={orderBy}
                            order={order}
                            onRequestSort={handleRequestSort}
                            headRows={headRows}
                        />
                        <TableBody>
                            {stableSort(rows, getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(String(row.id));
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    const isAlreadyInProgress = Boolean(
                                        inProgressItems.find(
                                            ({ id }: { id: string }) => id === String(row.id)
                                        )
                                    );

                                    const rowDisabled =
                                        (!isItemSelected && selected.length > 1) ||
                                        (mergeActive && isAlreadyInProgress) ||
                                        row.active === false;

                                    return (
                                        <TableRow
                                            className={clsx(rowDisabled && styles.rowDisabled)}
                                            hover
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.name}
                                            selected={isItemSelected}
                                            onClick={handleClick(String(row.id))}
                                            data-testid={`section-row-item-${row.id}`}
                                        >
                                            <TableCell padding="checkbox">
                                                {mergeActive && (
                                                    <Checkbox
                                                        checked={isItemSelected}
                                                        inputProps={{ 'aria-labelledby': labelId }}
                                                    />
                                                )}
                                            </TableCell>

                                            <TableCell
                                                classes={{ root: styles.text }}
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                {row.name}
                                            </TableCell>
                                            <TableCell
                                                align="right"
                                                classes={{ root: styles.actionCell }}
                                            >
                                                <MoreActionsMenu
                                                    rowId={row.id}
                                                    data-testid={`more-actions-menu-${row.id}`}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 49 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    rowsPerPageOptions={rowsPerPageOptions}
                    component="div"
                    count={rows.length}
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
                />
            </Paper>
        );
    }
);

export default SectionTable;
