import { makeStyles, Theme, createStyles } from '@material-ui/core';

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
            whiteSpace: 'normal'
        },
        w45: {
            width: '45%'
        },
        w20: {
            width: '20%'
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
    })
);
