
import React, { memo } from 'react';
import { IndicatorEntity } from 'entities/types';
import { OptionType, Dropdown } from 'components/dropdown';
import { ValueType } from 'react-select/src/types';
import { useEditInterventionStyles } from './styles';
import { propEq, find } from 'ramda';
import { Typography } from '@material-ui/core';
import Box from 'components/box';
import clsx from 'clsx';


interface IndicatorsProps {
    indicators: IndicatorEntity[];
    sectionOptions: OptionType[];
    onChange: ((idx: number) => (value: ValueType<OptionType>) => void);
}

const IndicatorEditItem: React.FC<IndicatorsProps> = memo(({ indicators, sectionOptions, onChange }) => {
    const styles = useEditInterventionStyles();

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
                        <Typography >{title}</Typography>
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
});

export default IndicatorEditItem;
