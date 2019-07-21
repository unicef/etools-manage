import React from 'react';
import Box from './box';
import { IconButton, Menu, MenuItem, Typography, Theme } from '@material-ui/core';
import MoreVerticalIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import SplitIcon from '@material-ui/icons/CallSplit';
import clsx from 'clsx';
import { useTableStyles } from './table/styles';
import { makeStyles, createStyles } from '@material-ui/styles';
import { SectionEntity } from 'entities/types';

const useMenuStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            transformOrigin: 'left top 0px',
            boxShadow: '0 1px 2px 0 rgba(60,64,67,.3),0 2px 6px 2px rgba(60,64,67,.15)'
        },
        icon: {
            height: 20,
            width: 24,
            marginRight: theme.spacing(1)
        },
        listItem: {
            minHeight: 32,
            padding: `6px ${theme.spacing(2)}px`
        }
    }));


interface RowActionsProps {
    row?: SectionEntity;
    hidden?: boolean;
    className?: string | undefined;
}

export default function MoreActions({ row, className = '' }: RowActionsProps) {
    const styles = useTableStyles();
    const menuStyles = useMenuStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    return (
        <Box >
            <IconButton
                onClick={handleClick}
                className={clsx(className, styles.icon)}
                size="small"
                aria-label="More Actions">
                <MoreVerticalIcon/>
            </IconButton>

            <Menu
                transitionDuration={10}
                classes={{ paper: menuStyles.root }}
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}>

                <MenuItem classes={{ root: menuStyles.listItem }}>
                    <DeleteIcon className={menuStyles.icon} color="secondary" />
                    <Typography>Close section</Typography>
                </MenuItem>
                <MenuItem classes={{ root: menuStyles.listItem }}>
                    <SplitIcon className={menuStyles.icon} color="secondary" />
                    <Typography>Split section</Typography>
                </MenuItem>
            </Menu>
        </Box>
    );
}
