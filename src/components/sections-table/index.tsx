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
import { Order, EnhancedTableHeadProps, TableToolbarProps, EntityRow } from './table';
import { SectionEntity } from 'entities/section-entity';


function desc<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}


function stableSort<T>(array: T[], cmp: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}


function getSorting<K extends keyof any>(
    order: Order,
    orderBy: K,
): (a: { [key in K]: number | string }, b: { [key in K]: number | string }) => number {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}


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
                            onClick={createSortHandler(row.id as keyof SectionEntity)}
                            active={orderBy === row.id}
                            direction={order}
                        >
                            {row.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
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
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

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

    function handleChangePage(event: unknown, newPage: number) {
        setPage(newPage);
    }

    function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement>) {
        setRowsPerPage(Number(event.target.value));
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
                                    const isItemSelected = isSelected(row.id);
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
                                            <TableCell align="right">{row.id}</TableCell>
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
                rowsPerPageOptions={[5, 10, 25]}
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
