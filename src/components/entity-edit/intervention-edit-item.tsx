import React, { memo, useState, useEffect, lazy, Suspense } from 'react';
import { InterventionEntity, SectionEntity, InterventionSectionPayload } from 'entities/types';
import { useEditInterventionStyles } from './styles';
import { OptionType, DropdownMulti } from 'components/dropdown';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { keys, map, reject, head, compose, propEq, over, T, lensPath, always, filter, includes, prop, find, view, cond, isNil, equals } from 'ramda';
import { useAppState, useAppDispatch } from 'contexts/app';
import { ValueType } from 'react-select/src/types';
import Box from 'components/box';
import { Typography, Collapse } from '@material-ui/core';
import clsx from 'clsx';
import { selectSectionsAsOptions } from 'selectors';
import { onUpdateInterventionSection } from 'pages/close-summary/actions';
import LoadingFallback from 'components/loading-fallback';
import { selectInterventionsFromPayload } from 'selectors/interventions';

const IndicatorEditItem = lazy(() => import('./indicator-edit-item'));

if (process.env.NODE_ENV !== 'production') {
    const whyDidYouRender = require('@welldone-software/why-did-you-render');
    whyDidYouRender(React, {
        onlyLogs: true,
        titleColor: 'teal'
    });
}


interface InterventionEditItemProps {
    idx: number;
}

export const InterventionEditItem: React.FC<InterventionEditItemProps> = memo(({ idx }) => {
    const styles = useEditInterventionStyles();
    const state = useAppState();
    const interventions = selectInterventionsFromPayload(state);
    const currentInterventionState = interventions[idx];
    const dispatch = useAppDispatch();

    const {
        sections: allSections
    } = state;

    console.log('render edit item!');
    const [interventionState, setInterventionState] = useState<InterventionEntity>(currentInterventionState);

    const [open, setOpen] = useState<boolean>(false);

    const sectionsAsOptions = selectSectionsAsOptions(state);

    const selectedSectionIds = map(prop('id'), interventionState.sections);

    const selectedSections = sectionsAsOptions.filter((option: OptionType) => includes(option.value, selectedSectionIds));


    // temp
    const numResolved = '0/0';

    const onChange = (intervention: InterventionEntity) => {
        // const updateState = over(path, always(intervention));
        // const storagePayload: CloseSectionPayload = { [closeSectionId]: updateState(closeSectionPayload) };
        const storePayload: InterventionSectionPayload = {
            idx,
            sections: intervention.sections
        };
        // onUpdateStorage(storageService, storagePayload);
        onUpdateInterventionSection(storePayload, dispatch);
    };


    useEffect(() => {
        if (interventionState) {
            onChange(interventionState);
        }
    }, [interventionState]);


    const handleChangeInterventionSections = (value: ValueType<OptionType>) => {
        const valueOrDefault = cond([
            [isNil, always([])],
            [T, map(prop('value'))]
        ]);
        const selectedSections = filter((section: SectionEntity) => includes(section.id, valueOrDefault(value)), allSections);
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
        setInterventionState(newState);
    };

    const handleCollapse = () => setOpen(!open);
    const headingStyle = clsx(styles.collapsableHeading, styles.containerPad, open && styles.halfBorder);
    const { number, title, indicators } = interventionState;
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

                    <Typography color="secondary" className={styles.numResolved}>{numResolved}</Typography>

                    {indicators.length ? <Box
                        onClick={handleCollapse}
                        className={styles.expand}
                        align="center">
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </Box> : null}
                </Box>
            </Box>
            <Collapse timeout={0} in={open} className={styles.collapseContent}>
                <Box className={styles.containerPad} align="center">
                    <Typography ><i>Applied indicators</i></Typography>
                </Box>

                <div >
                    <Suspense fallback={ <LoadingFallback/> }>
                        <IndicatorEditItem
                            onChange={handleChangeIndicators}
                            sectionOptions={selectedSections}
                            indicators={indicators}/>
                    </Suspense>

                </div>
            </Collapse>
        </Box>
    );

});


// @ts-ignore
InterventionEditItem.whyDidYouRender = true;
