import React, { useState, useEffect } from 'react';
import { Paper, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { useTableStyles } from './table/styles';
import { EnhancedTableToolbar } from './sections-table';
import { useAppService } from 'contexts/app';
import { useSelector, useDispatch } from 'react-redux';
import { getInProgressItems } from 'actions';


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
                <TableCell>
                        Button
                </TableCell>
            </TableRow>
        </TableHead>
    );
};

const InProgressTable: React.FC = () => {

    const styles = useTableStyles();
    const rows = useSelector(selectInProgressItems);

    const dispatch = useDispatch();
    const { storageService } = useAppService();

    useEffect(() => {
        getInProgressItems(dispatch, storageService);
    }, []);


    return (
        <Paper className={styles.paper}>
            <EnhancedTableToolbar title="In Progress" />
            <ProgressTableHead />

            <TableBody />
        </Paper>
    );
};

export default InProgressTable;
