import React from 'react';
import { EditItemProps, ModuleEntities } from 'entities/types';
import Box from 'components/box';
import { Typography } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useEditItemStyles } from './styles';
import clsx from 'clsx';
import { OptionType, DropdownMulti } from 'components/dropdown';
import { getSelectedOptions, getOptionsWithoutExisting, getExistingSectionsStr } from 'selectors';
import { ValueType } from 'react-select/src/types';
import { valueOrDefault } from 'lib/sections';
import { onSelectTPMSections } from 'pages/close-section/actions';
import { FullStoreShape } from 'contexts/app';


const TPMActivityEditItem: React.FC<EditItemProps> = ({ id }) => {
    const styles = useEditItemStyles();
    const dispatch = useDispatch();

    const {
        reference_number,
        tpm_partner,
        sections,
        existingSections
    } = useSelector((state: FullStoreShape) => state.closeSectionPayload.tpmActivities[id]);

    const selectedSections = useSelector(getSelectedOptions(sections));
    const optionsWithoutExisting = useSelector(getOptionsWithoutExisting(existingSections));
    const existingSectionsStr = useSelector(getExistingSectionsStr(existingSections));

    const onChange = (value: ValueType<OptionType>) => {
        const selectedSectionIds = valueOrDefault(value);

        const payload = {
            sections: selectedSectionIds,
            id
        };

        onSelectTPMSections(payload, dispatch);
    };

    return (
        <div className={clsx(styles.bottomMargin1, styles.itemBorderWrap)}>
            <Box className={styles.travel} justify="between" align="center">
                <Box column >
                    <Typography className={styles.refNum} variant="subtitle2">{reference_number}</Typography>
                    <Typography>{tpm_partner.name}</Typography>
                </Box>

                <div className={clsx(styles.selectColumn)}>
                    { existingSections.length ?
                        <Typography className={clsx(styles.secondaryHeading, styles.bottomMargin1)}
                            variant="body2">
                            <i>Existing sections: {existingSectionsStr}</i>
                        </Typography>
                        : null
                    }
                    <Box className={clsx(styles.dropdown)} >
                        <DropdownMulti
                            value={selectedSections}
                            onChange={onChange}
                            options={optionsWithoutExisting}/>
                    </Box>
                </div>
            </Box>
        </div>
    );

};

export default TPMActivityEditItem;
