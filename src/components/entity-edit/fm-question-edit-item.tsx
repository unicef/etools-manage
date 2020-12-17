import React from 'react';
import { EditItemProps } from 'entities/types';
import Box from 'components/box';
import { Typography } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useEditItemStyles } from './styles';
import clsx from 'clsx';
import { OptionType, DropdownMulti } from 'components/dropdown';
import { getSelectedOptions, getOptionsWithoutExisting, getExistingSectionsStr } from 'selectors';
import { ValueType } from 'react-select/src/types';
import { valueOrDefault } from 'lib/sections';
import { onSelectFMQuestionSections } from 'pages/close-section/actions';
import { FullStoreShape } from 'contexts/app';

const FMQuestionEditItem: React.FC<EditItemProps> = ({ id }) => {
    const styles = useEditItemStyles();
    const dispatch = useDispatch();

    const { text, sections, existingSections } = useSelector(
        (state: FullStoreShape) => state.closeSectionPayload.fmQuestions[id]
    );

    const selectedSections = useSelector(getSelectedOptions(sections));
    const optionsWithoutExisting = useSelector(getOptionsWithoutExisting(sections));
    const existingSectionsStr = useSelector(getExistingSectionsStr(existingSections));

    const onChange = (value: ValueType<OptionType>) => {
        const selectedSections = valueOrDefault(value);

        const payload = {
            sections: selectedSections,
            id
        };

        onSelectFMQuestionSections(payload, dispatch);
    };

    const headingStyle = clsx(
        styles.collapsableHeading,
        styles.itemBorderWrap,
        styles.containerPad,
        open && styles.halfBorder
    );

    return (
        <div className={styles.item}>
            <Box className={headingStyle} align="center" justify="between">
                <Box column className={styles.description}>
                    <Typography className={styles.refNum} variant="subtitle2">
                        {text}
                    </Typography>
                </Box>

                <div className={clsx(styles.selectColumn, styles.description)}>
                    {existingSections.length ? (
                        <Typography
                            className={clsx(styles.secondaryHeading, styles.bottomMargin1)}
                            variant="body2"
                        >
                            Existing sections:<i> {existingSectionsStr}</i>
                        </Typography>
                    ) : null}

                    <Box align="center" className={clsx(styles.dropdown)}>
                        <DropdownMulti
                            value={selectedSections}
                            onChange={onChange}
                            options={optionsWithoutExisting}
                        />
                    </Box>
                </div>
            </Box>
        </div>
    );
};

export default FMQuestionEditItem;
