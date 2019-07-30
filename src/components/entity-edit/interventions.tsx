import React, { useState, useEffect, useCallback } from 'react';
import { InterventionEntity, IndicatorEntity, SectionEntity, CloseSectionPayload } from 'entities/types';
import Box from 'components/box';
import { EditProps } from 'entities';
import { Typography, Theme, Collapse } from '@material-ui/core';
import EditWrapper from 'pages/close-summary/edit-wrapper';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { makeStyles, createStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { useAppState, useAppDispatch, useAppService } from 'contexts/app';
import { OptionType, DropdownMulti, Dropdown } from 'components/dropdown';
import { keys, map, reject, head, compose, propEq, over, lensPath, always, filter, includes, prop, find, concat, view } from 'ramda';
import { ValueType } from 'react-select/src/types';
import { onUpdatePayload } from 'pages/close-summary/actions';


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
            }
        },
        halfBorder: {
            borderRadius: `${theme.spacing(1)}px ${theme.spacing(1)}px 0 0`
        },
        collapseContent: {
            border: `1px solid ${theme.palette.divider}`,
            borderTop: 'none',
            borderRadius: `0 0 ${theme.spacing(1)}px ${theme.spacing(1)}px`
        },
        expand: {
            marginLeft: theme.spacing(4),
            cursor: 'pointer'
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
            margin: `0 ${theme.spacing(2)}px`,
            width: 335
        }

    })
);

interface IndicatorsProps {
    indicators: IndicatorEntity[];
    sectionOptions: SectionEntity[];
    onChange: ((idx: number) => (value: ValueType<OptionType>) => void);
}

export const IndicatorEditItem: React.FC<IndicatorsProps> = ({ indicators, sectionOptions, onChange }) => {
    const styles = useStyles();
    const [asOptions, setAsOptions] = useState<OptionType[]>([]);

    useEffect(() => {
        setAsOptions(sectionOptions.map(
            ({ name, id }) => ({ label: name, value: id })
        ));
    }, [sectionOptions]);

    const getValue = (section: number | undefined) => {
        const res = find(propEq('value', section), asOptions);
        return res === undefined ? null : res;
    };
    console.log('Indicators changed ', indicators);
    return <Box className={styles.indicatorItem} align="center">
        <div className={styles.spacer} />
        <Box column>
            { indicators.map(
                ({ title, section }, idx) => (
                    <Box key={title}
                        align="center"
                        justify="between">
                        <Typography >{title}</Typography>
                        <Dropdown
                            value={getValue(section)}
                            onChange={onChange(idx)}
                            options={asOptions} />
                    </Box>
                )
            )}
        </Box>
    </Box>;
};


interface InterventionEditItemProps extends InterventionEntity {
    onChange: ((intervention: Partial<InterventionEntity>) => void);
}
export const InterventionEditItem: React.FC<InterventionEditItemProps> = ({ number, title, sections, indicators, id, onChange }) => {
    const styles = useStyles();
    const currentInterventionState = { number, title, sections, indicators, id };
    const {
        sections: allSections,
        closeSectionPayload
    } = useAppState();

    const [interventionState, setInterventionState] = useState<Partial<InterventionEntity> | undefined>();

    const [open, setOpen] = useState<boolean>(false);
    const [sectionsAsOptions, setSectionsAsOptions] = useState<OptionType[]>();
    const [selectedSections, setSelectedSections] = useState<OptionType[]>();

    useEffect(() => {
        if (allSections) {
            const id = compose(head, map(Number), keys)(closeSectionPayload);
            const sectionsWithoutClosingItem = reject(propEq('id', id), allSections);

            const asOptions = map(({ name, id }: {name: string; id: number}) => ({ label: name, value: id }), sectionsWithoutClosingItem);
            setSectionsAsOptions(asOptions);
            const selectedSectionIds = map(prop('id'), sections);
            const selectedOptions = asOptions.filter((option: OptionType) => includes(option.value, selectedSectionIds));
            setSelectedSections(selectedOptions);
        }
    }, [allSections, sections]);

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

    useEffect(() => {
        if (interventionState) {
            onChange(interventionState);
        }
    }, [interventionState]);

    const handleChangeInterventionSections = (value: ValueType<OptionType>) => {
        const selectedSections = filter((section: SectionEntity) => includes(section.id, map(prop('value'), value)), allSections);
        const newState = over(lensPath(['sections']), always(selectedSections), currentInterventionState);
        setInterventionState(newState);
    };

    const handleChangeIndicators = (idx: number) => (value: ValueType<OptionType>) => {
        const selectedSection = find(propEq('name', prop('label', value)), allSections);
        const selectedSectionId = prop('id', selectedSection);

        const sectionLens = lensPath(['indicators', idx, 'section']);
        const currentSelected = view(sectionLens, currentInterventionState);

        let newSectionId;

        // removes selection when same one is clicked
        if (currentSelected !== selectedSectionId) {
            newSectionId = selectedSectionId;
        }

        const newState = over(sectionLens, always(newSectionId), currentInterventionState);
        console.log('TCL: handleChangeIndicators -> newState', newSectionId);
        setInterventionState(newState);
    };

    const handleCollapse = () => setOpen(!open);
    const headingStyle = clsx(styles.collapsableHeading, styles.containerPad, open && styles.halfBorder);
    return (
        <Box column className={styles.item}>
            <Box
                className={headingStyle}
                align="center"
                justify="between">

                <Box column>
                    <Typography variant="subtitle2">{number}</Typography>
                    <Typography>{title}</Typography>
                </Box>
                <Box align="center">
                    <Box className={styles.dropdown}>
                        <DropdownMulti
                            value={selectedSections}
                            onChange={handleChangeInterventionSections}
                            options={sectionsAsOptions}/>
                    </Box>

                    <Typography color="secondary">{numResolved}</Typography>

                    <Box
                        onClick={handleCollapse}
                        className={styles.expand}
                        align="center">
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </Box>
                </Box>
            </Box>
            <Collapse timeout={0} in={open} className={styles.collapseContent}>
                <Box className={styles.containerPad} align="center">
                    <Typography >Section(s) for PDSSFA: <i>{number}</i></Typography>

                </Box>

                <div >
                    <IndicatorEditItem
                        onChange={handleChangeIndicators}
                        sectionOptions={allSections}
                        indicators={indicators}/>
                </div>
            </Collapse>
        </Box>
    );

};


type InterventionsEditProps = EditProps<InterventionEntity>
const InterventionsEdit: React.FC<InterventionsEditProps> = ({ list, closeSectionPayloadKey: key }) => {
    const {
        closeSectionPayload
    } = useAppState();

    const dispatch = useAppDispatch();
    const { storageService } = useAppService();

    const createOnChange = (idx: number) => {

        const path = lensPath([key, 'interventions', idx]);

        return (intervention: Partial<InterventionEntity>) => {
            const updateState = over(path, always(intervention));
            const newPayload: CloseSectionPayload = updateState(closeSectionPayload);
            onUpdatePayload(storageService, newPayload, dispatch);
        };
    };

    return (
        <EditWrapper title="Partnership Management Portal">
            {list && list.map(
                (intervention: InterventionEntity, idx: number) => (
                    <InterventionEditItem
                        onChange={createOnChange(idx)}
                        {...intervention}
                        key={intervention.number} />
                )
            )}
        </EditWrapper>

    );
};


export default InterventionsEdit;
