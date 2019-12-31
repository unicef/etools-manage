import React from 'react';
import { EditItemProps } from 'entities/types';
import Box from 'components/box';
import Tooltip from '@material-ui/core/Tooltip';
import { useSelector, useDispatch } from 'react-redux';
import { useEditItemStyles } from './styles';
import clsx from 'clsx';
import { OptionType, DropdownMulti } from 'components/dropdown';
import { getSelectedOptions, getOptionsWithoutExisting, getExistingSectionsStr } from 'selectors';
import { ValueType } from 'react-select/src/types';
import { valueOrDefault } from 'lib/sections';
import { FullStoreShape } from 'contexts/app';
import { engagementSectionSelected } from 'slices/close-section-payload';
import { useEngagementEditTableStyles } from './engagement-table-head';

export const ENGAGEMENT_TYPES = {
    sc: 'Spot Check',
    ma: 'Micro Assessment',
    audit: 'Audit',
    sa: 'Special Audit'
};
export const STATUS_TYPES = {
    partner_contacted: 'IP Contacted',
    report_submitted: 'Report Submitted'
};

const EngagementEditItem: React.FC<EditItemProps> = ({ id }) => {
    const styles = useEditItemStyles();
    const engagementStyles = useEngagementEditTableStyles();
    const dispatch = useDispatch();

    const {
        unique_id,
        status,
        agreement,
        partner,
        engagement_type,
        existingSections,
        sections
    } = useSelector((state: FullStoreShape) => state.closeSectionPayload.engagements[id]);

    const existingSectionsStr = useSelector(getExistingSectionsStr(existingSections));

    const optionsWithoutExisting = useSelector(getOptionsWithoutExisting(existingSections));

    const selectedSections = useSelector(getSelectedOptions(sections));

    const onChange = (value: ValueType<OptionType>) => {
        const selectedSections = value && valueOrDefault(value);
        dispatch(engagementSectionSelected({ id, sections: selectedSections }));
    };

    const headingStyle = clsx(
        styles.collapsableHeading,
        styles.itemBorderWrap,
        styles.containerPad,
        styles.engagementHeadings
    );

    return (
        <div className={styles.item}>
            <Box className={headingStyle} align="center" justify="between">
                {/* <Box column> */}
                <span className={engagementStyles.unique}>{unique_id}</span>
                {/* </Box> */}
                <Tooltip title={agreement.auditor_firm.name} placement="top">
                    <span className={engagementStyles.audit}>{agreement.auditor_firm.name}</span>
                </Tooltip>
                <Tooltip title={partner.name} placement="top">
                    <span className={engagementStyles.partner}>{partner.name}</span>
                </Tooltip>
                <span className={engagementStyles.type}>{ENGAGEMENT_TYPES[engagement_type]}</span>
                <span className={engagementStyles.status}>{STATUS_TYPES[status]}</span>
                <span className={engagementStyles.existing}>{existingSectionsStr}</span>

                <DropdownMulti
                    value={selectedSections}
                    onChange={onChange}
                    options={optionsWithoutExisting}
                />
            </Box>
        </div>
    );
};

export default EngagementEditItem;
