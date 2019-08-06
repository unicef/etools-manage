import React from 'react';
import { EditItemProps, ModuleEntities } from 'entities/types';
import Box from 'components/box';
import { Typography } from '@material-ui/core';
import { Store } from 'slices/root-store';
import { useSelector, useDispatch } from 'react-redux';
import { useEditItemStyles } from './styles';
import clsx from 'clsx';
import { OptionType, DropdownMulti } from 'components/dropdown';
import { selectSectionsAsOptions } from 'selectors';
import { includes } from 'ramda';
import { ValueType } from 'react-select/src/types';
import { valueOrDefault } from 'lib/sections';
import { onSelectTPMSections } from 'pages/close-summary/actions';


const TPMActivityEditItem: React.FC<EditItemProps> = ({ id }) => {
    const styles = useEditItemStyles();
    const dispatch = useDispatch();

    const sectionsAsOptions = useSelector(selectSectionsAsOptions);
    const {
        reference_number,
        tpm_partner,
        sections
    } = useSelector((state: Store) => (state.closeSectionPayload as ModuleEntities).tpmActivities[id]);

    const selectedSections = sectionsAsOptions.filter((option: OptionType) => includes(option.value, sections));

    const onChange = (value: ValueType<OptionType>) => {
        const selectedSectionIds = valueOrDefault(value);

        const payload = {
            sections: selectedSectionIds,
            id
        };
        onSelectTPMSections(payload, dispatch);
    };

    return (
        <div className={clsx(styles.editWrapper, styles.itemBorderWrap)}>
            <Box className={styles.travel} justify="between" align="center">
                <Box column >
                    <Typography className={styles.refNum} variant="subtitle2">{reference_number}</Typography>
                    <Typography>{tpm_partner.name}</Typography>
                </Box>

                <Box className={clsx(styles.dropdown)} >
                    <DropdownMulti
                        value={selectedSections}
                        onChange={onChange}
                        options={sectionsAsOptions}/>
                </Box>
            </Box>
        </div>
    );

};

export default TPMActivityEditItem;
