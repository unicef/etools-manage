
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const useEditInterventionStyles = makeStyles((theme: Theme) =>
    createStyles({
        item: {
            borderRadius: 8,
            marginBottom: theme.spacing(1)
        },
        containerPad: {
            padding: `${theme.spacing(1.5)}px ${theme.spacing(3)}px`
        },
        collapsableHeading: {
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: theme.spacing(1),
            backgroundColor: theme.palette.grey[100],
            '&:hover': {
                backgroundColor: theme.palette.grey[200]
            }
        },
        halfBorder: {
            borderRadius: `${theme.spacing(1)}px ${theme.spacing(1)}px 0 0`
        },
        description: {
            maxWidth: '50%'
        },
        collapseContent: {
            border: `1px solid ${theme.palette.divider}`,
            borderTop: 'none',
            borderRadius: `0 0 ${theme.spacing(1)}px ${theme.spacing(1)}px`
        },
        expand: {
            marginLeft: theme.spacing(4),
            cursor: 'pointer'
        },
        indicatorItem: {
            padding: `${theme.spacing(2)}px 0`
        },
        indicator: {
            padding: '6px 24px 6px 16px'
        },
        spacer: {
            width: 0,
            paddingRight: 40
        },
        dropdown: {
            margin: `0 ${theme.spacing(2)}px`,
            width: 335
        },
        hidden: {
            visibility: 'hidden'
        },
        indicatorDropdown: {
            maxHeight: 32,
            marginLeft: theme.spacing(6)
        },
        numResolved: {
            whiteSpace: 'nowrap'
        }

    })
);

