import React from 'react';
import { EditItemProps } from 'entities/types';
import Box from 'components/box';
import { Typography } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useEditItemStyles } from './styles';
import clsx from 'clsx';
import { Dropdown, OptionType } from 'components/dropdown';
import { selectSectionsAsDropdownOptions } from 'selectors';
import { prop } from 'ramda';
import { ValueType } from 'react-select/src/types';
import { onSelectTravelSection } from 'pages/close-section/actions';
import { getSelectedSection } from 'lib/sections';
import { FullStoreShape } from 'contexts/app';

const TravelEditItem: React.FC<EditItemProps> = ({ id }) => {
    const styles = useEditItemStyles();
    const dispatch = useDispatch();

    const sectionsAsOptions = useSelector(selectSectionsAsDropdownOptions);

    const { reference_number, traveler, purpose, section } = useSelector(
        (state: FullStoreShape) => state.closeSectionPayload.travels[id]
    );

    const selectedSection = getSelectedSection(sectionsAsOptions, section);

    const onChange = (value: ValueType<OptionType>) => {
        let selectedSectionName = prop('value', value);

        if (section === selectedSectionName) {
            selectedSectionName = null;
        }
        const payload = {
            section: selectedSectionName,
            id
        };
        onSelectTravelSection(payload, dispatch);
    };

    return (
        <div className={clsx(styles.bottomMargin1, styles.itemBorderWrap)}>
            <Box className={styles.travel} justify="between">
                <Box column>
                    <Box>
                        <Typography variant="body2">
                            <b>{traveler}</b>
                        </Typography>
                        <Typography className={styles.travelRef} variant="subtitle2">
                            {reference_number}
                        </Typography>
                    </Box>

                    <Typography>{purpose}</Typography>
                </Box>

                <Box
                    className={clsx(
                        styles.dropdown,
                        styles.indicatorDropdown,
                        styles.travelDropdown
                    )}
                >
                    <Dropdown
                        value={selectedSection}
                        onChange={onChange}
                        options={sectionsAsOptions}
                    />
                </Box>
            </Box>
        </div>
    );
};

export default TravelEditItem;
