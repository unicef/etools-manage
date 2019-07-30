import React, { memo } from 'react';
import Box from 'components/box';
import { createStyles, Theme, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { ConfirmButton } from 'components/buttons';
import { useAppDispatch, useAppState } from 'contexts/app';
import { onSetLoading } from 'slices/root-store';

if (process.env.NODE_ENV !== 'production') {
    const whyDidYouRender = require('@welldone-software/why-did-you-render');
    whyDidYouRender(React, {
        onlyLogs: true,
        titleColor: 'teal'
    });
}


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            boxShadow: `0 0 0 2px ${theme.palette.secondary.main},0px 4px 4px 0px rgba(60,64,67,.3),0px 8px 12px 6px rgba(60,64,67,.15)`
        },
        itemRoot: {
            minHeight: 32,
            padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
            borderBottom: `1px solid ${theme.palette.divider}`
        },
        heading: {
            backgroundColor: theme.palette.secondary.main,
            borderRadius: '8px 8px 0 0',
            padding: `14px ${theme.spacing(3)}px ${theme.spacing(1)}px`

        },
        subtitle: {
            marginRight: theme.spacing(2)
        }
    }));


export interface CloseSummaryProps {
    modulesData: SummaryItemProps[];
    closingSection: string;
}

export interface SummaryItemProps {
    name: string;
    itemsResolved: string;
    onEdit: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
}

export const CloseSectionsSummary: React.FC<CloseSummaryProps> = memo(({ modulesData, closingSection }) => {
    const styles = useStyles();
    return (
        <Paper className={styles.paper}>
            <Box className={styles.heading} align="center">
                <Typography className={styles.subtitle} color="primary" variant="subtitle1">Closing section </Typography>
                <Typography color="primary">
                    <code>{closingSection}</code>
                </Typography>
            </Box>
            {
                modulesData.map(
                    module => (
                        <ModuleSummaryItem key={module.name} {...module} />
                    )
                )
            }
        </Paper>
    );
});
// @ts-ignore
CloseSectionsSummary.whyDidYouRender = true;


export const ModuleSummaryItem: React.FC<SummaryItemProps> = memo(({ name, itemsResolved, onEdit }) => {
    const styles = useStyles();
    const dispatch = useAppDispatch();

    return <Box className={styles.itemRoot} align="center" justify="between">

        <Typography variant="body2">{name}</Typography>

        <Typography variant="subtitle1">Resolved items: {itemsResolved}</Typography>

        <ConfirmButton onClick={onEdit}>Edit</ConfirmButton>
        <ConfirmButton onClick={() => dispatch(onSetLoading(true))}>Test</ConfirmButton>
    </Box>;
});

// @ts-ignore

ModuleSummaryItem.whyDidYouRender = true;
