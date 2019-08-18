import { makeStyles, Theme, createStyles } from '@material-ui/core';


export const useTableStyles = makeStyles((theme: Theme) =>
    createStyles({
        toggleRow: {
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(1),
            marginLeft: 0
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
            width: 42,
            '&:last-child': {
                paddingRight: 0

            }
        },
        icon: {
            width: 40,
            height: 40
        },
        rightIcon: {
            marginLeft: theme.spacing(1)
        },

        showOnHover: {
            visibility: 'hidden',
            '.MuiTableRow-root.MuiTableRow-hover:hover &': {
                visibility: 'visible'
            }
        },
        tuck: {
            paddingRight: 0
        },
        rowDisabled: {
            opacity: 0.5,
            cursor: 'default',
            pointerEvents: 'none'
        }
    }),
);


export const useIconButtonStyles = makeStyles((theme: Theme) =>
    createStyles({
        icon: {
            padding: 0,
            '&:hover': {
                backgroundColor: 'inherit',
                color: theme.palette.getContrastText('#fff')
            }
        }
    }));
