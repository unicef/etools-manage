import { makeStyles, Theme, createStyles } from '@material-ui/core';


export const useModalStyles = makeStyles((theme: Theme) =>
    createStyles({
        header: {
            color: theme.palette.text.hint,
            marginBottom: theme.spacing(2)
        },
        icon: {
            fontSize: 24
        },
        subtitle: {
            fontWeight: 500,
            fontSize: 14,
            height: 16,
            lineHeight: '20px',
            paddingLeft: theme.spacing(1)
        },
        inputHeight: {
            height: 'auto'
        },
        input: {
            fontSize: '0.875rem',
            backgroundColor: '#f1f3f4',
            color: theme.palette.text.secondary,
            borderRadius: 4,
            height: 'auto',
            boxShadow: '0 0 0 2px transparent inset, 0 0 0 1px #e0e0e0 inset'

        },
        inputFocused: {
            backgroundColor: theme.palette.primary.main,
            boxShadow: '0 0 0 2px transparent inset, 0 0 0 1px #e0e0e0 inset'

        },
        formRoot: {
            '& label.Mui-focused': {
                color: '#202124'
            }
        },
        formLabel: {
            color: theme.palette.text.primary,
            marginBottom: theme.spacing(1)
        },
        confirmBtn: {
            marginLeft: theme.spacing(1),
            color: theme.palette.primary.main
        }
    }));


