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
import DeleteIcon from '@material-ui/icons/Delete';
import { Order, EnhancedTableHeadProps, TableToolbarProps, EntityRow, SectionHeadRow } from '../table/table';
import { SectionEntity } from 'entities/types';
import { usePagination } from 'components/table';
import { stableSort, getSorting } from 'components/table/table-utils';
import { IconButton } from '@material-ui/core';
import Box from 'components/box';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            marginTop: theme.spacing(3)
        },
        paper: {
            width: '100%',
            marginBottom: theme.spacing(2)
        },
        table: {
            minWidth: 750
        },
        tableWrapper: {
            overflowX: 'auto'
        },
        text: {
            color: theme.palette.text.secondary
        },
        actionCell: {
            display: 'flex',
            alignItems: 'center'
        },
        tablePad: {
            padding: `${theme.spacing(1)}px`,
            paddingRight: `${theme.spacing(2)}`,
            height: theme.spacing(6)
        },
        icon: {
            margin: `0 ${theme.spacing(1)}px`
        },
        idCol: {
            width: 32
        }
    }),
);


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


    }),
);

export const EnhancedTableToolbar = ({ title, children, className }: TableToolbarProps) => {
    const classes = useToolbarStyles({});

    return (
        <Toolbar
            className={clsx(classes.root, className)}
        >
            <div className={classes.title}>
                <Typography variant="h6" id="tableTitle">
                    {title}
                </Typography>

            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
                {children}
            </div>
        </Toolbar>
    );
};


const headRows: EntityRow<SectionEntity>[] = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
    { id: 'id', numeric: true, disablePadding: false, label: 'Id' }
];

export function EnhancedTableHead<SectionEntity>(props: EnhancedTableHeadProps<SectionEntity>) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property: keyof SectionEntity) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };
    const styles = useStyles({});

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox" />
                {headRows.map(row => (
                    <TableCell
                        key={row.id}
                        align={row.numeric ? 'right' : 'left'}
                        padding={row.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === row.id ? order : false}
                    >
                        <TableSortLabel
                            onClick={createSortHandler(row.id as keyof SectionHeadRow)}
                            active={orderBy === row.id}
                            direction={order}
                        >
                            {row.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
                <TableCell align="right">
                    <TableSortLabel
                        disabled
                    >
                            Actions
                    </TableSortLabel>
                </TableCell>
            </TableRow>
        </TableHead>
    );
}

export interface SectionTableProps {
    rows: SectionEntity[];
    mergeActive: boolean;
    onChangeSelected: (selected: string[]) => void;
}

const SectionTable: React.FC<SectionTableProps> = memo(({ rows = [], mergeActive, onChangeSelected }) => {
    const classes = useStyles({});
    const [order, setOrder] = React.useState<Order>('asc');

    const [orderBy, setOrderBy] = React.useState<keyof SectionEntity>('name');
    const [selected, setSelected] = React.useState<string[]>([]);
    const {
        page,
        rowsPerPage,
        handleChangePage,
        handleChangeRowsPerPage,
        rowsPerPageOptions
    } = usePagination();

    function handleRequestSort(event: React.MouseEvent<unknown>, property: keyof SectionEntity) {
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

    function handleClick(event: React.MouseEvent<unknown>, name: string) {
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
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
        onChangeSelected(newSelected);
    }

    const isSelected = (id: string) => selected.indexOf(id) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
        <Paper className={clsx(classes.paper, classes.root)}>
            <div className={classes.tableWrapper}>
                <Table
                    className={classes.table}
                    aria-labelledby="tableTitle"
                    size="medium"
                >
                    <EnhancedTableHead
                        orderBy={orderBy}
                        order={order}
                        onRequestSort={handleRequestSort}
                        headRows={headRows}
                    />
                    <TableBody>
                        {
                            stableSort(rows, getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    // @ts-ignore
                                    const isItemSelected = isSelected(String(row.id));
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.name}
                                            selected={isItemSelected}
                                            onClick={event => handleClick(event, String(row.id))}
                                        >
                                            <TableCell padding="checkbox">
                                                {mergeActive && <Checkbox
                                                    checked={isItemSelected}
                                                    disabled={!isItemSelected && selected.length > 1}
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />}
                                            </TableCell>

                                            <TableCell classes={{ body: classes.text }} component="th" id={labelId} scope="row" padding="none">
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="right" className={clsx(classes.actionCell, classes.tablePad)}>
                                                <Typography className={classes.idCol} variant="body2">{row.id}</Typography>
                                            </TableCell>
                                            <TableCell className={classes.tablePad} align="right">
                                                <RowActions row={row} />
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
});

export default SectionTable;

interface RowActionsProps {
    row?: SectionEntity;
}

function RowActions({ row }: RowActionsProps) {
    const styles = useStyles();
    return (
        <Box>
            <IconButton className={styles.icon} size="small" aria-label="Delete">
                <DeleteIcon/>
            </IconButton>
        </Box>
    );
}
