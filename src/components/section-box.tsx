
import React from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme, Typography } from '@material-ui/core';
import Box from './box';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        reviewBox: {
            background: 'rgba(236,239,241,.38)',
            marginBottom: theme.spacing(2),
            padding: theme.spacing(1)

        },
        section: {
            lineHeight: 'inherit',
            flex: 1
        },
        name: {
            fontSize: 12,
            color: theme.palette.text.hint
        },
        sectionName: {
            color: theme.palette.primary.contrastText
        }

    }),
);

interface SectionBoxProps {
    name: string;
    className?: string;
}

export const SectionBox: React.FC<SectionBoxProps> = ({ name, className='' }) => {
    const styles = useStyles({});
    const rootStyle = clsx({
        [className]: true,
        [styles.section]: true
    });

    return (
        <Box column className={rootStyle}>
            <Typography className={styles.sectionName} variant="h6">{name}</Typography>
        </Box>
    );
};

export const ReviewBox: React.FC = ({ children }) => {
    const styles = useStyles({});
    return (
        <Box column className={styles.reviewBox}>
            {children}
        </Box>
    );
};
