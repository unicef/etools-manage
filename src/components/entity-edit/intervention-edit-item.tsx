import React, { memo, useState, useEffect, lazy, Suspense, useCallback, useMemo } from 'react';
import { InterventionEntity, SectionEntity, InterventionSectionPayload, CloseSectionPayload } from 'entities/types';
import { useEditInterventionStyles } from './styles';
import { OptionType, DropdownMulti } from 'components/dropdown';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { map, propEq, over, T, lensPath, always, filter, includes, prop, find, view, cond, isNil, equals } from 'ramda';
import { useAppState, useAppDispatch, useAppService } from 'contexts/app';
import { ValueType } from 'react-select/src/types';
import Box from 'components/box';
import { Typography } from '@material-ui/core';
import clsx from 'clsx';
import { selectSectionsAsOptions, selectCurrentActiveSection, selectCloseSectionPayload } from 'selectors';
import { onUpdateInterventionSection, onUpdateStorage } from 'pages/close-summary/actions';
import { selectInterventionsFromPayload } from 'selectors/interventions';
import IndicatorEditItem from './indicator-edit-item';


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
    const initialInterventionState = interventions[id];
    console.log('TCL: initialInterventionState', initialInterventionState);

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
    const numResolved = [0, 2];

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
        const valueOrDefault = cond([
            [isNil, always([])],
            [T, map(prop('value'))]
        ]);
        const selectedSections = filter((section: SectionEntity) => includes(section.id, valueOrDefault(value)), allSections);
        const idsOnly = map(prop('id'), selectedSections);

        const newState = over(lensPath(['sections']), always(idsOnly), initialInterventionState);
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

                <Box className={styles.description} column>
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

                    <Box
                        onClick={handleCollapse}
                        className={clsx(styles.expand, indicators.length === 0 && styles.hidden)}
                        align="center">
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </Box>
                </Box>
            </Box>
            {open && <IndicatorEditItem
                parentId={id}
                sectionOptions={selectedSections}
            />}
        </div>
    );

};


// @ts-ignore
InterventionEditItem.whyDidYouRender = true;
