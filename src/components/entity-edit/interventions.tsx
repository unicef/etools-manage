import React, { useState, useEffect } from 'react';
import { InterventionEntity } from 'entities/types';
import Box from 'components/box';
import { EditProps } from 'entities';
import { Typography, Theme, Collapse } from '@material-ui/core';
import EditWrapper from 'pages/close-summary/edit-wrapper';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { makeStyles, createStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { useAppState } from 'contexts/app';
import { OptionType, SectionsSelectMulti } from 'components/dropdown';
import { keys, map, reject, head, compose, propEq } from 'ramda';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        item: {
            borderRadius: 8,
            marginBottom: theme.spacing(1)
        },
        containerPad: {
            padding: `${theme.spacing(1.5)}px ${theme.spacing(3)}px`
        },
        collapsableHeading: {
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: theme.spacing(1),
            backgroundColor: theme.palette.grey[100],
            '&:hover': {
                backgroundColor: theme.palette.grey[200]
            },
            cursor: 'pointer'
        },
        halfBorder: {
            borderRadius: `${theme.spacing(1)}px ${theme.spacing(1)}px 0 0`
        },
        collapseContent: {
            border: `1px solid ${theme.palette.divider}`,
            borderTop: 'none',
            borderRadius: `0 0 ${theme.spacing(1)}px ${theme.spacing(1)}px`
        },
        caption: {
            flex: 1
        },
        expand: {
            marginLeft: theme.spacing(4)
        },
        indicatorItem: {
            padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
            color: theme.palette.primary.contrastText
        },
        spacer: {
            width: 0,
            paddingRight: 40
        },
        dropdown: {
            marginLeft: theme.spacing(2),
            width: 335
        }

    })
);

export const IndicatorEditItem: React.FC = () => {
    const styles = useStyles();

    return <Box className={styles.indicatorItem} align="center">
        <div className={styles.spacer} />
        <Box>Indicator stuff</Box>
    </Box>;
};

export const InterventionEditItem: React.FC<InterventionEntity> = ({ number, title, sections, indicators }) => {
    const styles = useStyles();
    const {
        sections: allSections,
        closeSectionPayload
    } = useAppState();

    const [open, setOpen] = useState<boolean>(false);
    const [sectionsAsOptions, setSectionsAsOptions] = useState<OptionType[]>();

    useEffect(() => {
        if (allSections) {
            const id = compose(head, map(Number), keys)(closeSectionPayload);
            const sectionsWithoutClosingItem = reject(propEq('id', id), allSections);

            const asOptions = map(({ name }: {name: string}) => ({ label: name, value: name }), sectionsWithoutClosingItem);
            setSectionsAsOptions(asOptions);
        }
    }, [allSections]);

    const [numResolved, setNumResolved] = useState<string>('');

    // TODO: put this in builder and pass function to component
    useEffect(() => {
        let total = 1;
        let resolved = 0;
        if (sections.length) {
            resolved++;
        }
        indicators.forEach(
            indicator => {
                total++;
                if (indicator.section) {
                    resolved++;
                }
            }
        );
        setNumResolved(`${resolved} / ${total}`);
    }, [sections, indicators]);

    const handleCollapse = () => setOpen(!open);
    const headingStyle = clsx(styles.collapsableHeading, styles.containerPad, open && styles.halfBorder);
    return (
        <Box column className={styles.item}>
            <Box
                onClick={handleCollapse}
                className={headingStyle}
                align="center"
                justify="between">

                <Box column className={styles.caption}>
                    <Typography variant="subtitle2">{number}</Typography>
                    <Typography>{title}</Typography>
                </Box>

                <Typography color="secondary">{numResolved}</Typography>

                <Box className={styles.expand} align="center">
                    {open ? <ExpandLess /> : <ExpandMore />}
                </Box>
            </Box>
            <Collapse timeout={0} in={open} className={styles.collapseContent}>
                <Box className={styles.containerPad} align="center">
                    <Typography >Section(s) for PDSSFA: <i>{number}</i></Typography>
                    <Box className={styles.dropdown}>
                        <SectionsSelectMulti options={sectionsAsOptions}/>
                    </Box>
                </Box>


                <div >
                    <IndicatorEditItem />
                </div>
            </Collapse>
        </Box>
    );

};


type InterventionsEditProps = EditProps<InterventionEntity>
const InterventionsEdit: React.FC<InterventionsEditProps> = ({ list }) => {

    return (
        <EditWrapper title="Partnership Management Portal">
            {list && list.map(
                (intervention: InterventionEntity) => (
                    <InterventionEditItem
                        {...intervention}
                        key={intervention.number} />
                )
            )}
        </EditWrapper>

    );
};


export default InterventionsEdit;
