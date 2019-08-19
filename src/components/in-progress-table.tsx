import React, { useEffect, useState } from 'react';
import { Paper, TableHead, TableRow, TableCell, TableBody, Table, IconButton, Tooltip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useTableStyles } from './table/styles';
import { EnhancedTableToolbar } from './sections-table';
import { useAppService } from 'contexts/app';
import { useSelector, useDispatch } from 'react-redux';
import { getInProgressItems } from 'actions';
import { deriveRowsFromInProgress } from 'selectors/in-progress-items';
import { InProgressItem } from 'entities/types';
import { capitalize } from 'utils';
import clsx from 'clsx';
import ConfirmDeleteDialog from './modals/confirm-dialog';
import { withRouter, RouteComponentProps } from 'react-router';
import { selectCountryName } from 'selectors/user';


const ProgressTableHead: React.FC = () => {
    return (
        <TableHead>
            <TableRow>
                <TableCell padding="default"
                    align="left"
                >
                        Action
                </TableCell>
                <TableCell>
                        Section
                </TableCell>
                <TableCell align="right" />
            </TableRow>
        </TableHead>
    );
};


const InProgressTable: React.FC<RouteComponentProps> = ({ history }) => {

    const styles = useTableStyles();
    const rows = useSelector(deriveRowsFromInProgress);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
    const [rowToDelete, setRowToDelete] = useState<InProgressItem | undefined>(undefined);
    const dispatch = useDispatch();
    const { storageService } = useAppService();
    const countryName = useSelector(selectCountryName);

    const handleDelete = (row: InProgressItem) => () => {
        setDeleteDialogOpen(true);
        setRowToDelete(row);
    };

    const handleClickEdit = (row: InProgressItem) => () => {
        history.push(`/${row.action}/${row.id}`);
    };

    useEffect(() => {
        getInProgressItems(storageService, countryName, dispatch);
    }, []);


    return (
        <Paper className={styles.paper}>
            <EnhancedTableToolbar title="In Progress" />
            <Table size="small">
                <ProgressTableHead />

                <TableBody >
                    {rows.map(
                        (row: InProgressItem) => (
                            <TableRow key={row.name}>
                                <TableCell>{capitalize(row.action)}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell align="right">
                                    <Tooltip title ="Edit" placement="top">
                                        <IconButton
                                            color="secondary"
                                            className={styles.icon}
                                            size="small"
                                            onClick={handleClickEdit(row)}>
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip title="Delete" placement="top">
                                        <IconButton
                                            onClick={handleDelete(row)}
                                            size="small"
                                            className={clsx(styles.icon, styles.rightIcon)}
                                            edge="end" aria-label="delete">
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>

                                </TableCell>

                            </TableRow>
                        )
                    )}

                </TableBody>
            </Table>

            <ConfirmDeleteDialog
                open={deleteDialogOpen}
                handleClose={() => setDeleteDialogOpen(false)}
                rowToDelete={rowToDelete}
            />

        </Paper>
    );
};

export default withRouter(InProgressTable);
