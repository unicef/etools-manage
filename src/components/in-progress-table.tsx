import React, { useEffect } from 'react';
import { Paper, TableHead, TableRow, TableCell, TableBody, Table, IconButton, Button, Tooltip } from '@material-ui/core';
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';
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
import Box from './box';


const ProgressTableHead: React.FC = () => {
    const styles = useTableStyles();
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

const InProgressTable: React.FC = () => {

    const styles = useTableStyles();
    const rows = useSelector(deriveRowsFromInProgress);
    const dispatch = useDispatch();
    const { storageService } = useAppService();

    useEffect(() => {
        getInProgressItems(dispatch, storageService);
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
                                            onClick={() => null}>
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip title="Delete" placement="top">
                                        <IconButton
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

        </Paper>
    );
};

export default InProgressTable;
