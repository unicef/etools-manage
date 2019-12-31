import React, { memo } from 'react';
import { ResolvedRatio } from 'entities/types';
import Box from 'components/box';
import clsx from 'clsx';
import { Typography, Button } from '@material-ui/core';
import { useSummaryStyles } from './summary-styles';
import { buildResolvedProgressString } from 'lib/sections';

export interface SummaryItemProps {
    name: string;
    itemsResolved: ResolvedRatio;
    onEdit: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
}

export const ModuleSummaryItem: React.FC<SummaryItemProps> = memo(
    ({ name, itemsResolved, onEdit, ...props }) => {
        const styles = useSummaryStyles();

        return (
            <Box
                className={clsx(styles.itemRoot, styles.itemSpacing)}
                align="center"
                justify="between"
                {...props}
            >
                <Typography color="inherit" className={styles.moduleCell} variant="body2">
                    {name}
                </Typography>

                <Typography color="inherit" className={styles.flex2} variant="body2">
                    Resolved items: {buildResolvedProgressString(itemsResolved)}
                </Typography>

                <Button variant="outlined" onClick={onEdit}>
                    Edit
                </Button>
            </Box>
        );
    }
);
