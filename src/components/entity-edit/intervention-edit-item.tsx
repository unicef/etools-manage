import React, { memo, useState, useEffect, lazy, Suspense, useMemo } from 'react';
import { InterventionEntity, SectionEntity, InterventionSectionPayload, CloseSectionPayload } from 'entities/types';
import { useEditInterventionStyles } from './styles';
import { OptionType, DropdownMulti } from 'components/dropdown';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { keys, map, reject, head, compose, propEq, over, T, lensPath, always, filter, includes, prop, find, view, cond, isNil, equals } from 'ramda';
import { useAppService } from 'contexts/app';
import { ValueType } from 'react-select/src/types';
import Box from 'components/box';
import { Typography, Collapse } from '@material-ui/core';
import clsx from 'clsx';
import { selectSectionsAsOptions, selectCurrentActiveSection, selectCloseSectionPayload, selectSections } from 'selectors';
import { onUpdateInterventionSection, onUpdateStorage, onUpdateInterventionIndicators } from 'pages/close-summary/actions';
import LoadingFallback from 'components/loading-fallback';
import { selectInterventionsFromPayload, selectIntervention } from 'selectors/interventions';
import { selectNumItemsResolved } from 'selectors/num-items-resolved';
import { valueOrDefault } from 'lib/sections';
import IndicatorEditItem from './indicator-edit-item';
import { useSelector, useDispatch, connect } from 'react-redux';
import { Store, onChangeInterventionSection } from 'slices/root-store';


if (process.env.NODE_ENV !== 'production') {
    const whyDidYouRender = require('@welldone-software/why-did-you-render');
    whyDidYouRender(React, {
        onlyLogs: true,
        titleColor: 'teal'
    });
}


export interface InterventionEditItemProps {
    id: number;

}

export interface DispatchFromProps {
    onUpdateInterventionSection: Function;
}

export interface StateFromProps {
    initialInterventionState: InterventionEntity;
    sectionsAsOptions: OptionType[];
    allSections: SectionEntity[];
    closeSectionId: string;
}

const mapStateToProps = (state: Store, props: InterventionEditItemProps) => ({
    initialInterventionState: selectIntervention(state, props),
    allSections: selectSections(state),
    sectionsAsOptions: selectSectionsAsOptions(state),
    closeSectionId: selectCurrentActiveSection(state)

});

const mapDispatchToProps = {
    onUpdateInterventionSection: onChangeInterventionSection
};

type ConnectProps = StateFromProps & DispatchFromProps & InterventionEditItemProps
export const InterventionEditItem: React.FC<ConnectProps> = ({ id, initialInterventionState, onUpdateInterventionSection, closeSectionId, allSections, sectionsAsOptions }) => {
    const styles = useEditInterventionStyles();
    // const interventions = useSelector(selectInterventionsFromPayload);
    // const closeSectionPayload = useSelector(selectCloseSectionPayload);
    // @ts-ignore
    // const initialInterventionState = useSelector(state => state.closeSectionPayload.interventions[id]);
    console.log('TCL: initialInterventionState', initialInterventionState);
    // const allSections = useSelector(selectSections);

    // const dispatch = useDispatch();
    const { storageService } = useAppService();


    const [interventionState, setInterventionState] = useState<InterventionEntity>(initialInterventionState);

    const [open, setOpen] = useState<boolean>(false);

    // const sectionsAsOptions = useSelector(selectSectionsAsOptions);

    const selectedSections = sectionsAsOptions.filter((option: OptionType) => includes(option.value, interventionState.sections));

    // const closeSectionId = useSelector(selectCurrentActiveSection);
    // temp
    // const { interventions: numResolved } = useSelector(selectNumItemsResolved);

    const onChange = (intervention: InterventionEntity) => {
        const updateState = over(lensPath(['interventions', id]), always(intervention));
        // const storagePayload: CloseSectionPayload = { [closeSectionId]: updateState(closeSectionPayload) };
        const storePayload: InterventionSectionPayload = {
            id,
            sections: intervention.sections
        };
        onUpdateInterventionSection(storePayload);
        // onUpdateStorage(storageService, storagePayload);
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
        // onUpdateInterventionIndicators({ indicators, id }, dispatch); //
        setInterventionState(newState);
    };

    const handleCollapse = () => setOpen(!open);
    const headingStyle = clsx(styles.collapsableHeading, styles.containerPad, open && styles.halfBorder);
    const { number, title } = interventionState;
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

                    {/* <Typography color="secondary" className={styles.numResolved}>{numResolved[0]}/{numResolved[1]}</Typography> */}

                    <Box
                        onClick={handleCollapse}
                        className={styles.expand}
                        align="center">
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </Box>
                </Box>
            </Box>
            {open && <div className={styles.collapseContent}>
                <Box className={styles.containerPad} align="center">
                    <Typography ><i>Applied indicators</i></Typography>
                </Box>

                <div >
                    <IndicatorEditItem
                        parentId={id}
                        onChange={handleChangeIndicators}
                        sectionOptions={selectedSections}
        // indicators={indicators}
                    />

                </div>
            </div>}
        </div>
    );

};


// @ts-ignore
InterventionEditItem.whyDidYouRender = true;

export const Container = connect(mapStateToProps, mapDispatchToProps)(InterventionEditItem);
