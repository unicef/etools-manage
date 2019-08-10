import { makeStyles, Theme, createStyles } from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';


export const useModalStyles = makeStyles((theme: Theme) =>
    createStyles({
        header: {
            color: theme.palette.text.hint,
            marginBottom: theme.spacing(2)
        },
        subtitle: {
            fontWeight: 500,
            fontSize: 14,
            height: 16,
            lineHeight: '20px',
            paddingLeft: theme.spacing(1)
        },
        subHeading: {
            fontSize: '.75rem',
            fontWeight: 500,
            color: theme.palette.action.active
        },
        entity: {
            color: theme.palette.secondary.contrastText,
            fontSize: '1.5rem',
            fontWeight: 500,
            lineHeight: '2rem'
        },
        input: {
            fontSize: '1.5rem',
            height: 28,
            paddingLeft: 0,
            fontWeight: 400,
            color: '#3c4043'
        },
        inputFocused: {
            backgroundColor: theme.palette.primary.main,
            boxShadow: '0 0 0 2px transparent inset, 0 0 0 1px #e0e0e0 inset'
        },
        confirmBtn: {
            width: 86,
            marginLeft: theme.spacing(1),
            color: theme.palette.primary.main
        },
        summaryContainer: {
            marginTop: theme.spacing(2),
            '& >*': {
                paddingRight: theme.spacing(4)
            }
        },
        closeBtn: {
            marginTop: theme.spacing(3),
            alignSelf: 'flex-end'
        }
    }));


export const useReviewTableStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            margin: `${theme.spacing(3)}px 0`
        },
        tableBody: {
            height: 328,
            overflow: 'scroll'
        },
        cellStyle: {
            fontSize: '0.75rem'

        },
        wrapLong: {
            whiteSpace: 'normal',
            width: '45%'
        },
        noWrap: {
            whiteSpace: 'nowrap'
        },

        subtitle: {
            fontWeight: 500,
            height: 16,
            lineHeight: '20px'
        },
        backBtn: {
            alignSelf: 'baseline'
        }

    }));
