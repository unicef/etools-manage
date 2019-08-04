
import React, { memo } from 'react';
import { OptionType, Dropdown } from 'components/dropdown';
import { ValueType } from 'react-select/src/types';
import { useEditInterventionStyles } from './styles';
import { propEq, find, prop, lensPath, over, always } from 'ramda';
import { Typography } from '@material-ui/core';
import Box from 'components/box';
import clsx from 'clsx';
import { useAppState, useAppDispatch } from 'contexts/app';
import { selectInterventionsFromPayload } from 'selectors/interventions';
import { onUpdateIndicatorSection } from 'pages/close-summary/actions';


interface IndicatorsProps {
    // indicators: IndicatorEntity[];
    sectionOptions: OptionType[];
    parentId: number;
}

const IndicatorEditItem: React.FC<IndicatorsProps> = ({ sectionOptions, parentId }) => {
    const styles = useEditInterventionStyles();
    const state = useAppState();
    const dispatch = useAppDispatch();

    const { sections } = state;

    const { indicators } = selectInterventionsFromPayload(state)[parentId];


    const onChange = (idx: number) => (value: ValueType<OptionType>) => {

        const selectedSection = find(propEq('name', prop('label', value)), sections);
        const selectedSectionId = prop('id', selectedSection);

        const currentSelected = indicators[idx].section;

        let newSectionId;

        // removes selection when same one is clicked
        if (currentSelected !== selectedSectionId) {
            newSectionId = selectedSectionId;
        }

        const newState = over(lensPath(['section']), always(newSectionId), indicators[idx]);
        const updatePayload = {
            interventionId: parentId,
            idx,
            indicator: newState
        };
        onUpdateIndicatorSection(updatePayload, dispatch);
        console.log(newState);
    };

    console.log('TCL: indicators', indicators);

    const getValue = (section: number | undefined) => {
        const res = find(propEq('value', section), sectionOptions);
        return res === undefined ? null : res;
    };

    return <Box className={styles.indicatorItem} align="center">
        <div className={styles.spacer} />
        <Box column >
            { indicators.map(
                ({ title, section }, idx) => (
                    <Box key={`${title}${idx}`}
                        align="center"
                        justify="between"
                        className={styles.indicator}>
                        <Typography className={styles.description}>{title}</Typography>
                        <Box className={clsx(styles.dropdown, styles.indicatorDropdown)}>
                            <Dropdown
                                value={getValue(section)}
                                onChange={onChange(idx)}
                                options={sectionOptions}
                            />
                        </Box>
                    </Box>
                )
            )}
        </Box>
    </Box>;
};

// @ts-ignore
IndicatorEditItem.whyDidYouRender = true;

export default IndicatorEditItem;
