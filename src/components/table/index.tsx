import React from 'react';
import { Typography, Toolbar, Tooltip, Theme } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';
import MergeIcon from '@material-ui/icons/MergeType';
import Button from '@material-ui/core/Button';
import EnhancedTable, { EnhancedTableToolbar } from 'components/sections-table';
import { HeadRow } from 'components/sections-table/table';
import { SectionEntity } from 'entities/section';
import { useAppState } from 'contexts/app';


export type SectionRow = HeadRow<SectionEntity>;

export const headRows: SectionRow[] = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
    { id: 'id', numeric: true, disablePadding: false, label: 'Id' }
];

const useToolbarStyles = makeStyles((theme: Theme) =>
    createStyles({
        spacer: {
            flex: '1 1 100%'
        },
        button: {
            margin: theme.spacing(1),
            color: theme.palette.primary.main
        }
    }));


export const SectionsToolbar = ({ numSelected }) => {
    const classes = useToolbarStyles({});

    return (
        <EnhancedTableToolbar title="Sections">
            <Tooltip title="Merge">
                <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    disabled={numSelected !== 2}
                    aria-label="Merge">
                            Merge
                    <MergeIcon />
                </Button>
            </Tooltip>
        </EnhancedTableToolbar>
    );
};
