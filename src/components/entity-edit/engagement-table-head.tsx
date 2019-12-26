import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Box from 'components/box';
import { useEditItemStyles } from './styles';
import clsx from 'clsx';
import { Theme } from '@material-ui/core';

export const useEngagementEditTableStyles = makeStyles((theme: Theme) => ({
    heading: {
        fontSize: '0.75rem',
        fontWeight: 500,
        lineHeight: '1.3125rem',
        color: '#5f6368',
        marginRight: theme.spacing(1),
        '&:first-of-type': {
            marginLeft: 0
        },
        '&:last-of-type': {
            marginRight: 0
        }
    },
    unique: {
        width: '17%'
    },
    audit: {
        width: '12%'
    },
    partner: {
        width: '12%'
    },
    type: {
        width: '10%'
    },
    status: {
        width: '11%'
    },
    existing: {
        width: '15%',
        whiteSpace: 'normal!important' as 'normal'
    },
    sections: {
        minWidth: 290
    }
}));

export default function EngagementEditTableHeading() {
    const styles = useEngagementEditTableStyles();
    const editStyles = useEditItemStyles();
    return (
        <Box className={editStyles.containerPad}>
            <span className={clsx(styles.heading, styles.unique)}>Unique Id</span>
            <span className={clsx(styles.heading, styles.audit)}>Audit Firm</span>
            <span className={clsx(styles.heading, styles.partner)}>Partner Name</span>
            <span className={clsx(styles.heading, styles.type)}>Engagement Type</span>
            <span className={clsx(styles.heading, styles.status)}>Status</span>
            <span className={clsx(styles.heading, styles.existing)}>Existing Sections</span>
            <span className={clsx(styles.heading, styles.sections)}>Sections</span>
        </Box>
    );
}
