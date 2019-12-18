import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const useEditItemStyles = makeStyles((theme: Theme) =>
    createStyles({
        item: {
            borderRadius: 8,
            marginBottom: theme.spacing(1)
        },
        itemBorderWrap: {
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: theme.spacing(1),
            backgroundColor: theme.palette.grey[100]
        },
        bottomMargin1: {
            marginBottom: theme.spacing(1)
        },
        description: {
            flex: '1 0 40%'
        },
        travel: {
            minHeight: 68,
            padding: theme.spacing(1)
        },
        travelDropdown: {
            alignSelf: 'center'
        },
        editItemHeading: {
            fontSize: 13,
            marginBottom: theme.spacing(1)
        },
        containerPad: {
            padding: `${theme.spacing(1.5)}px ${theme.spacing(3)}px`
        },
        collapsableHeading: {
            '&:hover': {
                backgroundColor: theme.palette.grey[200]
            }
        },
        halfBorder: {
            borderRadius: `${theme.spacing(1)}px ${theme.spacing(1)}px 0 0`
        },
        collapseContent: {
            border: `1px solid ${theme.palette.divider}`,
            borderTop: 'none',
            borderRadius: `0 0 ${theme.spacing(1)}px ${theme.spacing(1)}px`
        },
        expand: {
            marginLeft: theme.spacing(1),
            cursor: 'pointer'
        },
        indicatorItem: {
            paddingBottom: theme.spacing(2)
        },
        indicator: {
            padding: '6px 24px 6px 16px',
            minHeight: theme.spacing(8)
        },
        spacer: {
            width: 0,
            paddingRight: 40
        },
        dropdown: {
            minWidth: 335,
            flex: 1
        },
        selectColumn: {
            marginLeft: theme.spacing(2)
        },
        indicatorDropdown: {
            maxHeight: 32,
            marginLeft: theme.spacing(6)
        },
        numResolved: {
            whiteSpace: 'nowrap',
            width: 32
        },
        refNum: {
            marginRight: theme.spacing(1)
        },
        travelRef: {
            margin: `0 ${theme.spacing(1)}px`
        },
        hideIcon: {
            visibility: 'hidden'
        },
        errorMsg: {
            margin: `0 ${theme.spacing(1)}px`
        },
        secondaryHeading: {
            fontSize: 12,
            width: '90%'
        }
    })
);
