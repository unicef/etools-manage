import React, { useState } from 'react';
import Box from '../box';
import { IconButton, Menu, MenuItem, Typography, Theme } from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';
import MoreVerticalIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import SplitIcon from '@material-ui/icons/CallSplit';
import clsx from 'clsx';
import { useTableStyles } from '../table/styles';
import { makeStyles, createStyles } from '@material-ui/styles';
import { useModalsDispatch } from 'contexts/page-modals';
import { onToggleSplitModal } from 'reducers/modals';
import { onCurrentActiveSection } from 'reducers/current-active-section';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserProfile, selectCountryName } from 'selectors/user';
import { useAppService } from 'contexts/app';
import { getCloseSectionUrl, getSplitSectionPrefixKey, getSplitSectionUrl } from 'lib/sections';
import { deriveRowsFromInProgress } from 'selectors/in-progress-items';
import { includes } from 'ramda';
import { SectionAction } from 'entities/types';

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
    rowId: number;
    hidden?: boolean;
    className?: string | undefined;
}

// TODO: add onClick to menu items
export default function MoreActions({ rowId, className = '' }: RowActionsProps) {
    const styles = useTableStyles();
    const menuStyles = useMenuStyles();
    const [redirect, setRedirect] = useState<boolean>(false);
    const modalsDispatch = useModalsDispatch();
    const dispatch = useDispatch();

    const inProgressItems = useSelector(deriveRowsFromInProgress);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const countryName = useSelector(selectCountryName);

    const {
        storageService
    } = useAppService();


    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    function redirectIfSplitExists() {
        const splitKey = getSplitSectionPrefixKey({ id: String(rowId), countryName });
        const newNamesFromSplit = storageService.getStoredEntitiesData(splitKey);
        if (newNamesFromSplit) {
            setRedirect(true);
            modalsDispatch(onToggleSplitModal);
        }
    }

    function handleClickSplit() {
        dispatch(onCurrentActiveSection(Number(rowId)));
        redirectIfSplitExists();
        modalsDispatch(onToggleSplitModal);
        handleClose();
    }

    if (redirect) {
        return <Redirect push to={getSplitSectionUrl(String(rowId))} />;
    }

    function isDisabled(actionType: SectionAction) {
        const isInprogressItem = inProgressItems.find(({ id }: {id: string}) => id === String(rowId));
        if (isInprogressItem) {
            return isInprogressItem.action !== actionType;
        }
        return false;
    }

    return (
        <Box >
            <IconButton
                onClick={handleClick}
                className={clsx(className, styles.icon, styles.showOnHover)}
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

                <MenuItem disabled={isDisabled('close')} classes={{ root: menuStyles.listItem }}>
                    <Link to={getCloseSectionUrl(String(rowId))}>
                        <Box>
                            <DeleteIcon className={menuStyles.icon} color="secondary" />
                            <Typography variant="body1">Close section</Typography>
                        </Box>
                    </Link>
                </MenuItem>
                <MenuItem disabled={isDisabled('split')} classes={{ root: menuStyles.listItem }} onClick={handleClickSplit}>
                    <SplitIcon className={menuStyles.icon} color="secondary" />
                    <Typography>Split section</Typography>
                </MenuItem>
            </Menu>
        </Box>
    );
}
