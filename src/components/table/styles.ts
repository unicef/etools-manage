import { makeStyles, Theme, createStyles } from '@material-ui/core';


export const useTableStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            marginTop: theme.spacing(3)
        },
        paper: {
            width: '100%',
            marginBottom: theme.spacing(2)
            // boxShadow: '0 1px 2px 0 rgba(60,64,67,.3),0 1px 3px 1px rgba(60,64,67,.15)'
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
            height: 40,
            visibility: 'hidden',

            '.MuiTableRow-root.MuiTableRow-hover:hover &': {
                visibility: 'visible'
            }
        },
        tuck: {
            paddingRight: 0
        }
    }),
);
