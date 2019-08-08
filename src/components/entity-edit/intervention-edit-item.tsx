import React, { memo, useState, useEffect, useCallback } from 'react';
import { InterventionEntity, GenericMultiSectionPayload, EditItemProps, ModuleEntities } from 'entities/types';
import { useEditItemStyles } from './styles';
import { OptionType, DropdownMulti } from 'components/dropdown';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { propEq, over, lensPath, always, includes, prop, find, view, equals, filter, without } from 'ramda';
import { ValueType } from 'react-select/src/types';
import Box from 'components/box';
import { Typography } from '@material-ui/core';
import clsx from 'clsx';
import { selectSectionsAsOptions, selectSections } from 'selectors';
import { valueOrDefault } from 'lib/sections';
import IndicatorEditItem from './indicator-edit-item';
import { useSelector, useDispatch } from 'react-redux';
import { onSelectInterventionSection, onSelectIndicatorSection } from 'pages/close-section/actions';
import { Store } from 'slices/root-store';
import EntityConfigMapping from 'entities/config-map';


if (process.env.NODE_ENV !== 'production') {
    const whyDidYouRender = require('@welldone-software/why-did-you-render');
    whyDidYouRender(React, {
        onlyLogs: true,
        titleColor: 'teal'
    });
}

const indicatorsConfig = EntityConfigMapping.indicators;


export const InterventionEditItem: React.FC<EditItemProps> = memo(({ id }) => {
    const styles = useEditItemStyles();
    const initialInterventionState = useSelector((state: Store) => (state.closeSectionPayload as ModuleEntities).interventions[id]);

    const allSections = useSelector(selectSections);

    const dispatch = useDispatch();

    const [interventionState, setInterventionState] = useState<InterventionEntity>(initialInterventionState);

    const [open, setOpen] = useState<boolean>(false);

    const existingSectionsStr = allSections
        .filter(section => interventionState.existingSections.includes(section.id))
        .map(prop('name'))
        .join(',');

    const sectionsAsOptions: OptionType[] = useSelector(selectSectionsAsOptions);
    const existingSectionsAsOptions = sectionsAsOptions.filter(({ value }) => includes(value, interventionState.existingSections));

    const optionsWithoutExisting = without(existingSectionsAsOptions, sectionsAsOptions);

    const selectedSections = sectionsAsOptions.filter((option: OptionType) => includes(option.value, interventionState.sections));
    const indicatorOptions = selectedSections.concat(existingSectionsAsOptions);
    const numResolved = useCallback(() => {
        let total = 1;
        let resolved = 0;
        if (interventionState.sections.length) {
            resolved++;
        }
        interventionState.indicators.forEach(
            indicator => {
                total++;
                if (indicator.section) {
                    resolved++;
                }
            }
        );
        return [resolved, total];
    }, [interventionState])();


    const onChange = (intervention: InterventionEntity) => {
        const storePayload: GenericMultiSectionPayload = {
            id,
            sections: intervention.sections
        };
        onSelectInterventionSection(storePayload, dispatch);
    };


    useEffect(() => {
        if (!equals(initialInterventionState, interventionState)) {
            onChange(interventionState);
        }
    }, [interventionState]);


    const handleChangeInterventionSections = (value: ValueType<OptionType>) => {
        // use this instead of map(prop('value')) so that we can have null set as section for dropdown use
        const selectedSectionIds = valueOrDefault(value);
        const newState = over(lensPath(['sections']), always(selectedSectionIds), interventionState);

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

        onSelectIndicatorSection({ indicators, id }, dispatch);
        setInterventionState(newState);
    };

    const handleCollapse = () => setOpen(!open);

    const headingStyle = clsx(
        styles.collapsableHeading, styles.itemBorderWrap,
        styles.containerPad, open && styles.halfBorder);

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
                <div className={clsx(styles.selectColumn)}>
                    { interventionState.existingSections.length ?
                        <Typography className={clsx(styles.secondaryHeading, styles.bottomMargin1)}
                            variant="body2">
                            <i>Existing sections: {existingSectionsStr}</i>
                        </Typography>
                        : null
                    }

                    <Box align="center">
                        <Box className={styles.dropdown}>
                            <DropdownMulti
                                value={selectedSections}
                                onChange={handleChangeInterventionSections}
                                options={optionsWithoutExisting}/>
                        </Box>

                        <Typography color="secondary" className={styles.numResolved}>{numResolved[0]}/{numResolved[1]}</Typography>

                        <Box
                            onClick={handleCollapse}
                            className={clsx(styles.expand, !interventionState.indicators.length && styles.hideIcon)}
                            align="center">
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </Box>
                    </Box>
                </div>
            </Box>
            {open && <div className={styles.collapseContent}>
                <Box className={styles.containerPad} align="center">
                    <Typography ><i>{indicatorsConfig.title}</i></Typography>
                    {!indicatorOptions.length && <Typography className={styles.errorMsg} color="error">You must select section(s) on PD/SSFA first. </Typography>}
                </Box>

                <IndicatorEditItem
                    parentId={id}
                    onChange={handleChangeIndicators}
                    sectionOptions={indicatorOptions}
                />

            </div>}
        </div>
    );

});


// @ts-ignore
InterventionEditItem.whyDidYouRender = true;

