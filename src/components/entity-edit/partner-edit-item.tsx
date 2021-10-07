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
import { onSelectPartnerSection } from 'pages/close-section/actions';
import { getSelectedSection } from 'lib/sections';
import { FullStoreShape } from 'contexts/app';

const PartnerEditItem: React.FC<EditItemProps> = ({ id }) => {
    const styles = useEditItemStyles();
    const dispatch = useDispatch();

    const sectionsAsOptions = useSelector(selectSectionsAsDropdownOptions);

    const { name, vendor_number, lead_section } = useSelector(
        (state: FullStoreShape) => state.closeSectionPayload.partners[id]
    );

    const selectedSection = getSelectedSection(sectionsAsOptions, lead_section);

    const onChange = (value: ValueType<OptionType>) => {
        let selectedSectionName = prop('value', value);

        if (lead_section === selectedSectionName) {
            selectedSectionName = null;
        }

        const payload = {
            section: selectedSectionName,
            id
        };
        onSelectPartnerSection(payload, dispatch);
    };

    return (
        <div className={clsx(styles.bottomMargin1, styles.itemBorderWrap)}>
            <Box className={styles.travel} justify="between">
                <Box className={styles.description} column>
                    <Box>
                        <Typography className={styles.refNum} variant="subtitle2">
                            {vendor_number}
                        </Typography>
                    </Box>
                    <Typography>{name}</Typography>
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

export default PartnerEditItem;
