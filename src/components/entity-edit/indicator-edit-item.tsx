
import React, { memo } from 'react';
import { OptionType, Dropdown } from 'components/dropdown';
import { ValueType } from 'react-select/src/types';
import { useEditItemStyles } from './styles';
import { propEq, find } from 'ramda';
import { Typography, Divider } from '@material-ui/core';
import Box from 'components/box';
import clsx from 'clsx';
import { selectInterventionsFromPayload } from 'selectors/interventions';
import { useSelector } from 'react-redux';


interface IndicatorsProps {
    parentId: string;
    sectionOptions: OptionType[];
    onChange: ((idx: number) => (value: ValueType<OptionType>) => void);
}

const IndicatorEditItem: React.FC<IndicatorsProps> = memo(({ parentId, sectionOptions, onChange }) => {
    const styles = useEditItemStyles();
    const indicators = useSelector(selectInterventionsFromPayload)[parentId].indicators;
    const getValue = (section: number | undefined) => {
        const res = find(propEq('value', section), sectionOptions);
        return res === undefined ? null : res;
    };
    return <Box className={styles.indicatorItem} align="center">
        <div className={styles.spacer} />
        <Box column >
            { indicators.map(
                ({ title, section }, idx) => (
                    <div key={`${title}${idx}`}>
                        <Box
                            align="center"
                            justify="between"
                            className={styles.indicator}>
                            <Typography >{title}</Typography>
                            <Box className={clsx(styles.dropdown, styles.indicatorDropdown)}>
                                <Dropdown
                                    isDisabled={sectionOptions.length === 0}
                                    label={null}
                                    value={getValue(section)}
                                    onChange={onChange(idx)}
                                    options={sectionOptions}
                                />
                            </Box>
                        </Box>
                    </div>
                )
            )}
        </Box>
    </Box>;
});

export default IndicatorEditItem;
