import React from 'react';
import { EditItemProps } from 'entities/types';
import Box from 'components/box';
import { Typography } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useEditItemStyles } from './styles';
import clsx from 'clsx';
import { OptionType, Dropdown } from 'components/dropdown';
import { selectSectionsAsOptions } from 'selectors';
import { ValueType } from 'react-select/src/types';
import { getSelectedSection } from 'lib/sections';
import { onSelectTPMSections } from 'pages/close-section/actions';
import { FullStoreShape } from 'contexts/app';
import { prop } from 'ramda';

const TPMActivityEditItem: React.FC<EditItemProps> = ({ id }) => {
    const styles = useEditItemStyles();
    const dispatch = useDispatch();

    const sectionsAsOptions = useSelector(selectSectionsAsOptions);

    const { reference_number, tpm_partner_name, section } = useSelector(
        (state: FullStoreShape) => state.closeSectionPayload.tpmActivities[id]
    );

    const selectedSection = getSelectedSection(sectionsAsOptions, section);
    console.log('TCL: selectedSection', selectedSection);

    const onChange = (value: ValueType<OptionType>) => {
        let selectedSectionName = prop('value', value);

        if (section === selectedSectionName) {
            selectedSectionName = null;
        }

        const payload = {
            section: selectedSectionName,
            id
        };
        console.log('TCL: onChange -> payload', payload);

        onSelectTPMSections(payload, dispatch);
    };

    return (
        <div className={clsx(styles.bottomMargin1, styles.itemBorderWrap)}>
            <Box className={styles.travel} justify="between" align="center">
                <Box column>
                    <Typography className={styles.refNum} variant="subtitle2">
                        {reference_number}
                    </Typography>
                    <Typography>{tpm_partner_name}</Typography>
                </Box>

                <div className={clsx(styles.selectColumn)}>
                    <Box className={clsx(styles.dropdown)}>
                        <Dropdown
                            value={selectedSection}
                            onChange={onChange}
                            options={sectionsAsOptions}
                        />
                    </Box>
                </div>
            </Box>
        </div>
    );
};

export default TPMActivityEditItem;
