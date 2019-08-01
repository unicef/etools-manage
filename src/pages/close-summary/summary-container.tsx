import React, { memo } from 'react';
import Box from 'components/box';
import { createStyles, Theme, Typography, Paper, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { ConfirmButton } from 'components/buttons';
import clsx from 'clsx';
import { buildResolvedProgressString } from 'lib/sections';

// if (process.env.NODE_ENV !== 'production') {
//     const whyDidYouRender = require('@welldone-software/why-did-you-render');
//     whyDidYouRender(React, {
//         onlyLogs: true,
//         titleColor: 'teal'
//     });
// }


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
            borderRadius: '8px 8px 0 0',
            padding: `14px ${theme.spacing(3)}px ${theme.spacing(1)}px`
        },
        lightSecondary: {
            backgroundColor: theme.palette.secondary.light
        },
        subtitle: {
            marginRight: theme.spacing(2)
        },
        moduleName: {
            width: '25%'
        }
    }));


export interface CloseSummaryProps {
    modulesData: SummaryItemProps[];
    closingSection: string;
}

export interface SummaryItemProps {
    name: string;
    itemsResolved: number[];
    onEdit: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
}

export const CloseSectionsSummary: React.FC<CloseSummaryProps> = memo(({ modulesData, closingSection }) => {
    const styles = useStyles();
    return (
        <Container maxWidth="sm">
            <Paper className={styles.paper}>
                <Box className={clsx(styles.heading, styles.lightSecondary)} align="center">
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
            </Paper></Container>
    );
});


export const ModuleSummaryItem: React.FC<SummaryItemProps> = memo(({ name, itemsResolved, onEdit }) => {
    const styles = useStyles();

    return <Box className={styles.itemRoot} align="center" justify="between">

        <Typography className={styles.moduleName} variant="body2">{name}</Typography>

        <Typography variant="body2">Resolved items: {buildResolvedProgressString(...itemsResolved)}</Typography>

        <ConfirmButton onClick={onEdit}>Edit</ConfirmButton>
    </Box>;
});

