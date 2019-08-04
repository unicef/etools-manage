import React, { memo, useState, useEffect, lazy, Suspense } from 'react';
import { InterventionEntity, SectionEntity, InterventionSectionPayload, CloseSectionPayload } from 'entities/types';
import { useEditInterventionStyles } from './styles';
import { OptionType, DropdownMulti } from 'components/dropdown';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { keys, map, reject, head, compose, propEq, over, T, lensPath, always, filter, includes, prop, find, view, cond, isNil, equals } from 'ramda';
import { useAppState, useAppDispatch, useAppService } from 'contexts/app';
import { ValueType } from 'react-select/src/types';
import Box from 'components/box';
import { Typography, Collapse } from '@material-ui/core';
import clsx from 'clsx';
import { selectSectionsAsOptions, selectCurrentActiveSection, selectCloseSectionPayload } from 'selectors';
import { onUpdateInterventionSection, onUpdateStorage, onUpdateIntervention } from 'pages/close-summary/actions';
import LoadingFallback from 'components/loading-fallback';
import { selectInterventionsFromPayload } from 'selectors/interventions';
import { selectNumItemsResolved } from 'selectors/num-items-resolved';
import { valueOrDefault } from 'lib/sections';

const IndicatorEditItem = lazy(() => import('./indicator-edit-item'));

if (process.env.NODE_ENV !== 'production') {
    const whyDidYouRender = require('@welldone-software/why-did-you-render');
    whyDidYouRender(React, {
        onlyLogs: true,
        titleColor: 'teal'
    });
}


interface InterventionEditItemProps {
    id: number;
}

export const InterventionEditItem: React.FC<InterventionEditItemProps> = ({ id }) => {
    const styles = useEditInterventionStyles();
    const state = useAppState();
    const interventions = selectInterventionsFromPayload(state);
    const closeSectionPayload = selectCloseSectionPayload(state);
    console.log('TCL: closeSectionPayload', closeSectionPayload);
    const initialInterventionState = interventions[id];

    const dispatch = useAppDispatch();
    const { storageService } = useAppService();

    const {
        sections: allSections
    } = state;

    const [interventionState, setInterventionState] = useState<InterventionEntity>(initialInterventionState);

    const [open, setOpen] = useState<boolean>(false);

    const sectionsAsOptions = selectSectionsAsOptions(state);

    const selectedSections = sectionsAsOptions.filter((option: OptionType) => includes(option.value, interventionState.sections));

    const closeSectionId = selectCurrentActiveSection(state);
    // temp
    const numResolved = selectNumItemsResolved(state).interventions;

    const onChange = (intervention: InterventionEntity) => {
        const updateState = over(lensPath(['interventions', id]), always(intervention));
        const storagePayload: CloseSectionPayload = { [closeSectionId]: updateState(closeSectionPayload) };
        const storePayload: InterventionSectionPayload = {
            id,
            sections: intervention.sections
        };
        onUpdateInterventionSection(storePayload, dispatch);
        onUpdateStorage(storageService, storagePayload);
    };


    useEffect(() => {
        if (!equals(initialInterventionState, interventionState)) {
            onChange(interventionState);
        }
    }, [interventionState]);


    const handleChangeInterventionSections = (value: ValueType<OptionType>) => {

        const selectedSections = filter((section: SectionEntity) => includes(section.id, valueOrDefault(value)), allSections);
        const idsOnly = map(prop('id'), selectedSections);

        const newState = over(lensPath(['sections']), always(idsOnly), interventionState);
        setInterventionState(newState);
    };

    const handleChangeIndicators = (idx: number) => (value: ValueType<OptionType>) => {
        const selectedSection = find(propEq('name', prop('label', value)), allSections);
        const selectedSectionId = prop('id', selectedSection);

        const sectionLens = lensPath(['indicators', idx, 'section']);
        const currentSelected = view(sectionLens, interventionState);

        let newSectionId;

        // removes selection when same one is clicked
        if (currentSelected !== selectedSectionId) {
            newSectionId = selectedSectionId;
        }

        const newState = over(sectionLens, always(newSectionId), interventionState);
        const { indicators } = newState;
        console.log('TCL: handleChangeIndicators -> newState', newState);
        // onUpdateIntervention({ indicators, id }, dispatch); //
        setInterventionState(newState);
    };

    const handleCollapse = () => setOpen(!open);
    const headingStyle = clsx(styles.collapsableHeading, styles.containerPad, open && styles.halfBorder);
    const { number, title, indicators } = interventionState;

    return (
        <div className={styles.item}>
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

                    <Typography color="secondary" className={styles.numResolved}>{numResolved[0]}/{numResolved[1]}</Typography>

                    {indicators.length ? <Box
                        onClick={handleCollapse}
                        className={styles.expand}
                        align="center">
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </Box> : null}
                </Box>
            </Box>
            {open && <div className={styles.collapseContent}>
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
            </div>}
        </div>
    );

};


// @ts-ignore
InterventionEditItem.whyDidYouRender = true;
