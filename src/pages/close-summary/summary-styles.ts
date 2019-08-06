import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { lighten } from '@material-ui/core/styles';


export const useSummaryStyles = makeStyles((theme: Theme) =>
    createStyles({
        itemSpacing: {
            minHeight: 32,
            padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`
        },
        itemRoot: {
            borderBottom: `1px solid ${theme.palette.divider}`,
            color: theme.palette.primary.contrastText
        },
        titleSize: {
            fontSize: 16
        },
        heading: {
            borderRadius: '8px 8px 0 0',
            padding: `14px ${theme.spacing(3)}px ${theme.spacing(1)}px`,
            color: theme.palette.primary.contrastText
        },
        lightSecondary: {
            borderBottom: `1px solid ${theme.palette.divider}`,
            backgroundColor: lighten(theme.palette.secondary.main, 0.5)
        },
        subtitle: {
            marginRight: theme.spacing(2)
        },
        progressBar: {
            margin: `${theme.spacing(3)}px 0 ${theme.spacing(1)}px`
        },
        moduleCell: {
            width: '35%',
            marginRight: theme.spacing(4)
        },
        infoMsg: {
            padding: theme.spacing(3)
        },
        section: {
            marginBottom: theme.spacing(3)
        },
        flex2: {
            flex: 2
        }
    }));
